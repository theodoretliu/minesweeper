<script lang="ts">
	import type { Square } from '$lib/mines';

	export let clicked: boolean;
	export let square: Square;
	export let onClick: () => void;
</script>

<div class="square" class:clicked on:click={onClick}>
	{clicked ? (square.type === 'mine' ? '*' : square.count === 0 ? ' ' : square.count) : ' '}
</div>

<style>
	.square {
		width: 50px;
		height: 50px;
		border: 0.5px solid black;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		background: blue;
	}

	.clicked {
		background: white;
	}
</style>
