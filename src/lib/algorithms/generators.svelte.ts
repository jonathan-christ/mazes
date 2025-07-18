import type { Cell, WallKeys, WallData } from "../types"
import { delay, maze, resetVisited } from "../maze.svelte"
import { TOP, BOTTOM, LEFT, RIGHT } from "../const";

const coordMap: Record<WallKeys, { x: number, y: number }> = {
    top: TOP,
    bottom: BOTTOM,
    right: RIGHT,
    left: LEFT
}
const directionOpposite: Record<WallKeys, WallKeys> = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left"

}

export const dfs = async () => {
    let currentCell = maze.cells[0][0];
    const stack: Cell[] = [];

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
            await delay(maze.animationSpeedMS);
        }
    }
}

export const kruskals = async () => {
    const cellList: Cell[] = maze.cells.flat();
    let wallList: WallData[] = cellList.map((cell) => {
        // create list of directions type-safe
        const directions: WallKeys[] = Object.keys(cell.walls) as Array<WallKeys>;
        // for each direction, create an entry, so max 4 entries (walls) per cell
        return directions.map((direction) => {
            return { x: cell.x, y: cell.y, wallDirection: direction } as WallData
        })
    }).flat();
    // the array of arrays will be randomized
    for (let i = wallList.length - 1; i > 0; i--) {
        const idx = Math.floor(Math.random() * (i + 1));
        const temp = wallList[i];

        wallList[i] = wallList[idx];
        wallList[idx] = temp;
    }

    let cellSetList: Set<Cell>[] = cellList.map((cell) => {
        const set: Set<Cell> = new Set();
        set.add(cell);
        return set;
    });

    for (const wall of wallList) {
        // find connected cell
        const coord = coordMap[wall.wallDirection];
        const nbWall: WallData = {
            x: coord.x + wall.x,
            y: coord.y + wall.y,
            wallDirection: directionOpposite[wall.wallDirection]
        };
        if (nbWall.y < 0 || nbWall.x < 0 || nbWall.y >= maze.size.height || nbWall.x >= maze.size.width) continue;
        // remove duplicate wall
        wallList = wallList.filter((el) => el !== nbWall);

        const currCell = maze.cells[wall.y][wall.x];
        const nbCell = maze.cells[nbWall.y][nbWall.x]

        const currCellSetIdx = cellSetList.findIndex((set) => set.has(currCell));
        const nbCellSetIdx = cellSetList.findIndex((set) => set.has(nbCell));

        // dont proceed if they are in the same set
        if (currCellSetIdx === nbCellSetIdx) continue;
        // union and remove the neighbor's set if so to prevent duplicates
        cellSetList[currCellSetIdx] = cellSetList[currCellSetIdx].union(cellSetList[nbCellSetIdx]);
        cellSetList.splice(nbCellSetIdx, 1);

        // remove visual walls
        currCell.walls[wall.wallDirection] = false;
        nbCell.walls[nbWall.wallDirection] = false;

        currCell.visited = true;
        await delay(maze.animationSpeedMS);
        nbCell.visited = true;


        if (cellSetList.length === 1) break;
    }
}

export const prims = async () => {
    let currCell: Cell = maze.cells[0][0];
    let nbCell: Cell;
    let wallList: WallData[] = [];
    const directionList: WallKeys[] = Object.keys(currCell.walls) as Array<WallKeys>;

    const getCellWalls = (cell: Cell, directions: WallKeys[]): WallData[] => {
        return directions.map((direction) => {
            return { x: cell.x, y: cell.y, wallDirection: direction } as WallData;
        });
    }

    wallList = wallList.concat(getCellWalls(currCell, directionList));
    currCell.visited = true;
    while (wallList.length) {
        const randWall = wallList[Math.floor(Math.random() * wallList.length)];
        const direction = randWall.wallDirection;
        const coord = coordMap[direction];
        currCell = maze.cells[randWall.y][randWall.x];

        let unvisitedCell: Cell;
        let unvisitedDir: WallKeys

        const [nbX, nbY] = [coord.x + randWall.x, coord.y + randWall.y]

        if (!(nbX < 0 || nbX >= maze.size.width || nbY < 0 || nbY >= maze.size.height)) {
            nbCell = maze.cells[nbY][nbX];

            if ((nbCell.visited && !currCell.visited) || (!nbCell.visited && currCell.visited)) {
                currCell.walls[direction] = false;
                nbCell.walls[directionOpposite[direction]] = false;

                unvisitedCell = currCell.visited ? nbCell : currCell;
                unvisitedDir = currCell.visited ? directionOpposite[direction] : direction;

                unvisitedCell.visited = true;
                wallList = wallList.concat(getCellWalls(unvisitedCell, directionList.filter((dir) => dir !== unvisitedDir)));

                await delay(maze.animationSpeedMS);
            }
        }
        wallList = wallList.filter((wall) => wall !== randWall);
    }
}