<script>
    let ticker = ''
    let results = []
    let errorMsg = ''

    async function fetchStockData(ticker) {
        const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=${import.meta.env.API_KEY}`);
        const data = await response.json();
        return data.bestMatches || [];
    }

    async function handleSearch() {
        if (ticker) {
            try {
                results = await fetchStockData(ticker)
                errorMsg = ''
            } catch (error) {
                errorMsg = error
            }
        }
    }
</script>


<div class="Center">
    <input type="text" placeholder="Enter Ticker" bind:value={ticker} on:input={handleSearch}>
    <button on:click={handleSearch}>Search</button>
</div>

<ul class="results">
    {#each results as result}
        <li>{result['1. symbol']} - {result['2. name']}</li>
    {/each}
</ul>

{#if errorMsg}
    <div class="error">
        Error Has Occured
    </div>
{/if}

<style>
</style>