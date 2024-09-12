<script>
    let stock_data = []
    let ticker = ''

    async function fetchStockData() {
        try {
            const response = await fetch(`https://finnhub.io/api/v1/search?q=${ticker}&exchange=US&token=${import.meta.env.VITE_FINNHUB_API_KEY}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.log('ERROR: failed to fetch stock data')
        }
    }

    async function handleSearch() {
        if (ticker) {
            try {
                stock_data = await fetchStockData()
                console.log(stock_data)
            } catch (error) {
                console.log('ERROR: failed to fetch stock data')
            }
        } else {
            stock_data = []
        }
    }
    $: console.log(stock_data)
</script>


<div class="Center">
    <input type="text" placeholder="Enter Ticker" bind:value={ticker} on:input={handleSearch}>
    <button on:click={handleSearch}>Search</button>
</div>

{#if stock_data.count > 0}
    <ul class="results">
        {#each stock_data.result as stock}
            <li>{stock.description}</li>
        {/each}
    </ul>
{/if}

<style>
</style>