import { DecoratorBlockNode, SerializedDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode"
import { ElementFormatType, LexicalNode, NodeKey, Spread } from "lexical"
import Comp from "./Comp"

export type SerializedCustomContentNode = Spread<
  {
    id: string
    type: "custom-content"
    nodeKey?: string
    version: 1
  },
  SerializedDecoratorBlockNode
>

export class CustomContentNode extends DecoratorBlockNode {
  __id: string

  constructor(id: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key)
    this.__id = id
  }

  static getType(): string {
    return "custom-content"
  }

  createDOM() {
    const div = document.createElement("div")
    return div
  }

  updateDOM(): false {
    return false
  }

  static clone(node: CustomContentNode) {
    return new CustomContentNode(node.__id, node.__format, node.__key)
  }

  static importJSON(serializedNode: SerializedCustomContentNode) {
    const node = $createCustomContentNode(serializedNode.id)
    node.setFormat(serializedNode.format)
    return node
  }

  exportJSON(): SerializedCustomContentNode {
    return {
      ...super.exportJSON(),
      id: this.__id,
      type: "custom-content",
      nodeKey: this.getKey(),
      version: 1,
    }
  }

  decorate() {
    return <Comp id={this.__id} nodeKey={this.getKey()} />
  }
}

export function $createCustomContentNode(id: string) {
  return new CustomContentNode(id)
}

export function $isCustomContentNode(
  node: CustomContentNode | LexicalNode | null | undefined
): node is CustomContentNode {
  return node instanceof CustomContentNode
}
