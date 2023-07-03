import { Attribute } from './Attribute';
import { ITimeAware } from '../ITimeAware';
import { RechargableAttribute } from './RechargableAttribute';

export class AttributeStore implements ITimeAware {
  private attributeTree: Map<string, Attribute | AttributeStore> = new Map();

  update(timeElapsed: number): void {
    const queue: Array<AttributeStore | Attribute> = Array.from(
      this.attributeTree.values()
    );
    while (queue.length > 0) {
      const node = queue.shift();
      if (node instanceof RechargableAttribute) {
        node.update(timeElapsed);
      } else if (node instanceof AttributeStore) {
        queue.push(...Array.from(node.attributeTree.values()));
      }
    }
  }

  getAttribute(this: AttributeStore, path: string): number {
    const pathParts = path.split('.');
    let currentPart: Attribute | AttributeStore | undefined = this;
    for (const part of pathParts) {
      currentPart =
        currentPart instanceof AttributeStore
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
    let currentPart: Attribute | AttributeStore | undefined = this;
    for (let i = 0; i < pathParts.length; i++) {
      currentPart =
        currentPart instanceof AttributeStore
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

  addAttribute(path: string, attribute: Attribute | AttributeStore): void {
    const pathParts = path.split('.');
    let currentPart: AttributeStore = this;
    for (let i = 0; i < pathParts.length; i++) {
      if (i === pathParts.length - 1) {
        currentPart.attributeTree.set(pathParts[i], attribute);
      } else {
        let nextPart = currentPart.attributeTree.get(pathParts[i]);
        if (nextPart instanceof AttributeStore) {
          currentPart = nextPart;
        } else {
          nextPart = new AttributeStore();
          currentPart.attributeTree.set(pathParts[i], nextPart);
          currentPart = nextPart;
        }
      }
    }
  }
}
