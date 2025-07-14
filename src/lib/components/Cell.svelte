<script lang="ts">
	import type { Cell } from '../types';
	import clsx from 'clsx';

	let { cell, place }: { cell: Cell; place: 'start' | 'end' | 'mid' } = $props();
	const classes = $derived(
		clsx('h-2 w-2 shrink-0 border-black border-solid border-0', {
			'border-t': cell.walls.top,
			'border-r': cell.walls.right,
			'border-b': cell.walls.bottom,
			'border-l': cell.walls.left,
			'bg-green-600': place === 'start',
			'bg-red-600': place === 'end',
			'bg-yellow-400': cell.path,
			'bg-blue-400': cell.visited
		})
	);
</script>

<div class={classes}></div>
