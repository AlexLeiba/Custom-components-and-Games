import React from "react";

// An adjacency list is a way to represent a graph (a set of nodes with connections between them).
// Instead of listing all possible connections in a big table, you list only the neighbors of each node.
// For each node, keep a list of the nodes it is directly connected to.

//nodes shoud have : id x y and connections
const graphNodes = [
  { id: "A", connections: ["B"], x: 100, y: 200 },
  { id: "B", connections: ["A", "C"], x: 150, y: 300 },
  { id: "C", connections: ["B"], x: 125, y: 350 },
  { id: "D", connections: ["B"], x: 200, y: 350 },
];

// should have source and target and id
const graphEdges = [
  { id: 1, source: "A", target: ["B"] },
  { id: 2, source: "B", target: ["A", "C"] },
  { id: 3, source: "C", target: ["B"] },
  {
    id: 4,
    source: "D",
    target: ["B"],
  },
];

function getNode(nodeId: string) {
  return graphNodes.find((node) => node.id === nodeId);
}

export function GraphConnections() {
  return (
    <div>
      GraphConnections
      <svg width={800} height={800}>
        {graphEdges.map((edge) => {
          // get the coords x y of each node based on its ID
          const nodeSource = getNode(edge.source);
          console.log("🚀 ~ GraphConnections ~ nodeSource:", nodeSource);

          return edge.target.map((tar) => {
            const nodeTarget = getNode(tar);
            console.log("🚀 ~ GraphConnections ~ nodeTarget:", nodeTarget);
            return (
              <line
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

        {graphNodes.map((node) => {
          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="20"
                stroke="black"
                strokeWidth="3"
                fill="white"
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
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
