<script lang="ts">
	import Cell from './Cell.svelte';
	import type { MazeSize } from '$lib/types';
	import { onMount } from 'svelte';
	import { maze, initializeMaze, generateMaze, solveMaze } from '$lib/maze.svelte';

	let { size }: { size: MazeSize } = $props();

	onMount(() => {
		initializeMaze(size.width, size.height);
	});

	const getPlace = (x: number, y: number) => {
		if (x === 0 && y === 0) return 'start';
		if (x === maze.size.width - 1 && y === maze.size.height - 1) return 'end';
		return 'mid';
	};

	let disableButtons = $state(false);
</script>

<div>
	<input
		type="range"
		min="0"
		max="100"
		value="0"
		id="animation-speed"
		oninput={(e) => maze.animationSpeedMS = +(e.target as HTMLInputElement).value}
	/>
	<button
		disabled={disableButtons}
		onclick={async () => {
			disableButtons = true;
			initializeMaze(size.width, size.height);
			await generateMaze();
			disableButtons = false;
		}}>Generate</button
	>
	<button
		disabled={disableButtons}
		onclick={async () => {
			disableButtons = true;
			await solveMaze();
			disableButtons = false;
		}}>Solve</button
	>
</div>
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
