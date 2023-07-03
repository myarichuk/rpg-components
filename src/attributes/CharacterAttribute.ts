import { Attribute } from './Attribute';

export class CharacterAttribute {
  private attributeTree: Map<string, Attribute | CharacterAttribute> =
    new Map();

  getAttribute(this: CharacterAttribute, path: string): number {
    const pathParts = path.split('.');
    let currentPart: Attribute | CharacterAttribute | undefined = this;
    for (const part of pathParts) {
      currentPart =
        currentPart instanceof CharacterAttribute
          ? currentPart.attributeTree.get(part)
          : undefined;
      if (!currentPart) {
        throw new Error(`Invalid attribute path: ${path}`);
      }
    }
    return (currentPart as Attribute).getValue();
  }

  setAttribute(path: string, value: number): void {
    const pathParts = path.split('.');
    let currentPart: Attribute | CharacterAttribute | undefined = this;
    for (let i = 0; i < pathParts.length; i++) {
      currentPart =
        currentPart instanceof CharacterAttribute
          ? currentPart.attributeTree.get(pathParts[i])
          : undefined;
      if (!currentPart || i === pathParts.length - 1) {
        if (currentPart instanceof Attribute) {
          currentPart.setValue(value);
        } else {
          throw new Error(`Invalid attribute path: ${path}`);
        }
      }
    }
  }

  addAttribute(path: string, attribute: Attribute | CharacterAttribute): void {
    const pathParts = path.split('.');
    let currentPart: CharacterAttribute = this;
    for (let i = 0; i < pathParts.length; i++) {
      if (i === pathParts.length - 1) {
        currentPart.attributeTree.set(pathParts[i], attribute);
      } else {
        let nextPart = currentPart.attributeTree.get(pathParts[i]);
        if (nextPart instanceof CharacterAttribute) {
          currentPart = nextPart;
        } else {
          nextPart = new CharacterAttribute();
          currentPart.attributeTree.set(pathParts[i], nextPart);
          currentPart = nextPart;
        }
      }
    }
  }
}
