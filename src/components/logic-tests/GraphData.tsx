import { useEffect, useState, type DragEvent, type MouseEvent } from "react";

// An adjacency list is a way to represent a graph (a set of nodes with connections between them).
// Instead of listing all possible connections in a big table, you list only the neighbors of each node.
// For each node, keep a list of the nodes it is directly connected to.

const initialNodes = [
  { id: "A", x: 100, y: 100 },
  { id: "B", x: 300, y: 100 },
  { id: "C", x: 200, y: 250 },
  { id: "D", x: 400, y: 250 },
  { id: "E", x: 200, y: 400 },
];

const initialEdges = [
  { source: "A", target: "B" },
  { source: "A", target: "C" },
];

export function GraphData() {
  const [nodes, setNodes] =
    useState<{ id: string; x: number; y: number }[]>(initialNodes);
  const [edges, setEdges] =
    useState<{ source: string; target: string }[]>(initialEdges);
  console.log("🚀 ~ GraphData ~ edges:", edges);

  const [selectedNode, setSelectedNode] = useState<{
    source: string;
    target: string;
  }>({
    source: "",
    target: "",
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [draggingId, setDraggingId] = useState<string>("");

  const getNode = (id: string) => nodes.find((n) => n.id === id);

  function handleNodeClick(id: string) {
    setSelectedNode((prev) => {
      // if no source
      if (!prev.source) {
        return {
          source: id,
          target: "",
        };
      }

      // if the same source
      if (prev.source && prev.source === id) {
        return {
          source: "",
          target: "",
        };
      }
      // if source already exists
      if (prev.source && prev.source !== id) {
        return {
          ...prev,
          target: id, //set target
        };
      }

      return prev;
    });
  }

  useEffect(() => {
    if (selectedNode.source && selectedNode.target) {
      setEdges((prev) => [...prev, selectedNode]);
    }
  }, [selectedNode]);

  // delete edge
  function handleEdgeDelete(source: string, target: string) {
    setEdges((prev) =>
      prev.filter((edge) => edge.source !== source && edge.target !== target)
    );
  }

  function handleDragNode(
    node: { id: string; x: number; y: number },
    e: DragEvent<SVGGElement>
  ) {
    console.log("🚀 ~ handleDragNode ~ e:", e);
  }

  function handleMouseMove(event: MouseEvent<SVGSVGElement>) {
    if (!draggingId) return;
    console.log("🚀 ~ handleMouseMove ~ event:", event);
    const x = event.clientX; //new mouse position
    const y = event.clientY;

    // change position of each node element on move into svg view
    // loop throug selected node and update its position

    setNodes((prev) => {
      return prev.map((node) => {
        if (node.id === draggingId) {
          return {
            ...node,
            x: event.clientX - offset.x,
            y: event.clientY - offset.y,
          };
        }

        return node;
      });
    });
  }

  function handleMouseDown(
    event: MouseEvent<SVGGElement>,
    node: { id: string; x: number; y: number }
  ) {
    console.log("🚀 ~ handleMouseDown ~ event:", event);
    setDraggingId(node.id);

    // // mouse position relative to node / to center position relative to node
    setOffset({
      x: event.clientX - node.x,
      y: event.clientY - node.y,
    });
  }

  function handleMouseUp() {
    setDraggingId("");
  }
  return (
    <svg
      width="100%"
      height="100vh"
      style={{ border: "1px solid #ccc" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      //minx miny width height (coordinate system) coordinate space
      // viewTarget={0}
    >
      {/* Edges */}
      {edges.map((edge, i) => {
        const source = getNode(edge.source);
        const target = getNode(edge.target);

        return (
          <g key={i}>
            <line
              className="cursor-pointer"
              onClick={() => handleEdgeDelete(edge.source, edge.target)}
              key={i}
              x1={source?.x} // x y of source node
              y1={source?.y}
              x2={target?.x} //x y of target node
              y2={target?.y} //edge position for particular mapped edge
              stroke="black" //edge color
            />
            {/* <text x={source?.x} y={source?.y} className="p-2 bg-red-600">
              Delete
            </text> */}
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <g //for grouping svg
          onDragStart={(e) => handleDragNode(node, e)}
          onDrag={(e) => handleDragNode(node, e)}
          key={node.id}
          onClick={() => handleNodeClick(node.id)}
          className="cursor-pointer"
          onMouseDown={(e) => handleMouseDown(e, node)}
        >
          <circle
            className="graph-circle"
            cx={node.x}
            cy={node.y}
            r={30}
            fill={selectedNode.source === node.id ? "#46e5c5" : "#7872db"}
            fillOpacity={100}
            // fillOpacity={0.5}
          ></circle>

          <text
            className="circle-title"
            x={node.x}
            y={node.y + 5}
            textAnchor="middle"
            fill="white"
            fontSize="12"
          >
            {node.id}
          </text>
        </g>
      ))}
    </svg>
  );
}
