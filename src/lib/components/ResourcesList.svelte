<script lang="ts">
    import { onMount, setContext } from "svelte";
    import List, {
        Item,
        Graphic,
        Meta,
        Text,
        PrimaryText,
        SecondaryText,
    } from "@smui/list";
    let clientResources: any[] = [];
    let serverResources: any[] = [];

    function formatSize(size: number) {
        if (size < 1024) {
            return `${size} bytes`;
        }
        if (size < 1024 * 1024) {
            return `${(size / 1024).toFixed(2)} KB`;
        }
        return `${(size / 1024 / 1024).toFixed(2)} MB`;
    }

    async function getResources(folder: string) {
        const resourcesResponse = await fetch(`/api/resources/${folder}`);
        if (resourcesResponse.ok) {
            const resjson = await resourcesResponse.json();
            return resjson.list;
        }
        return [];
    }
    async function updateResources() {
        clientResources = await getResources("Client");
        serverResources = await getResources("Server");
    }
    async function deleteResource(folder: string, filename: string) {
        const response = await fetch(`/api/resources/${folder}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename: filename }),
        });
        if (response.ok) {
            console.log(`Resource ${filename} deleted`);
            // reload resources
            updateResources();
        }
    }

    function uploadResource(folder: string) {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".zip";
        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) {
                return;
            }
            const formData = new FormData();
            formData.append("file", file);
            formData.append("filename", file.name);
            const response = await fetch(`/api/resources/${folder}`, {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                console.log(`Resource ${file.name} uploaded`);
                // reload resources
                updateResources();
            }
        };
        input.click();
    }
    onMount(async () => {
        updateResources();
    });
</script>

<div>
    <div class="header">
        <p class="mdc-typography--headline4">Client Resources</p>
        <button
            class="mdc-button mdc-button--raised"
            on:click={() => uploadResource("Client")}
        >
            <span class="mdc-button__label">Upload</span>
        </button>
    </div>
    <List class="resource-list" twoLine avatarList singleSelection>
        {#each clientResources as resource (resource.filename)}
            <Item
                href="javascript:void(0)"
                on:click={() => deleteResource("Client", resource.filename)}
            >
                <Graphic
                    style="background-image: url(https://placehold.co/40x40?text={resource.filename});"
                />
                <Text>
                    <PrimaryText>{resource.filename}</PrimaryText>
                    <SecondaryText>{formatSize(resource.size)}</SecondaryText>
                </Text>
                <Meta class="material-icons">delete</Meta>
            </Item>
        {/each}
    </List>

    <div class="header">
        <p class="mdc-typography--headline4">Server Resources</p>
        <button
            class="mdc-button mdc-button--raised"
            on:click={() => uploadResource("Server")}
        >
            <span class="mdc-button__label">Upload</span>
        </button>
    </div>
    <List class="resource-list" twoLine avatarList singleSelection>
        {#each serverResources as resource (resource.filename)}
            <Item
                href="javascript:void(0)"
                on:click={() => deleteResource("Server", resource.filename)}
            >
                <Graphic
                    style="background-image: url(https://placehold.co/40x40?text={resource.filename});"
                />
                <Text>
                    <PrimaryText>{resource.filename}</PrimaryText>
                    <SecondaryText>{formatSize(resource.size)}</SecondaryText>
                </Text>
                <Meta class="material-icons">delete</Meta>
            </Item>
        {/each}
    </List>
</div>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
