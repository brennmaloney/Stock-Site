<script>
    import Graph from "../../components/stock-graph.svelte"

    let stock_data = []
    let ticker = ''
    let selected_stock = null

    async function fetchSearchStock() {
        try {
            const response = await fetch(`https://finnhub.io/api/v1/search?q=${ticker}&exchange=US&token=${import.meta.env.VITE_FINNHUB_API_KEY}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.log('ERROR: failed to fetch stock search')
        }
    }
    async function handleSearch() {
        if (ticker) {
            try {
                stock_data = await fetchSearchStock()
            } catch (error) {
                console.log('ERROR: failed to fetch stock search')
            }
        } else {
            stock_data = []
        }
    }

    async function fetchStockQuote(symbol) {
        try {
            const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.log('ERROR: failed to fetch stock quote')
        }
    }
    async function handleClick(stock) {
        if (stock) {
            try {
                const quoteData = await fetchStockQuote(stock.symbol)
                selected_stock = { ...stock, ...quoteData }
                console.log(selected_stock)
            } catch (error) {
                console.log('ERROR: failed to fetch stock quote')
            }
        }
    }
</script>

<br/>
<div class="px-4 py-2 md:px-8 md:py-2">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="h-80 flex flex-col p-4 rounded-lg bg-primary"> 
            <div class="flex items-center p-2 rounded-lg mb-2">
                <span class="material-symbols-outlined">query_stats</span>
                <input type="text" placeholder="Search Stock..." bind:value={ticker} on:input={handleSearch} class="ml-2 bg-transparent border-none outline-none flex-1 text-lg"/>
            </div>
            {#if stock_data.count > 0}
                <ul class="flex flex-col gap-2 ml-2">
                    {#each stock_data.result.slice(0, 5) as stock}
                        <li>
                            <button class="w-full px-4 py-2 rounded-full bg-secondary" on:click={() => handleClick(stock)}>
                                {stock.description}
                            </button>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
        {#if selected_stock}
            <div class="flex flex-col items-center p-4 rounded-lg">
                <h3 class="text-xl font-semibold">{selected_stock.description} ${selected_stock.c}</h3>
            </div>
            <div class="flex flex-col items-center p-4 rounded-lg mt-4">
                <p class="text-lg">Open: ${selected_stock.o}</p>
                <p class="text-lg">Close: ${selected_stock.c}</p>
                <p class="text-lg">Previous Close: ${selected_stock.pc}</p>
                <p class="text-lg">Change: ${selected_stock.d}</p>
            </div>
        {/if}
    </div>
</div>
