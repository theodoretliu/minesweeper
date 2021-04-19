<script lang="ts">
	import { initBoard, click } from './mines';
	import Square from '$lib/Square.svelte';

	let [board, clicked] = initBoard();
	console.log(board);
	// 	mines.push(coord);

	// 	mines = mines;

	// 	count++;
	// }
	// console.log(mines);

	// let row = 0;
	// let column = 0;

	// const handleArrowKeys = (e: KeyboardEvent) => {
	// 	switch (e.key) {
	// 		case 'ArrowDown':
	// 			row = Math.min(8, row + 1);
	// 			break;
	// 		case 'ArrowUp':
	// 			row = Math.max(0, row - 1);
	// 			break;
	// 		case 'ArrowLeft':
	// 			column = Math.max(0, column - 1);
	// 			break;
	// 		case 'ArrowRight':
	// 			column = Math.min(8, column + 1);
	// 			break;
	// 	}
	// };

	// const selectSquare = (i, j) => {
	// 	row = i;
	// 	column = j;
	// };

	// const handleNumbers = (e: KeyboardEvent) => {
	// 	if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
	// 		board[row][column] = parseInt(e.key, 10);
	// 	}
	// };

	// onMount(() => {
	// 	window.addEventListener('keydown', handleArrowKeys);

	// 	return () => {
	// 		window.removeEventListener('keydown', handleArrowKeys);
	// 	};
	// });

	// onMount(() => {
	// 	window.addEventListener('keydown', handleNumbers);

	// 	return () => {
	// 		window.removeEventListener('keydown', handleNumbers);
	// 	};
	// });
	$: console.log(clicked);
</script>

<div class="container">
	{#each board as r, i}
		<div class="row">
			{#each r as square, j}
				<Square
					clicked={clicked[i][j]}
					{square}
					onClick={() => (clicked = click(clicked, board, i, j))}
				/>
			{/each}
		</div>
	{/each}
</div>

<button on:click={() => ([board, clicked] = initBoard())}>Reset</button>

<style>
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.container {
		border: 0.5px solid black;
		width: fit-content;
		margin: 0px auto;
	}

	.selected {
		background-color: yellow;
	}
</style>
