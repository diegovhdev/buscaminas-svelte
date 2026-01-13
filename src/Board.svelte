<script>
  import { getContext } from "svelte";
  import Cell from "./Cell.svelte";

  const gameContext = getContext("gameContext")
  const cols = gameContext.cols
  const rows = gameContext.rows
  
</script>

<div class="board" 
     style:grid-template="repeat({cols})fr / repeat({rows})fr" 
     style:width="{cols*50}px" style:height="{rows*50}px">
  {#each gameContext.cells as cell (`${cell.col}x${cell.row}`)}
    <Cell {cell}/>
  {/each}

</div>

<style>
  .board {
    background-color: pink;
    display: grid;
    place-items: stretch;
  }

</style>