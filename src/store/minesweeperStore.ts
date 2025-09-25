import { create } from "zustand";

export type CellType = {
  id: number;
  type: "mine" | "empty" | "number" | "exploded";
  number?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  flagged: boolean;
  selected: boolean;
};

type StoreType = {
  cellData: CellType[][];
  handleCellData: (data: CellType[][]) => void;

  flagged: boolean;
  toggleFlag: () => void;
  flaggsUsed: number;
  flaggedMines: number;

  nrOfRows: number;
  handleNrOfRows: (nr: number) => void;

  nrOfMines: number;
  handleNrOfMines: (nr: number) => void;

  timer: number;
  resetTimer: () => void;
  handleTimer: (time: number) => void;

  hasAMineExploded: boolean;
  handleHasAMineExploded: (data: boolean) => void;

  gameOver: boolean;
  handleGameOver: (data: boolean) => void;

  handleNewGame: () => void;

  gameStatsData: {
    name: string;
    time: number;
    clicks: number;
    mines: number;
  }[];

  gameStats: { time: number; clicks: number; name: string; mines: number };

  handleAddStatsData(data: {
    name: string;
    time: number;
    clicks: number;
    type: "won" | "lost";
    mines: number;
  }): void;

  handleClicks(): void;
  clicks: number;
};
export const useMinesweeperStore = create<StoreType>((set) => ({
  flagged: false,
  toggleFlag: () => set((state) => ({ flagged: !state.flagged })),
  flaggsUsed: 0,
  flaggedMines: 0,
  clicks: 0,
  gameStats: { name: "Game 1", time: 0, clicks: 0, mines: 0 },
  cellData: [[]],
  gameOver: false,
  gameStatsData: [],

  handleClicks: () => set((state) => ({ clicks: state.clicks + 1 })),
  handleAddStatsData: (data) =>
    set((state) => ({
      gameStatsData: [
        {
          name: `Game ${data.type} ${state.gameStatsData.length + 1}`,
          time: data.time,
          clicks: data.clicks,
          mines: data.mines,
        },
        ...state.gameStatsData,
      ],
    })),

  handleGameOver: (data) =>
    set((state) => {
      console.log("🚀 ~ state:", state);
      //save stats time anc clicks
      return {
        gameOver: data,
      };
    }),
  handleCellData: (data) => {
    let flaggsUsed = 0;
    let flaggedMines = 0;
    set((state) => {
      state.cellData.forEach((row) => {
        row.forEach((cell) => {
          if (cell.flagged) {
            flaggsUsed += 1;

            if (cell.type === "mine") {
              flaggedMines += 1;
            }
          }
        });
      });
      return { cellData: data, flaggsUsed, flaggedMines };
    });
  },

  nrOfRows: 9,
  handleNrOfRows: (data) => set(() => ({ nrOfRows: data })),

  nrOfMines: 9,
  handleNrOfMines: (data) => set(() => ({ nrOfMines: data })),

  timer: 0,
  resetTimer: () => set(() => ({ timer: 0 })),
  handleTimer: (data) => set(() => ({ timer: data })),

  hasAMineExploded: false,
  handleHasAMineExploded: (data) => {
    return set(() => {
      return {
        hasAMineExploded: data,
      };
    });
  },
  handleNewGame: () =>
    set(() => ({
      cellData: [[]],
      timer: 0,
      hasAMineExploded: false,
      gameOver: false,
      clicks: 0,
    })),
}));
