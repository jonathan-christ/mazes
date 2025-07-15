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
        title: 'MazeViz | Interactive Maze Algorithms', 
        description:
            "Dive into the world of mazes! Visualize algorithms for generating and solving in a web application.",
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
            "Generate and solve mazes with a visual twist! See how generation and solving algorithms work in real-time. A fun tool for algorithm enthusiasts.",
        image: 'https://mazeviz.by-ced.dev/og_image.png', 
        cardType: 'summary_large_image'
    }}
/>

<div class="min-h-screen w-screen flex flex-col justify-start items-center bg-gray-400 dark:bg-background gap-12 pb-4">
	<MazeControls/>
	<Maze />
</div>
