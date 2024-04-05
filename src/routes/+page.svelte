<script lang="ts">
    import { onMount } from 'svelte';
    let state = "";
    import Button, { Label, Icon } from "@smui/button";
    import { HandlerManager } from "../lib/HandlerManager";

    onMount(async () => {
        const response = await fetch('/api/server-state');
        if (response.ok) {
            state = await response.json().then(data => data.state);
        }
    });
</script>

<Button class="start-button" on:click={HandlerManager.handleStart} variant="raised">
    <Label>Start Server</Label>
    <Icon class="material-icons">play_arrow</Icon>
</Button>
<Button variant="raised" on:click={HandlerManager.handleStop}>
    <Label>Stop Server</Label>
    <Icon class="material-icons">stop</Icon>
</Button>
<Button class="restart-button" on:click={HandlerManager.handleRestart} variant="raised">
    <Label>Restart Server</Label>
    <Icon class="material-icons">restart_alt</Icon>
</Button>
<p class="mdc-typography--headline4">Server state: {state}</p>
