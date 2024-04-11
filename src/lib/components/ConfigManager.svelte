<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import Textfield from "@smui/textfield";
    import Button, { Label, Icon } from "@smui/button";

    import HelperText from "@smui/textfield/helper-text";

    let config = writable("");
    let tempConfig = "";
    let rows = $config.split('\n').length;

    async function getConfig() {
        const response = await fetch("/api/config");
        if (response.ok) {
            $config = await response.text();
            tempConfig = $config;        }
    }

    onMount(async () => {
        getConfig();
    });

    async function applyConfig() {
        const response = await fetch("/api/config", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
            },
            body: tempConfig,
        });
        if (response.ok) {
            $config = tempConfig;
        }
        getConfig();
    }

    async function resetConfig() {
        const response = await fetch("/api/config", {
            method: "DELETE",
        });
        if (response.ok) {
            $config = "";
            tempConfig = "";
        }
        getConfig();
    }
</script>

<Textfield
    style="width: 100%;"
    helperLine$style="width: 100%;"
    textarea
    bind:value={tempConfig}
    label="Label"
    input$resizable={true}
    input$rows={rows}
></Textfield>
<Button class="start-button" on:click={applyConfig} variant="raised">
    <Label>Apply new config</Label>
    <Icon class="material-icons">download_icon</Icon>
</Button>
<Button variant="raised" on:click={resetConfig}>
    <Label>Reset config</Label>
    <Icon class="material-icons">warning_amber_icon</Icon>
</Button>
