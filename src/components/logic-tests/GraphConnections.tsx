import { useEffect, useState, type MouseEvent } from "react";

// An adjacency list is a way to represent a graph (a set of nodes with connections between them).
// Instead of listing all possible connections in a big table, you list only the neighbors of each node.
// For each node, keep a list of the nodes ;
//Nodes shoud have : id x y and connections
//Edges should have source and target and id

//nodes shoud have : id x y and connections
const graphNodes = [
  { id: "A", connections: [""], x: 100, y: 200 },
  { id: "B", connections: ["", ""], x: 150, y: 300 },
  { id: "C", connections: [""], x: 125, y: 350 },
  { id: "D", connections: [""], x: 200, y: 350 },
];

// should have source and target and id
const graphEdges = [
  { id: 1, source: "A", target: ["B", "C"] },
  // { id: 2, source: "B", target: [""] },
  // { id: 3, source: "C", target: [""] },
  // {
  //   id: 4,
  //   source: "D",
  //   target: [""],
  // },
];

type NodeType = {
  id: string;
  connections: string[];
  x: number;
  y: number;
};
type EdgeType = {
  id: number;
  source: string;
  target: string[];
};

export function GraphConnections() {
  const [edges, setEdges] = useState<EdgeType[]>(graphEdges);
  const [nodes, setNodes] = useState<NodeType[]>(graphNodes);

  const [selectedDraggableNode, setSelectedDraggableNode] =
    useState<NodeType | null>();

  const [selectedNode, setSelectedNode] = useState({
    source: "",
    target: "",
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function getNode(nodeId: string): NodeType | undefined {
    return nodes.find((node) => node.id === nodeId);
  }

  function handleMouseMove(mouseEvent: MouseEvent<SVGSVGElement>) {
    // get clientx clienty of the mouse
    if (!selectedDraggableNode) return;

    const x = mouseEvent.clientX;
    const y = mouseEvent.clientY;

    // update selected node coords
    setNodes((prev) => {
      return prev.map((node) => {
        if (node.id === selectedDraggableNode.id) {
          return {
            ...node,
            x: x - offset.x,
            y: y - offset.y,
          };
        }

        return node;
      });
    });
  }

  function handleAddNewConnection(node: NodeType) {
    setSelectedNode((prev) => {
      if (!prev.source) {
        // if source not exists, just add source
        return {
          ...prev,
          source: node.id,
        };
      }
      if (prev.source && prev.source === node.id) {
        // if selected the same source id , deselect it
        return {
          source: "",
          target: "",
        };
      }
      if (prev.source && prev.target !== node.id) {
        // add target IF new one is different than prev

        return {
          ...prev,
          target: node.id,
        };
      }

      return prev;
    });
  }

  useEffect(() => {
    if (!selectedNode.source || !selectedNode.target) return;

    setEdges((prevEdges) => {
      const hasSource = prevEdges.find(
        (edge) => edge.source === selectedNode.source,
      );
      if (!hasSource) {
        // the obj didnt exists before, so we create a new one with the source and target
        const newSourceObj = {
          id: Date.now(),
          source: selectedNode.source,
          target: [selectedNode.target],
        };
        return [...prevEdges, newSourceObj];
      }
      // have already source obj.
      return prevEdges.map((edge) => {
        if (edge.source === selectedNode.source) {
          //return edge obj if edge already exists, and add new target if is not already in list
          return {
            ...edge,
            target: !edge.target.includes(selectedNode.target)
              ? [...edge.target, selectedNode.target]
              : edge.target.filter((t) => t !== selectedNode.target),
          };
        }
        return edge;
      });
    });
  }, [selectedNode]);

  function handleDeleteConnection() {}

  return (
    <div>
      GraphConnections
      <svg
        width={800}
        height={800}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setSelectedDraggableNode(null)}
      >
        {edges.map((edge) => {
          // get the coords x y of each node based on its ID
          const nodeSource = getNode(edge.source);

          return edge.target.map((tar) => {
            const nodeTarget = getNode(tar);

            return (
              <line
                onClick={() => handleDeleteConnection()}
                key={tar}
                x1={nodeSource?.x}
                y1={nodeSource?.y}
                x2={nodeTarget?.x}
                y2={nodeTarget?.y}
                stroke="black"
              />
            );
          });
        })}

        {nodes.map((node) => {
          return (
            <g
              style={{ cursor: "grab" }}
              key={node.id}
              onMouseDown={(event: MouseEvent) => {
                // // mouse position relative to node / to center position relative to node
                setOffset({
                  x: event.clientX - node.x, //center the target lement (node) with the cursor
                  y: event.clientY - node.y,
                });
                setSelectedDraggableNode(node);
              }}
              onMouseUp={() => setSelectedDraggableNode(null)}
              onClick={() => handleAddNewConnection(node)}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r="50"
                stroke="black"
                strokeWidth="1"
                fill={selectedNode.source === node.id ? "green" : "white"}
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={selectedNode.source === node.id ? "white" : "black"}
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
