<script lang="js">
  import { setContext } from "svelte";
  import Board from "./Board.svelte";
  import {MinesweeperGame} from "./lib/minesweeper-game.svelte";

  setContext("gameContext", new MinesweeperGame(8, 9))
  /*const board = new MinesweeperBoard(8, 6)*/
</script>

<header class="contenedor">
  <h1>Buscaminas</h1>
  <Board />
</header>

<style>

  :global {
    * {
      margin: 0;
    }
  }

  .contenedor {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

