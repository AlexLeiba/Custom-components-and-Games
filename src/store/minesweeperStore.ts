import { create } from "zustand";

export type CellType = {
  id: number;
  type: "mine" | "empty" | "number";
  number?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  flagged: boolean;
  selected: boolean;
};

type StoreType = {
  cellData: CellType[][];
  handleCellData: (data: CellType[][]) => void;

  flagged: boolean;
  toggleFlag: () => void;

  nrOfRows: number;
  handleNrOfRows: (nr: number) => void;

  nrOfMines: number;
  handleNrOfMines: (nr: number) => void;
};
export const useMinesweeperStore = create<StoreType>((set) => ({
  flagged: false,
  toggleFlag: () => set((state) => ({ flagged: !state.flagged })),

  cellData: [[]],
  handleCellData: (data) => set(() => ({ cellData: data })),

  nrOfRows: 9,
  handleNrOfRows: (data) => set(() => ({ nrOfRows: data })),

  nrOfMines: 9,
  handleNrOfMines: (data) => set(() => ({ nrOfMines: data })),
}));
