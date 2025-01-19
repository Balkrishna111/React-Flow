import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { ElectricalComponentData, ElectricalComponentType } from "../types";
import Resistor from "../icons/Resistor";
import Capacitor from "../icons/Capacitor";
import Inductor from "../icons/Inductor";
import { getUnit } from "../icons";
import Terminal from "./Terminal";

type ElectricalComponentNode = Node<ElectricalComponentData, "string">;

const ElectricalComponent = ({
  data: { value, type },
}: NodeProps<ElectricalComponentNode>) => {
  const unit = getUnit(type as ElectricalComponentType);
  return (
    <div className='relative'>
      {type === ElectricalComponentType.Resistor && <Resistor />}
      {type === ElectricalComponentType.Capacitor && <Capacitor />}
      {type === ElectricalComponentType.Inductor && <Inductor />}
      <p className='text-xs absolute'>{`${value} ${unit}`}</p>
      <Terminal type='source' position={Position.Right} id='right' />
      <Terminal type='source' position={Position.Left} id='left' />
    </div>
  );
};
export default ElectricalComponent;
