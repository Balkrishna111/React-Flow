import { ReactFlowProvider } from "@xyflow/react";
import Flow from "./ReactFlow/Flow";
import "./index.css";

function App() {
  return (
    <>
      <div className='bg-black'>
        <ReactFlowProvider>
          <Flow />
        </ReactFlowProvider>
      </div>
    </>
  );
}

export default App;
