<script lang="ts">
	import Cell from './Cell.svelte';
	import type { MazeSize } from '$lib/types';
	import { onMount } from 'svelte';
	import { maze, initializeMaze, generateMaze, solveMaze } from '$lib/maze.svelte';

	let { size }: { size: MazeSize } = $props();

	onMount(() => {
		initializeMaze(size.width, size.height);
		// Ensure cells are initialized before generating maze
		setTimeout(() => {
			generateMaze('dfs');
		}, 0);

		setTimeout(() => {
			solveMaze('bfs');
		}, 0);
	});

	const getPlace = (x: number, y: number) => {
		if (x === 0 && y === 0) return 'start';
		if (x === maze.size.width - 1 && y === maze.size.height - 1) return 'end';
		return 'mid';
	};
</script>

{#if maze.finished}
	<div class="flex w-fit flex-col border-1">
		{#each maze.cells as row}
			<div class="flex">
				{#each row as cell}
					<Cell {cell} place={getPlace(cell.x, cell.y)} />
				{/each}
			</div>
		{/each}
	</div>
{/if}
