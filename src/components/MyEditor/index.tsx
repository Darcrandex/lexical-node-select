/**
 * @name MyEditor
 * @description
 * @author darcrand
 */

import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin"
import { CustomContentNode } from "./plugins/CustomContent/Node"
import CustomContentPlugin, { INSERT_CUSTOM_CONTENT_COMMAND } from "./plugins/CustomContent/Plugin"

export default function MyEditor() {
  const [editor] = useLexicalComposerContext()
  return (
    <>
      <header>
        <button onClick={() => editor.dispatchCommand(INSERT_CUSTOM_CONTENT_COMMAND, Math.random().toString())}>
          Insert Custom Content
        </button>
      </header>

      <PlainTextPlugin
        contentEditable={<ContentEditable style={{ minHeight: 300, border: "1px solid #eee" }} />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />

      <CustomContentPlugin />
    </>
  )
}

export function ContextWrapper(props: { children: JSX.Element | string | (JSX.Element | string)[] }) {
  return (
    <LexicalComposer initialConfig={{ namespace: "my-editor", onError: console.error, nodes: [CustomContentNode] }}>
      {props.children}
    </LexicalComposer>
  )
}
