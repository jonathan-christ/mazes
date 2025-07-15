<script lang="ts">
	import clsx from 'clsx';
	import type { Cell } from '../types';
	import { maze } from '$lib/maze.svelte';
	import { twMerge } from 'tailwind-merge';

	let { cell, place }: { cell: Cell; place: 'start' | 'end' | 'mid' } = $props();
	const classes = $derived(twMerge(
		clsx('h-4 w-4 shrink-0 border-solid border-0', {
			'border-t': cell.walls.top,
			'border-r': cell.walls.right,
			'border-b': cell.walls.bottom,
			'border-l': cell.walls.left,
			'bg-background border-input': !maze.generated,
			'bg-white dark:border-white/60 dark:bg-background': maze.generated,
			'bg-blue-400 dark:border-white/60 dark:bg-blue-600': cell.visited,
			'bg-yellow-400 dark:bg-yellow-600': cell.path,
			'bg-green-600 dark:bg-green-600': place === 'start',
			'bg-red-600 dark:bg-red-600': place === 'end',
		})
	));
</script>

<div class={classes}></div>
