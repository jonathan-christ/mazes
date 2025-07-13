<script lang="ts">
	import Maze from '$lib/components/Maze.svelte';
	import { MAZE_SIZE } from '$lib/const';
</script>

<div class="h-screen w-screen">
	<Maze size={MAZE_SIZE.large} />
</div>
