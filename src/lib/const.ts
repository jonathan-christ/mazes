import type { MazeSize } from "./types";

export const MAZE_SIZE: {
    small: MazeSize,
    medium: MazeSize,
    large: MazeSize
} = {
    small: { width: 10, height: 10 },
    medium: { width: 20, height: 20 },
    large: { width: 30, height: 30 }
};

export const TOP = { x: 0, y: -1 }
export const BOTTOM = { x: 0, y: 1 }
export const RIGHT = { x: 1, y: 0 }
export const LEFT = { x: -1, y: 0 }