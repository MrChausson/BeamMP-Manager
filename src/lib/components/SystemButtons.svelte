<script lang="ts">
    import Button, { Label, Icon } from "@smui/button";
    import { HandlerManager } from "../HandlerManager";
</script>

<Button
    class="start-button"
    on:click={HandlerManager.handleStart}
    variant="raised"
>
    <Label>Start Server</Label>
    <Icon class="material-icons">play_arrow</Icon>
</Button>
<Button variant="raised" on:click={HandlerManager.handleStop}>
    <Label>Stop Server</Label>
    <Icon class="material-icons">stop</Icon>
</Button>
<Button
    class="restart-button"
    on:click={HandlerManager.handleRestart}
    variant="raised"
>
    <Label>Restart Server</Label>
    <Icon class="material-icons">restart_alt</Icon>
</Button>