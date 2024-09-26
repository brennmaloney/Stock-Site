<script>
    export let stock;

    import { fetchRecommendation } from "../lib/public_data";
    

    let rec = []

    $: if (stock) {
        handleRecommendation()
    }

    async function handleRecommendation() {
        rec = await fetchRecommendation(stock.symbol)
        console.log(rec)
    }

</script>



{#if stock}
    <div class="flex bg-neutral h-screen rounded-lg p-4">
        Graph
    </div>
{:else}
    <div class="flex bg-neutral h-screen rounded-lg p-4">
        Please select a stock to view recommendations
    </div>
{/if}