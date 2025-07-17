<script lang="ts">
	import { maze, initializeMaze, solveMaze, generateMaze } from '$lib/maze.svelte';
	import { Slider } from '$lib/components/ui/slider/index';
	import { Label } from '$lib/components/ui/label/index';
	import { Button } from '$lib/components/ui/button/index';
	import * as Select from '$lib/components/ui/select/index';
	import type { GenerationAlgorithm, MazeSizeKeys, SolvingAlgorithm } from '$lib/types';
	import { MAZE_SIZE } from '$lib/const';
	import { capitalizeFirstLetter } from '$lib/utils';
	import clsx from 'clsx';

	// Animation
	const maxDuration = 200;
	const minDuration = 0;

	let disableButtons = $state(false);
	let genAlgoSelected = $state<GenerationAlgorithm>('dfs');
	let solveAlgoSelected = $state<SolvingAlgorithm>('bfs');

	const genAlgoList: { value: GenerationAlgorithm; label: string }[] = [
		{ value: 'dfs', label: '(DFS) Depth-First Search' },
		// { value: 'kruskals', label: "Kruskal's Algorithm" }
	];

	const solveAlgoList: { value: SolvingAlgorithm; label: string }[] = [
		{ value: 'bfs', label: '(BFS) Breadth-First Search' }
	];

	const mazeSizeKeys = Object.keys(MAZE_SIZE) as MazeSizeKeys[];
	let mazeSizeTriggerValue = $state('Small');
</script>

{#snippet animationSpeedSlider()}
	<div class="flex flex-col gap-3">
		<Label for="slider-speed">Animation Speed</Label>
		<Slider
			type="single"
			min={ANIMATION_DURATION_MS.min}
			max={ANIMATION_DURATION_MS.max}
			bind:value={
				() => ANIMATION_DURATION_MS.max - maze.animationSpeedMS,
				(v) => (maze.animationSpeedMS = ANIMATION_DURATION_MS.max - v)
			}
			step={1}
			id="slider-speed"
		/>
	</div>
{/snippet}

{#snippet mazeSizeSelect()}
	<div class="flex flex-col gap-2">
		<Label for="select-size">Maze Size</Label>
		<Select.Root
			type="single"
			bind:value={
				(): MazeSizeKeys =>
					mazeSizeKeys.find((key) => {
						let width = maze.size.width;
						let height = maze.size.height;
						if (maze.isMobile) [width, height] = [height, width];
						
						return MAZE_SIZE[key].width === width && MAZE_SIZE[key].height === height;
					}) ?? 'small',
				(v: MazeSizeKeys) => {
					initializeMaze(MAZE_SIZE[v].width, MAZE_SIZE[v].height);
					mazeSizeTriggerValue = capitalizeFirstLetter(v);
				}
			}
		>
			<Select.Trigger id="select-size" class="w-full bg-white dark:[&_svg]:stroke-white"
				>{mazeSizeTriggerValue}</Select.Trigger
			>
			<Select.Content>
				{#each mazeSizeKeys as size, idx (idx)}
					<Select.Item value={size}>{capitalizeFirstLetter(size)}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
{/snippet}

{#snippet generateMazeButton()}
	<div class="flex h-fit w-full gap-1">
		<Button
			variant="outline"
			class="w-full shrink"
			disabled={disableButtons}
			onclick={async () => {
				disableButtons = true;
				initializeMaze(maze.size.width, maze.size.height, true);
				await generateMaze();
				disableButtons = false;
			}}
			>Generate
		</Button>
		<Select.Root type="single" bind:value={genAlgoSelected}>
			<Select.Trigger class="w-fit bg-white dark:[&_svg]:stroke-white"></Select.Trigger>
			<Select.Content>
				{#each genAlgoList as { value, label }, index (index)}
					<Select.Item {value}>{label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
{/snippet}

{#snippet solveMazeButton()}
	<div class="flex h-fit w-full gap-1">
		<Button
			variant="outline"
			class="w-full shrink"
			disabled={disableButtons || !maze.generated}
			onclick={async () => {
				disableButtons = true;
				await solveMaze();
				disableButtons = false;
			}}
			>Solve
		</Button>
		<Select.Root type="single" bind:value={solveAlgoSelected}>
			<Select.Trigger class="w-fit bg-white dark:[&_svg]:stroke-white"></Select.Trigger>
			<Select.Content>
				{#each solveAlgoList as { value, label }, index (index)}
					<Select.Item {value}>{label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
{/snippet}

<div
	class={clsx(
		'mt-4 flex h-fit w-full flex-row items-center justify-center gap-4' //h-[112px] or h-fit
		//if not mobile large 'fixed top-0'
	)}
>
	<!-- <div class="flex h-full flex-col justify-between w-full pl-8 lg:w-[300px]">
		{@render animationSpeedSlider()}
		{@render mazeSizeSelect()}
	</div>
	<div class="flex min-h-full flex-col justify-between w-full pr-8 lg:w-fit">
		{@render generateMazeButton()}
		{@render solveMazeButton()}
	</div> -->
	<div class="flex h-full w-full flex-col gap-4 px-8 lg:w-[300px] lg:px-0">
		{@render mazeSizeSelect()}
		<div class="flex h-fit w-full flex-row justify-between gap-4">
			{@render generateMazeButton()}
			{@render solveMazeButton()}
		</div>
		{@render animationSpeedSlider()}
	</div>
</div>
