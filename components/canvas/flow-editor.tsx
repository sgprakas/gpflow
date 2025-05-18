import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Connection,
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  BackgroundVariant,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { NodeSelector } from './node-selector';
import { BaseNode } from '../nodes/base-node';
import { NodeConfigPanel } from './node-config-panel';
import { Button } from '../ui/button';

const nodeTypes = {
  http: (props: any) => (
    <BaseNode
      data={{
        ...props.data,
        label: 'HTTP',
        icon: (
          <svg
            className="h-6 w-6 text-blue-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        ),
        color: {
          border: 'border-blue-200',
          bg: 'bg-blue-50',
          icon: 'bg-blue-500'
        }
      }}
    />
  ),
  function: (props: any) => (
    <BaseNode
      data={{
        ...props.data,
        label: 'Function',
        icon: (
          <svg
            className="h-6 w-6 text-purple-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M8 16l2.879-2.879m0 0a3 3 0 104.242-4.242 3 3 0 00-4.242 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        color: {
          border: 'border-purple-200',
          bg: 'bg-purple-50',
          icon: 'bg-purple-500'
        }
      }}
    />
  ),
  webhook: (props: any) => (
    <BaseNode
      data={{
        ...props.data,
        label: 'Webhook',
        icon: (
          <svg
            className="h-6 w-6 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        ),
        color: {
          border: 'border-green-200',
          bg: 'bg-green-50',
          icon: 'bg-green-500'
        }
      }}
    />
  ),
  condition: (props: any) => (
    <BaseNode
      data={{
        ...props.data,
        label: 'Condition',
        isCondition: true,
        icon: (
          <svg
            className="h-6 w-6 text-yellow-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        color: {
          border: 'border-yellow-200',
          bg: 'bg-yellow-50',
          icon: 'bg-yellow-500'
        }
      }}
    />
  ),
  delay: (props: any) => (
    <BaseNode
      data={{
        ...props.data,
        label: 'Delay',
        icon: (
          <svg
            className="h-6 w-6 text-orange-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        color: {
          border: 'border-orange-200',
          bg: 'bg-orange-50',
          icon: 'bg-orange-500'
        }
      }}
    />
  ),

  email: (props: any) => (
    <BaseNode
      data={{
        ...props.data,
        label: 'Email',
        icon: (
          <svg
            className="h-6 w-6 text-rose-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        color: {
          border: 'border-rose-200',
          bg: 'bg-rose-50',
          icon: 'bg-rose-500'
        }
      }}
    />
  ),
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

interface WorkflowNode {
  id: string;
  type?: string;
  parameters: Record<string, any>;
  next?: string;
  trueNext?: string;
  falseNext?: string;
}

interface Workflow {
  id: string;
  nodes: WorkflowNode[];
}

const FlowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [workflow, setWorkflow] = useState<Workflow>({
    id: "workflow-" + Date.now(),
    nodes: []
  });

  // Update workflow when nodes or edges change
  useEffect(() => {
    // Create a stable version of the workflow nodes
    const workflowNodes: WorkflowNode[] = nodes.map(node => {
      const outgoingEdges = edges.filter(edge => edge.source === node.id);

      const baseNode: WorkflowNode = {
        id: node.id,
        type: node.type,
        parameters: node.data?.parameters || {} // Use optional chaining
      };

      if (node.type === 'condition') {
        const trueEdge = outgoingEdges.find(edge => edge.sourceHandle?.includes('true'));
        const falseEdge = outgoingEdges.find(edge => edge.sourceHandle?.includes('false'));

        if (trueEdge) baseNode.trueNext = trueEdge.target;
        if (falseEdge) baseNode.falseNext = falseEdge.target;
      } else {
        const nextNode = outgoingEdges[0]?.target;
        if (nextNode) baseNode.next = nextNode;
      }

      return baseNode;
    });

    // Compare current and new workflow nodes before updating
    setWorkflow(prev => {
      const prevNodes = JSON.stringify(prev.nodes);
      const newNodes = JSON.stringify(workflowNodes);

      if (prevNodes === newNodes) {
        return prev;
      }

      return {
        ...prev,
        nodes: workflowNodes
      };
    });
  }, [nodes, edges]); // Only depend on nodes and edges

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, [setEdges]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Update node parameters when configuration changes
  const onUpdateNodeConfig = useCallback((nodeId: string, parameters: Record<string, any>) => {
    setNodes(nds =>
      nds.map(node =>
        node.id === nodeId
          ? {
            ...node,
            data: {
              ...node.data,
              parameters
            }
          }
          : node
      )
    );
  }, [setNodes]);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onAddNode = useCallback((type: string) => {
    const position = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: {
        label: type,
        parameters: {} // Initialize empty parameters object
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [screenToFlowPosition, setNodes]);


  return (
    <div className="absolute inset-0">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        deleteKeyCode={['Backspace', 'Delete']}
        fitView
        className="bg-white"
        minZoom={0.1}
        maxZoom={1.5}
        snapToGrid={true}
        snapGrid={[16, 16]}
        defaultEdgeOptions={{
          style: { strokeWidth: 1.5 },
          type: 'smoothstep',
          animated: false,
          markerEnd: {
            type: MarkerType.Arrow,
            width: 20,
            height: 20,
            color: '#94a3b8'
          }
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          className="bg-slate-50"
        />
        <Controls
          className="bg-white shadow-lg rounded-lg border"
          showInteractive={false}
        />
        <div className="absolute bottom-8 right-8 z-50">
          <NodeSelector onSelect={onAddNode} />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
          <Button
            className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg"
            onClick={() => {
              console.log('Current Workflow:', workflow);
            }}
          >
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
              Test Workflow
            </div>
          </Button>
        </div>
      </ReactFlow>

      <NodeConfigPanel
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        nodeType={selectedNode?.type}
        nodeId={selectedNode?.id}
        onDelete={() => {
          setNodes((nds) => nds.filter((node) => node.id !== selectedNode?.id));
          setEdges((eds) => eds.filter((edge) =>
            edge.source !== selectedNode?.id && edge.target !== selectedNode?.id
          ));
          setSelectedNode(null);
        }}
        parameters={selectedNode?.data?.parameters as Record<string, any>}
        onUpdateConfig={(parameters) => {
          if (selectedNode) {
            onUpdateNodeConfig(selectedNode.id, parameters);
          }
        }}
      />
    </div>
  );
};

export default FlowEditor;
