import { Node, NodeProps, Position } from "@xyflow/react";
import { ElectricalComponentData, ElectricalComponentType } from "../types";
import { getUnit } from "../icons";
import Terminal from "./Terminal";
import Battery from "../icons/Battery";

type BatteryComponentType = Node<ElectricalComponentData, "string">;

const BatteryComponent = ({
  data: { value, type },
}: NodeProps<BatteryComponentType>) => {
  const unit = getUnit(type as ElectricalComponentType);
  return (
    <div className='relative'>
      <Battery />

      <p className='text-xs absolute'>{`${value} ${unit}`}</p>
      <Terminal type='source' position={Position.Right} id='right' />
      <Terminal type='source' position={Position.Left} id='left' />
    </div>
  );
};
export default BatteryComponent;
