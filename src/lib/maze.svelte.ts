import type { Cell, MazeConfig, SolvingAlgorithm, GenerationAlgorithm } from "./types";
import { dfs, kruskals } from "./algorithms/generators.svelte";
import { bfs } from "./algorithms/solvers.svelte";
import { MAZE_SIZE, ANIMATION_DURATION_MS } from "./const";

export const maze = $state<MazeConfig>({
    size: MAZE_SIZE.small,
    cells: [],
    initialized: false,
    generated: false,
    animationSpeedMS: (ANIMATION_DURATION_MS.max + ANIMATION_DURATION_MS.min)/2,
    isMobile: false
});

export const initializeMaze = (
    width: number = maze.size.width,
    height: number = maze.size.height,
    keepOrientation: boolean = false
) => {
    if (maze.isMobile && !keepOrientation) {
        const x = width;
        width = height;
        height = x;
    }

    maze.size = { width, height };
    const newCells: Cell[][] = [];
    for (let y = 0; y < height; y++) {
        newCells[y] = [];
        for (let x = 0; x < width; x++) {
            newCells[y][x] = { x, y, visited: false, path: false, walls: { top: true, bottom: true, left: true, right: true } }
        }
    }
    maze.cells = newCells;
    maze.initialized = true;
    maze.generated = false;
}

export const generateMaze = async (algo: GenerationAlgorithm = "dfs") => {
    const generatorAlgos = {
        kruskals: kruskals,
        dfs: dfs
    }

    await generatorAlgos[algo]();
    resetVisited();
    maze.generated = true;
}

export const solveMaze = async (algo: SolvingAlgorithm = "bfs") => {
    const solverAlgos = {
        bfs: bfs
    }

    resetVisited();
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