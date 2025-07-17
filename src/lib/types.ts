export type GenerationAlgorithm = "dfs" | "kruskals";
export type SolvingAlgorithm = "bfs";

export type MazeSize = { width: number, height: number };
export type MazeSizeKeys = "small" | "medium" | "large";
export type WallKeys = "top" | "bottom" | "left" | "right";
export type WallData = { x: number, y: number, wallDirection: WallKeys};

export type MazeConfig = {
    size: MazeSize,
    cells: Cell[][],
    initialized: boolean,
    generated: boolean,
    animationSpeedMS: number,
    isMobile: boolean
}

export type Cell = {
    x: number,
    y: number,
    visited: boolean,
    path: boolean,
    walls: Record<WallKeys, boolean>
};
