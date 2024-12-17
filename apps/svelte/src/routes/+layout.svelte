<script lang="ts">
	import { PopupProvider } from '@expressthat/core/svelte';
	let { children } = $props();
</script>

<PopupProvider>
	{@render children()}
</PopupProvider>
