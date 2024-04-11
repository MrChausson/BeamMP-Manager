<script lang="ts">
    import { onMount, setContext } from "svelte";
    let state = "";
    async function updateState() {
        const response = await fetch("/api/server-state");
        if (response.ok) {
            state = await response.json().then((data) => data.state);
        }
    }
    onMount(async () => {
        updateState();
    });
</script>

<p class="mdc-typography--headline4">Server state: {state}</p>
