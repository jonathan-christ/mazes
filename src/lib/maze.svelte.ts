import type { Cell, MazeConfig, Algorithm } from "./types";
import { dfs } from "./algos.svelte";

export const maze = $state<MazeConfig>({
    size: { width: 10, height: 10 },
    cells: [],
    finished: false
});

export const initializeMaze = (width: number, height: number) => {
    maze.size = { width, height }
    let newCells: Cell[][] = [];
    for (let y = 0; y < height; y++) {
        newCells[y] = [];
        for (let x = 0; x < width; x++) {
            newCells[y][x] = { x, y, visited: false, walls: { top: true, bottom: true, left: true, right: true } }
        }
    }
    maze.cells = newCells;
}

export const generateMaze = (algo: Algorithm = "dfs") => {
    switch (algo) {
        case "kruskals":
            // to be implemented
            break;
        default:
            // dfs
            dfs();
            break;
    }

    maze.finished = true;
}