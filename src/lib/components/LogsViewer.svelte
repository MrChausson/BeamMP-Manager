<script lang="ts">
    import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import Textfield from "@smui/textfield";
    import Button, { Label, Icon } from "@smui/button";

    let config = writable("");
    let tempConfig = "";
    let rows = 5;

    async function refreshConfig() {
        const response = await fetch("/api/logs");
        if (response.ok) {
            $config = await response.text();
            tempConfig = $config;
            rows = $config.split('\n').length;
        }
    }

    onMount(async () => {
        refreshConfig();
    });

</script>

<Accordion>
    <Panel>
        <Header>Log Viewer</Header>
        <Content>
            <Textfield disabled
                style="width: 100%;"
                helperLine$style="width: 100%;"
                textarea
                bind:value={tempConfig}
                label="Logs of BeamMP-Server"
                input$resizable={true}
                input$rows={rows}
            ></Textfield>
            <div class=buttons>
                <Button class="start-button" on:click={refreshConfig} variant="raised">
                    <Label>Reload logs</Label>
                    <Icon class="material-icons">restart_alt</Icon>
                </Button>
            </div>
        </Content>
    </Panel>
</Accordion>

<style>
    .buttons {
        margin-top: 1em;
    }
</style>