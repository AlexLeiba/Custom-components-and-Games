function Loops() {
  const week = "Week";
  const day = "Day";
  const hours = "Hours";

  for (let i = 1; i <= 2; i++) {
    //outer loop
    for (let j = 1; j <= 5; j++) {
      //inner loop
      if (j === 3) {
        throw new Error("Error in Loops component");
      }
      console.log(`${week} ${i} - ${day} ${j}`);

      for (let k = 0; k <= 12; k++) {
        //innermost loop
        console.log(`${week} ${i} - ${day} ${j} - ${hours} ${k}`);

        // The most inner loops are, the slower will run code
      }
    }
  }
  return <div>Loops</div>;
}

export default Loops;
