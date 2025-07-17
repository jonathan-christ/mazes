<script lang="ts">
	import Cell from './Cell.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { maze, initializeMaze } from '$lib/maze.svelte';

	onMount(() => {
		checkMobile();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', checkMobile);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', checkMobile);
		}
	});

	const getPlace = (x: number, y: number) => {
		if (x === 0 && y === 0) return 'start';
		if (x === maze.size.width - 1 && y === maze.size.height - 1) return 'end';
		return 'mid';
	};

	const checkMobile = () => {
		const wasMobile = maze.isMobile;
		const isMobile = window.innerWidth < 1280;
		if (wasMobile !== isMobile) {
			maze.isMobile = isMobile;
			// Flip dimensions when screen flips from mobile and non-mobile
			initializeMaze(maze.size.height, maze.size.width);
		}
	};
</script>

{#if maze.initialized}
	<div class="border-primary flex w-fit flex-col border-1">
		{#each maze.cells as row, ridx (ridx)}
			<div class="flex">
				{#each row as cell, cidx (cidx)}
					<Cell {cell} place={getPlace(cell.x, cell.y)} />
				{/each}
			</div>
		{/each}
	</div>
{/if}
