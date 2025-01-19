import { Node, useReactFlow } from "@xyflow/react";
import { getUnit } from "../icons";
import { useState } from "react";

const ComponentDetail = ({ selectedNode }: { selectedNode: Node }) => {
  const { updateNodeData } = useReactFlow();

  const [currentValue, setCurrentValue] = useState(selectedNode.data.value);
  return (
    <div>
      {" "}
      <p className='text-md text-center font-bold mb-4'>
        {selectedNode.data.type.toUpperCase()}:
      </p>
      <div className='px-1 flex'>
        <input
          value={currentValue}
          type='text'
          className='w-full border px-1'
          onChange={(e) => {
            const newValue = e.target.value ? parseFloat(e.target.value) : 0;
            setCurrentValue(newValue.toString());
            updateNodeData(selectedNode.id, { value: newValue.toString() });
          }}
        />
        <button className='bg-slate-200 px-1'>
          {getUnit(selectedNode.data.type)}
        </button>
      </div>
    </div>
  );
};
export default ComponentDetail;
