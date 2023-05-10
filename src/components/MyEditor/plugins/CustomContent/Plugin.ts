import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $insertNodeToNearestRoot } from "@lexical/utils"
import { COMMAND_PRIORITY_EDITOR, createCommand, LexicalCommand } from "lexical"
import { useEffect } from "react"

import { $createCustomContentNode, CustomContentNode } from "./Node"

export const INSERT_CUSTOM_CONTENT_COMMAND: LexicalCommand<string> = createCommand()

export default function CustomContentPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([CustomContentNode])) {
      throw new Error("not registered")
    }

    return editor.registerCommand<string>(
      INSERT_CUSTOM_CONTENT_COMMAND,
      (payload) => {
        const node = $createCustomContentNode(payload)
        $insertNodeToNearestRoot(node)

        // part 1
        // set selected on created
        // node.setSelected?.(true)

        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}
