import type { Cell } from "../types"
import { maze, resetVisited } from "../maze.svelte"
import { TOP, BOTTOM, LEFT, RIGHT } from "../const";

export const bfs = () : Cell[] | null => {
    let queue: Cell[] = [];
    let parents: Map<Cell, Cell> = new Map();
    let pathFound = false;

    let currentCell: Cell;
    let startCell = maze.cells[0][0];
    let endCell = maze.cells[maze.size.height - 1][maze.size.width - 1];

    queue.push(startCell);
    startCell.visited = true;


    // Main BFS loop using queue
    while (queue.length) {
        const popped = queue.shift();
        if (!popped) return null;

        currentCell = popped;
        if (currentCell === endCell) {
            pathFound = true;
            break;
        }

        const neighbors = [TOP, BOTTOM, RIGHT, LEFT];
        neighbors.forEach((loc) => {
            const currX = loc.x + currentCell.x;
            const currY = loc.y + currentCell.y;

            if (currX < 0 || currY < 0 || currX >= maze.size.width || currY >= maze.size.height) return;
            const neighbor = maze.cells[currY][currX];
            if (neighbor.visited) return;

            // Check if there's no wall between current cell and neighbor
            let canMove = false;
            if (loc === TOP && !currentCell.walls.top) canMove = true;
            else if (loc === BOTTOM && !currentCell.walls.bottom) canMove = true;
            else if (loc === RIGHT && !currentCell.walls.right) canMove = true;
            else if (loc === LEFT && !currentCell.walls.left) canMove = true;

            if (!canMove) return;

            neighbor.visited = true;
            parents.set(neighbor, currentCell);
            queue.push(neighbor);

        })
    }

    if (!pathFound) {
        console.log("No paths!");
        return null;
    }

    let shortestPath: Cell[] = [];
    currentCell = endCell;

    //Backtracking
    while (currentCell && currentCell !== startCell) {
        shortestPath.push(currentCell);
        const parent = parents.get(currentCell);
        if (!parent) return null;

        currentCell = parent;
    }

    shortestPath.shift();
    shortestPath.reverse();

    return shortestPath;
}