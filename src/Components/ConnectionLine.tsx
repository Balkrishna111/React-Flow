import {
  ConnectionLineComponentProps,
  getSimpleBezierPath,
} from "@xyflow/react";

const ConnectionLine = ({
  fromX,
  fromY,
  toX,
  toY,
  connectionStatus,
}: ConnectionLineComponentProps) => {
  let color = "black";

  if (connectionStatus == "valid") color = "#55dd99";
  if (connectionStatus == "invalid") color = "#ff6060";
  const [d] = getSimpleBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });
  return <path fill='none' stroke={color} strokeWidth={1.5} d={d} />;
};
export default ConnectionLine;
