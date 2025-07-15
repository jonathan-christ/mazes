<script lang="ts">
	import Cell from './Cell.svelte';
	import { onMount } from 'svelte';
	import { maze, initializeMaze } from '$lib/maze.svelte';
	import { MAZE_SIZE } from '$lib/const';

	const defaultSize = MAZE_SIZE.small;
	onMount(() => {
		maze.isMobile = window.screen.width < 768;
		initializeMaze(defaultSize.width, defaultSize.height);
	});

	const getPlace = (x: number, y: number) => {
		if (x === 0 && y === 0) return 'start';
		if (x === maze.size.width - 1 && y === maze.size.height - 1) return 'end';
		return 'mid';
	};
</script>


{#if maze.initialized}
	<div class="flex w-fit flex-col border-1 border-primary">
		{#each maze.cells as row}
			<div class="flex">
				{#each row as cell}
					<Cell {cell} place={getPlace(cell.x, cell.y)} />
				{/each}
			</div>
		{/each}
	</div>
{/if}
