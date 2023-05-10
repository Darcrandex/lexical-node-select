/**
 * @name App
 * @description
 * @author darcrand
 */

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getNodeByKey } from "lexical"
import { useEffect } from "react"
import MyEditor, { ContextWrapper } from "./components/MyEditor"

async function getData() {
  return {
    code: 200,
    data: {
      lastSelectedNodeKey: "1",
      stateJSON: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"123","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"format":"","type":"custom-content","version":1,"id":"0.6427137344962706","nodeKey":"4"},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`,
    },
  }
}

function MyPage() {
  const [editor] = useLexicalComposerContext()

  const onSave = () => {
    editor.update(() => {
      const data = JSON.stringify(editor.getEditorState().toJSON())
      console.log("data", data)
    })
  }

  useEffect(() => {
    getData().then((res) => {
      editor.update(() => {
        const state = editor.parseEditorState(JSON.parse(res.data.stateJSON))
        editor.setEditorState(state)

        // part 2
        // on got data, select the node by lastSelectedNodeKey
        const node = $getNodeByKey(res.data.lastSelectedNodeKey)
        if (node) {
          // node.setSelected?.(true)
        }
      })
    })
  }, [editor])

  return (
    <>
      <button onClick={onSave}>Save</button>

      <MyEditor />
    </>
  )
}

export default function App() {
  return (
    <>
      <h1>Lexical Node Select</h1>

      <ContextWrapper>
        <MyPage />
      </ContextWrapper>
    </>
  )
}
