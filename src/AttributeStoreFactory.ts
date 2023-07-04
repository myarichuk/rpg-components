/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */

/*
Examples of a attribute store config file:

# warrior.yaml
attributes.strength:
  name: strength
  value: 50
  min: 0
  max: 100
attributes.stamina:
  name: stamina
  value: 40
  min: 0
  max: 100
skills.athletics:
  name: athletics
  value: 70
  min: 0
  max: 100

  # mage.yaml
attributes.intelligence:
  name: intelligence
  value: 60
  min: 0
  max: 100
attributes.mana:
  name: mana
  value: 80
  min: 0
  max: 100
  rechargeRate: 0.01
skills.spellcasting:
  name: spellcasting
  value: 75
  min: 0
  max: 100

*/

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import { AttributeStore, StaticAttribute } from './index';
import { RechargableAttribute } from './index';

type AttributeConfig = {
  name: string;
  value: number;
  min: number;
  max: number;
  rechargeRate?: number;
};

type ProfileConfig = {
  [key: string]: AttributeConfig;
};

export class AttributeStoreFactory {
  private profiles: Map<string, ProfileConfig>;

  constructor(profilesDir: string) {
    this.profiles = new Map();

    // Load profiles from YAML files in the specified directory
    fs.readdirSync(profilesDir).forEach(file => {
      const profilePath = path.join(profilesDir, file);
      if (path.extname(file) === '.yaml' && fs.statSync(profilePath).isFile()) {
        const profileName = path.basename(file, '.yaml');
        const profile = yaml.load(
          fs.readFileSync(profilePath, 'utf8')
        ) as ProfileConfig;
        this.profiles.set(profileName, profile);
      }
    });
  }

  createAttributeStore(profileName: string): AttributeStore {
    const attributes = new AttributeStore();
    const profile = this.profiles.get(profileName);

    if (!profile) {
      throw new Error(`Profile ${profileName} does not exist`);
    }

    for (const path in profile) {
      const attrConfig = profile[path];
      if (attrConfig.rechargeRate !== undefined) {
        attributes.addAttribute(
          path,
          new RechargableAttribute(
            attrConfig.name,
            attrConfig.value,
            attrConfig.min,
            attrConfig.max,
            attrConfig.rechargeRate
          )
        );
      } else {
        attributes.addAttribute(
          path,
          new StaticAttribute(
            attrConfig.name,
            attrConfig.value,
            attrConfig.min,
            attrConfig.max
          )
        );
      }
    }

    return attributes;
  }
}
