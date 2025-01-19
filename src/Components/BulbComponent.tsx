import { Node, NodeProps, Position } from "@xyflow/react";
import { ElectricalComponentData, ElectricalComponentType } from "../types";
import { getUnit } from "../icons";
import Terminal from "./Terminal";
import Bulb from "../icons/Bulb";

type BulbComponentType = Node<ElectricalComponentData, "string">;

const BulbComponent = ({
  data: { value, type },
}: NodeProps<BulbComponentType>) => {
  const unit = getUnit(type as ElectricalComponentType);
  return (
    <div className='relative'>
      <Bulb />

      <p className='text-xs absolute'>{`${value} ${unit}`}</p>
      <Terminal type='source' position={Position.Right} id='right' />
      <Terminal type='source' position={Position.Left} id='left' />
    </div>
  );
};
export default BulbComponent;
