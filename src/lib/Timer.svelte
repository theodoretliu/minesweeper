<script lang="ts">
  import { onMount } from 'svelte';
  export let startTime: number | undefined;
  export let endTime: number | undefined;

  let currentTime = Date.now();

  onMount(() => {
    const interval = setInterval(() => {
      currentTime = Date.now();
    }, 1000 / 60);

    return () => clearInterval(interval);
  });

  function computeDelta(
    startTime: number | undefined,
    endTime: number | undefined,
    currentTime: number
  ) {
    if (endTime && startTime) {
      return endTime - startTime;
    }

    if (startTime) {
      return currentTime - startTime;
    }

    return 0;
  }

  $: delta = computeDelta(startTime, endTime, currentTime);
</script>

<div class="absolute left-0">
  {Math.floor(delta / 1000)}.{(delta % 1000).toString().padStart(3, '0')}
</div>
