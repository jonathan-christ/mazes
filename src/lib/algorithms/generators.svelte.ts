import type { Cell } from "../types"
import { maze, resetVisited } from "../maze.svelte"
import { TOP, BOTTOM, LEFT, RIGHT } from "../const";

export const dfs = () => {
    let currentCell = maze.cells[0][0];
    let stack: Cell[] = [];

    currentCell.visited = true;
    stack.push(currentCell);

    while (stack.length) {
        const popped = stack.pop();
        if (!popped) continue;

        currentCell = popped;
        const directions = [TOP, BOTTOM, RIGHT, LEFT];

        // Find unvisited neighbors
        const unvisited = directions.filter(dir => {
            const newX = currentCell.x + dir.x;
            const newY = currentCell.y + dir.y;
            
            if (newX < 0 || newX >= maze.size.width || newY < 0 || newY >= maze.size.height) return false;
            return !maze.cells[newY][newX].visited;
        });

        if (unvisited.length) {
            // Choose a random unvisited neighbor
            const randomDir = unvisited[Math.floor(Math.random() * unvisited.length)];
            const newX = currentCell.x + randomDir.x;
            const newY = currentCell.y + randomDir.y;
            const newCell = maze.cells[newY][newX];

            // Remove walls between current cell and new cell
            if (randomDir === TOP) {
                currentCell.walls.top = false;
                newCell.walls.bottom = false;
            } else if (randomDir === BOTTOM) {
                currentCell.walls.bottom = false;
                newCell.walls.top = false;
            } else if (randomDir === LEFT) {
                currentCell.walls.left = false;
                newCell.walls.right = false;
            } else if (randomDir === RIGHT) {
                currentCell.walls.right = false;
                newCell.walls.left = false;
            }

            // Mark new cell as visited and add to stack
            newCell.visited = true;
            stack.push(currentCell);
            stack.push(newCell);
        }
    }

    resetVisited();
}