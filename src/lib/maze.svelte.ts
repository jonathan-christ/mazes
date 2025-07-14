import type { Cell, MazeConfig, SolvingAlgorithm, GenerationAlgorithm } from "./types";
import { dfs } from "./algorithms/generators.svelte";
import { bfs } from "./algorithms/solvers.svelte";

export const maze = $state<MazeConfig>({
    size: { width: 10, height: 10 },
    cells: [],
    finished: false,
    animationSpeedMS: 0,
});

export const initializeMaze = (width: number, height: number) => {
    maze.size = { width, height }
    let newCells: Cell[][] = [];
    for (let y = 0; y < height; y++) {
        newCells[y] = [];
        for (let x = 0; x < width; x++) {
            newCells[y][x] = { x, y, visited: false, path: false, walls: { top: true, bottom: true, left: true, right: true } }
        }
    }
    maze.cells = newCells;
    maze.finished = true;
}

export const generateMaze = async (algo: GenerationAlgorithm = "dfs") => {
    switch (algo) {
        case "kruskals":
            // to be implemented
            break;
        default:
            // dfs
            await dfs();
            break;
    }
}

export const solveMaze = async (algo: SolvingAlgorithm = "bfs") => {
    const solverAlgos = {
        bfs: bfs
    }

    const shortestPath = await solverAlgos[algo]();
    if (shortestPath === null) return;

    resetVisited();
    for (const cell of shortestPath) {
        cell.path = true
        await delay(maze.animationSpeedMS);
    };
}

export const resetVisited = () => {
    for (let y = 0; y < maze.size.height; y++) {
        for (let x = 0; x < maze.size.width; x++) {
            maze.cells[y][x].visited = false;
            maze.cells[y][x].path = false;
        }
    }
}

export const delay = async (ms: number) => {
    // Make instant if speed = 0 ms
    if (ms !== 0) return new Promise(res => setTimeout(res, ms));
}