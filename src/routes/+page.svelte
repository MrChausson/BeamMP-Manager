<script lang="ts">
    import ResourcesList from '$lib/components/ResourcesList.svelte';
    import SystemButtons from "$lib/components/SystemButtons.svelte";
    import ServerState from "$lib/components/ServerState.svelte";
    import ServerInstaller from "$lib/components/ServerInstaller.svelte";
    import ConfigManager from "$lib/components/ConfigManager.svelte";
</script>

<SystemButtons />

<ServerState />

<ServerInstaller />

<ResourcesList />

<ConfigManager />