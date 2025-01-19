import { Handle, HandleProps } from "@xyflow/react";

const Terminal = (props: HandleProps) => {
  return (
    <Handle
      style={{
        width: 8,
        height: 8,
        border: "1px solid black",
        background: "white",
      }}
      {...props}
    />
  );
};
export default Terminal;
