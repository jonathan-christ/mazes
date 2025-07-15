<script lang="ts">
	import Maze from '$lib/components/Maze.svelte';
	import MazeControls from '$lib/components/MazeControls.svelte';
	import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
	title="MazeViz"
	titleTemplate="%s | Visualize Maze Algorithms"
	description="Explore and visualize popular maze generation and solving algorithms. Watch mazes come to life and paths being found step-by-step."
	canonical="https://mazeviz.by-ced.dev/"
	openGraph={{
		type: 'website',
		url: 'https://mazeviz.by-ced.dev/',
		title: 'MazeViz | Visualize Maze Algorithms',
		description:
			'Explore and visualize popular maze generation and solving algorithms. Watch mazes come to life and paths being found step-by-step.',
		images: [
			{
				url: 'https://mazeviz.by-ced.dev/og_image.png',
				width: 1200,
				height: 630,
				alt: 'MazeViz - Interactive Maze Generation and Solving Visualization'
			}
		],
		siteName: 'MazeViz'
	}}
	twitter={{
		title: 'MazeViz | Visualize Maze Algorithms',
		description:
			'Explore and visualize popular maze generation and solving algorithms. Watch mazes come to life and paths being found step-by-step.',
		image: 'https://mazeviz.by-ced.dev/og_image.png',
		cardType: 'summary_large_image'
	}}
/>

<div
	class="dark:bg-background flex min-h-screen w-screen flex-col items-center justify-start gap-12 bg-gray-400 pb-4"
>
	<MazeControls />
	<Maze />
</div>
