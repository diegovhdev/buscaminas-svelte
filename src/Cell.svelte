<script>
  import { getContext } from "svelte";
  import { gameInfo } from "./lib/game-info.svelte";

  const {cell} = $props()
  const gameContext = getContext("gameContext")

  function handleClick() {
    if (gameInfo.firstClick) {
      gameContext.startGame(cell)
      gameInfo.firstClick = false
      return;
    }
    gameContext.play(cell)
  }
  
</script>

<button style:grid-column-start="{cell.col}" style:grid-row-start="{cell.row}" onclick={handleClick}>
  {cell.state === "opened" ? cell.value : "?"}
</button>

<style>
  button {
    display: flex;
    align-items: center;      
    justify-content: center;  
    font-size: large;
    border: 1px solid black;
  }
</style>