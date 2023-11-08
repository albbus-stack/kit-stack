<script lang="ts">
	import { afterNavigate, disableScrollHandling } from '$app/navigation';

	afterNavigate(async () => {
		disableScrollHandling();
	});
</script>

<slot />
