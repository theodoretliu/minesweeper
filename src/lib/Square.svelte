<script lang="ts">
  import type { Square } from '$lib/mines';

  export let square: Square;
  export let onClick: () => void;

  let onRightClick = (e: MouseEvent) => {
    e.preventDefault();
    square.rightClick();
    square = square;
  };
</script>

<button
  class={`flex h-[20px] w-[20px] flex-col items-center justify-center border border-black
		${square.status === 'revealed' ? 'bg-white' : 'bg-blue-500'}
	`}
  on:click={onClick}
  on:contextmenu={onRightClick}
>
  {#if square.status === 'flagged'}
    <span class="text-white">F</span>
  {:else if square.status === 'revealed'}
    {square.mine ? '*' : square.numMineNeighbors === 0 ? ' ' : square.numMineNeighbors}
  {/if}
</button>
