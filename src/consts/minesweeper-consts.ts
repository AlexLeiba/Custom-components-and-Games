export const DIRECTIONS = [
  // top
  [-1, -1],
  [-1, 0],
  [-1, 1],
  //   middle
  [0, -1],
  [0, 0],
  [0, 1],
  // bottom
  [1, -1],
  [1, 0],
  [1, 1],
];

// THE 8 DIRECTIONS INDEXES AROUN A CELL
//In order to find out what is going on around a particular cell we will get all 8 indexes and substract from the current iterable indexes so we can see what happens in those objects around the cell (to extract the values from around cells )

// from [1][1] ->cells =

// left-> [1][0] right-> [1][2]

// top->
// [0][0] [0][1] [0][2]
//  bottom-> [2][0] [2][1] [2][2]
