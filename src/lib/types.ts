export type MazeSize = { width: number, height: number };
export type Cell = {
    x: number,
    y: number,
    visited: boolean,
    walls: {
        top: boolean,
        right: boolean,
        bottom: boolean,
        left: boolean
    }
};
export type MazeConfig = { size: MazeSize, cells: Cell[][], finished: boolean }
export type Algorithm = "dfs" | "kruskals";