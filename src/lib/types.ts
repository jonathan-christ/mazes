export type MazeSize = { width: number, height: number };
export type Cell = {
    x: number,
    y: number,
    visited: boolean,
    path: boolean,
    walls: {
        top: boolean,
        right: boolean,
        bottom: boolean,
        left: boolean
    }
};
export type MazeConfig = {
    size: MazeSize,
    cells: Cell[][],
    initialized: boolean,
    generated: boolean,
    animationSpeedMS: number,
    isMobile: boolean
}
export type GenerationAlgorithm = "dfs" | "kruskals";
export type SolvingAlgorithm = "bfs";
export type MazeSizeKeys = "small" | "medium" | "large";