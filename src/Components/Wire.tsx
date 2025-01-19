import { BaseEdge, EdgeProps, getSmoothStepPath } from "@xyflow/react";

const Wire = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) => {
  const [d] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });
  return (
    <>
      <BaseEdge style={{ stroke: "yellow" }} path={d} markerEnd={markerEnd} />
      <circle
        r={4}
        fill='yellow'
        style={{
          filter: "drop-shadow(0px 0px 2px #ffc300)",
        }}
      >
        <animateMotion dur={"6s"} repeatCount={"indefinite"} path={d} />
      </circle>
    </>
  );
};
export default Wire;
