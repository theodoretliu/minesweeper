<script lang="ts">
  import { Board } from './mines';
  import Timer from '$lib/Timer.svelte';
  import Square from '$lib/Square.svelte';

  let board = new Board();

  let startTime: number | undefined;
  let endTime: number | undefined;

  let reset = () => {
    board = new Board();
    startTime = undefined;
    endTime = undefined;
  };
</script>

<div class="mx-auto flex w-fit flex-col items-center gap-4 py-4">
  <div class="relative flex w-full flex-row items-center justify-center">
    <Timer {startTime} {endTime} />

    <button on:click={reset} class="w-fit rounded-lg bg-blue-500 px-4 py-2 text-white">Reset</button
    >
  </div>

  <div class="mx-auto w-fit border border-black">
    {#each board.board as r, i}
      <div class="flex flex-row">
        {#each r as square, j}
          <Square
            {square}
            onClick={() => {
              if (startTime === undefined) {
                startTime = Date.now();
              }
              square.click();
              board = board;
              if ((board.status === 'won' || board.status === 'lost') && endTime === undefined) {
                endTime = Date.now();
              }
            }}
          />
        {/each}
      </div>
    {/each}
  </div>
</div>
