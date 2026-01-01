import React, { useState } from "react";

export function SvgGraph() {
  const [hoveredValue, setHoveredValue] = useState({ data: 0, x: 0, y: 0 });
  const dataPoints = [3, 4, 7, 3, 2, 10, 8];
  return (
    <div>
      <h1>SVG tests</h1>
      <svg width={400} height={400}>
        {dataPoints.map((data, index) => {
          return (
            <g>
              <rect
                className="chart-bar-svg"
                onMouseOver={() =>
                  setHoveredValue({
                    data: data,
                    x: 100 + index * 30 - 40,
                    y: 400 - data * 10 - 60, //to show above the element data tooltip
                  })
                }
                x={100 + index * 30}
                y={400 - data * 10}
                key={data}
                height={data * 10}
                width={20}
                fill={data > 5 ? "#3ddc0d" : "#ff0000"}
              />
              {hoveredValue.data && (
                <>
                  <rect
                    x={hoveredValue.x}
                    y={hoveredValue.y}
                    fill="#e4e4e4"
                    width={100}
                    height={50}
                  />
                  <text x={hoveredValue.x + 45} y={hoveredValue.y + 30}>
                    {hoveredValue.data}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
