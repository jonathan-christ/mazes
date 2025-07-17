import type { MazeSize, MazeSizeKeys } from "./types";

export const MAZE_SIZE: Record<MazeSizeKeys, MazeSize> = {
    small: { width: 10, height: 10 },
    medium: { width: 20, height: 20 },
    large: { width: 60, height: 20 }
};

export const TOP = { x: 0, y: -1 };
export const BOTTOM = { x: 0, y: 1 };
export const RIGHT = { x: 1, y: 0 };
export const LEFT = { x: -1, y: 0 };

export const ANIMATION_DURATION_MS = { min: 0, max: 100 };