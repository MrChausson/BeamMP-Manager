<script lang="ts">
    import Button, { Label, Icon } from "@smui/button";
    import { HandlerManager } from "../HandlerManager";

    function handleClick() {
        if (window.confirm("This will stop the server and install the latest version of BeamMP-Server. Do you want to continue?")) {
            HandlerManager.handleInstall();
        }
    }
</script>

<Button
    class="restart-button"
    on:click={handleClick}
    variant="raised"
>
    <Label>Install/Reinstall Server</Label>
    <Icon class="material-icons">warning</Icon>
</Button>