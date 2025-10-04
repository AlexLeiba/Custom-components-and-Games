const elements = [
  { name: "a" },
  { name: "b" },
  { name: "c" },
  { name: "d" },
  { name: "e" },
  { name: "f" },
  { name: "g" },
  { name: "h" },
];
export function GridContainer() {
  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr)))] grid-rows-[minmax(50px,1fr)] grid-flow-row gap-x-4 gap-y-4 ">
        {elements.map((element) => {
          return <Card name={element.name} />;
        })}
      </div>
      <div className="border-4 border-black relative top-0">
        <div className="transform-[translateY(0)] p-4 bg-green-300">
          to bottom
        </div>

        <div className="transform-[translateY(-100px)_translateY(-50px)_translateX(100px)_scale(2)_traslateY(100px)] hover:scale-200 transition-all duration-1000 bg-yellow-300 p-4">
          to bottom
        </div>
        <div className="  bg-gray-300 p-4">bottom - to right</div>
        <div className="transform-[translateX(-100px)_translateY(0)] bg-purple-300 p-4">
          to left llllllllllleft
        </div>
        <div
          className="bg-amber-700 p-4 transform-[translateY(100px)_translateX(-200px)_translateY(-100px)]
        "
        ></div>

        <div className="bg-black p-4 absolute top-0"></div>
      </div>
    </div>
  );
}

const Card = (props: { name: string }) => {
  return (
    <div className="bg-gray-200 p-4">
      <p className="text-2xl">{props.name}</p>
    </div>
  );
};
