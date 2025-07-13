<script lang="ts">
    import type { Cell } from "../types";
    import clsx from "clsx";

    let { cell }: { cell: Cell } = $props();
    const classes = $derived(clsx("h-2 w-2 shrink-0 border-black border-solid border-0", {
        "border-t": cell.walls.top,
        "border-r": cell.walls.right,
        "border-b": cell.walls.bottom,
        "border-l": cell.walls.left,
    }));
</script>

<div class={classes}></div>
