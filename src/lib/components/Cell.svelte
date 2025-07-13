<script lang="ts">
    import type { Cell } from "../types";
    import clsx from "clsx";

    let { cell }: { cell: Cell } = $props();
    const classes = $derived(clsx("h-4 w-4 shrink-0 border-black border-solid border-0", {
        "border-t-4": cell.walls.top,
        "border-r-4": cell.walls.right,
        "border-b-4": cell.walls.bottom,
        "border-l-4": cell.walls.left,
    }));
</script>

<div class={classes}></div>
