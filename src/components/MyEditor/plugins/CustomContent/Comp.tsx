/**
 * @name Comp
 * @description
 * @author darcrand
 */

import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection"
import { NodeKey } from "lexical"

export default function Comp(props: { id: string; nodeKey: NodeKey }) {
  const [isSelected, setSelect] = useLexicalNodeSelection(props.nodeKey)

  return (
    <div onClick={() => setSelect(true)}>
      <legend style={{ backgroundColor: "skyblue" }}>custom content</legend>

      <hr />
      <p>
        {props.id}, {props.nodeKey}
      </p>
      <p>{isSelected ? "node is selected" : ""}</p>
    </div>
  )
}
