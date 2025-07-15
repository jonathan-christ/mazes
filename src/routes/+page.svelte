<script lang="ts">
	import Maze from '$lib/components/Maze.svelte';
	import MazeControls from '$lib/components/MazeControls.svelte';
</script>

<div class="min-h-screen w-screen flex flex-col justify-start items-center bg-gray-400 dark:bg-background gap-12 pb-4">
	<MazeControls/>
	<Maze />
</div>
