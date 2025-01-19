import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Background,
  Controls,
  Panel,
  ReactFlow,
  useNodesState,
  useEdgesState,
  Connection,
  BackgroundVariant,
  ConnectionMode,
  MarkerType,
  Edge,
  useReactFlow,
  Node,
  OnReconnect,
  reconnectEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { initialEdges, initialNodes } from "./Flow.constants";
import ElectricalComponent from "../Components/ElectricalComponent";
import Wire from "../Components/Wire";
import ConnectionLine from "../Components/ConnectionLine";
import Resistor from "../icons/Resistor";
import { ElectricalComponentType } from "../types";
import Capacitor from "../icons/Capacitor";
import Inductor from "../icons/Inductor";
import Battery from "../icons/Battery";
import Bulb from "../icons/Bulb";
import Board from "../icons/Board";
import BulbComponent from "../Components/BulbComponent";
import BatteryComponent from "../Components/BatteryComponent";
import { getUnit } from "../icons";
import { IoSquareOutline } from "react-icons/io5";

import ComponentDetail from "../Components/ComponentDetail";
import BoardComponent from "../Components/BoardComponent";

const COMPONENTS = [
  {
    icon: <Resistor />,
    type: ElectricalComponentType.Resistor,
    label: "Resistor",
  },
  {
    icon: <Capacitor />,
    type: ElectricalComponentType.Capacitor,
    label: "Capacitor",
  },
  {
    icon: <Inductor />,
    type: ElectricalComponentType.Inductor,
    label: "Inductor",
  },
  {
    icon: <Bulb />,
    type: ElectricalComponentType.Bulb,
    label: "Bulb",
  },
  {
    icon: <IoSquareOutline />,
    type: ElectricalComponentType.Board,
    label: "Board",
  },
  {
    icon: <Battery />,
    type: ElectricalComponentType.Battery,
    label: "Battery",
  },
];

const nodeTypes = {
  electricalComponent: ElectricalComponent,
  bulbComponent: BulbComponent,
  batteryComponent: BatteryComponent,
  boardComponent: BoardComponent,
};
const edgeTypes = {
  wire: Wire,
};

const Flow = () => {
  const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection: Connection) => {
    const edge = {
      ...connection,
      type: "wire",
      id: uuidv4(),
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#ffc300",
      },
    };
    setEdges((eds) => eds.concat(edge));
  }, []);

  const isValidConnection = (connection: Edge | Connection) => {
    const { source, target } = connection;
    if (source === target) {
      return false;
    } else {
      return true;
    }
  };

  const dragOutSideRef = useRef<ElectricalComponentType | null>(null);

  const onDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    type: ElectricalComponentType
  ) => {
    dragOutSideRef.current = type;
    event.dataTransfer.effectAllowed = "move";
  };

  const ondragover: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const type = dragOutSideRef.current;
    if (!type) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    let node: Node | undefined;
    if (
      [
        ElectricalComponentType.Capacitor,
        ElectricalComponentType.Inductor,
        ElectricalComponentType.Resistor,
      ].includes(type)
    ) {
      node = {
        id: uuidv4(),
        type: "electricalComponent",
        position,
        data: { type, value: 3 },
      };
    } else if (type == ElectricalComponentType.Bulb) {
      node = {
        id: uuidv4(),
        type: "bulbComponent",
        position,
        data: { type, value: 12 },
      };
    } else if (type == ElectricalComponentType.Battery) {
      node = {
        id: uuidv4(),
        type: "batteryComponent",
        position,
        data: { type, value: 50 },
      };
    } else if (type == ElectricalComponentType.Board) {
      node = {
        id: uuidv4(),
        type: "boardComponent",
        position,
        data: {},
      };
    }

    if (node) setNodes((prevNodes) => prevNodes.concat(node));
  };

  const [selectedNode, setSelectedNode] = useState<Node | undefined>();

  const onNodeClick = (event: React.MouseEvent<Element>, node: Node) => {
    setSelectedNode(node);
  };

  const onPaneClick = () => {
    setSelectedNode(undefined);
  };

  const edgeReconnetSuccessful = useRef(false);
  const onReconnect: OnReconnect = (oldEdge, newConnection) => {
    edgeReconnetSuccessful.current = true;
    setEdges((prevEdges) => reconnectEdge(oldEdge, newConnection, prevEdges));
  };

  const onReconnectStart = () => {
    edgeReconnetSuccessful.current = false;
  };

  const onReconnectEnd = (_: MouseEvent | TouchEvent, edge: Edge) => {
    if (!edgeReconnetSuccessful.current) {
      setEdges((prevEdges) =>
        prevEdges.filter((prevEdge) => prevEdge.id != edge.id)
      );
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }} className='bg-white'>
      {selectedNode && selectedNode.data.value && (
        <div className='align-middle h-full w-[250px] absolute top-3 left-3 rounded-md bg-transparent'>
          <div className='bg-white border-2 border-black h-[150px] w-full p-1 mb-8 relative z-10'>
            <ComponentDetail selectedNode={selectedNode} />
          </div>
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineComponent={ConnectionLine}
        isValidConnection={isValidConnection}
        onDragOver={ondragover}
        onDrop={onDrop}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onReconnect={onReconnect}
        onReconnectStart={onReconnectStart}
        onReconnectEnd={onReconnectEnd}
      >
        <Background
          variant={BackgroundVariant.Lines}
          gap={10}
          color='#f0f0f0'
          id='1'
        />
        <Background
          variant={BackgroundVariant.Lines}
          gap={100}
          color='#d4d4d4'
          id='2'
        />
        <Panel
          position='top-right'
          style={{
            border: "1px solid #ccc",
            padding: 12,
            borderRadius: 12,
            background: "white",
            width: 150,
          }}
        >
          <div>
            <div>
              <p className='text-xs mb-4'>Components:</p>
              <div className='flex items-center justify-center flex-wrap gap-3'>
                {COMPONENTS.map((component) => (
                  <div key={component.label}>
                    <button
                      onDragStart={(event) =>
                        onDragStart(event, component.type)
                      }
                      className='bg-slate-300 rounded-md px-auto flex justify-center items-center p-1 h-7 w-7'
                      draggable
                    >
                      {component.icon}
                    </button>
                    {/* <p className='text-xs'>{component.label}</p> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>
        <Controls />
      </ReactFlow>
    </div>
  );
};
export default Flow;
