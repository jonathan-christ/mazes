<script lang="ts">
	import { maze, initializeMaze, generateMaze } from '$lib/maze.svelte';
	import Cell from './Cell.svelte';
	import { onMount } from 'svelte';
	import type { MazeSize } from '$lib/types';

	let { size }: { size: MazeSize } = $props();

	onMount(() => {
		initializeMaze(size.width, size.height);
		generateMaze('dfs');
	});
</script>

{#if maze.finished}
	<div class="flex flex-col">
		{#each maze.cells as row}
			<div class="flex">
				{#each row as cell}
					<Cell {cell} />
				{/each}
			</div>
		{/each}
	</div>
{/if}
