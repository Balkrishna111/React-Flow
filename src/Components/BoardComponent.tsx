import { Node, NodeProps, Position } from "@xyflow/react";
import { ElectricalComponentData, ElectricalComponentType } from "../types";
import Terminal from "./Terminal";
import Board from "../icons/Board";

type BoardComponentType = Node<ElectricalComponentData, "string">;

const BoardComponent = ({}: NodeProps<BoardComponentType>) => {
  return (
    <div className='relative'>
      <Board />

      <Terminal type='source' position={Position.Right} id='right' />
      <Terminal type='source' position={Position.Left} id='left' />
    </div>
  );
};
export default BoardComponent;
