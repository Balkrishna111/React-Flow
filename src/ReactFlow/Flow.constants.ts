import { Edge, Node } from "@xyflow/react";
import { ElectricalComponentType } from "../types";

export const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    type: "electricalComponent",
    data: { type: ElectricalComponentType.Resistor, value: 3 },
  },
  {
    id: "2",
    position: { x: 200, y: 200 },
    type: "electricalComponent",
    data: { type: ElectricalComponentType.Capacitor, value: 3 },
  },
  {
    id: "3",
    position: { x: 300, y: 300 },
    type: "electricalComponent",
    data: { type: ElectricalComponentType.Inductor, value: 3 },
  },
];

export const initialEdges: Edge[] = [];
