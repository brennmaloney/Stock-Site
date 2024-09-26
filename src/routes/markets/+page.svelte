<script>
    import Graph from "../../components/stock-graph.svelte"
    import { fetchQuote, fetchStock } from '../../lib/public_data.js'

    let stock_data = []
    let symbol = ''
    let selected_stock = null

    async function handleSearch() {
        if (symbol) {
            stock_data = await fetchStock(symbol)
        } else {
            stock_data = []
        }
    }
    async function handleClick(stock) {
        if (stock) {
            const quoteData = await fetchQuote(stock.symbol)
            selected_stock = { ...stock, ...quoteData }
            console.log(selected_stock)
        }
    }
</script>

<br/>
<div class="px-4 py-2 md:px-8 md:py-2 text-white">
    <div class="grid sm:grid-cols-1 md:grid-cols-[1fr_3fr] gap-4">
        <div class="flex flex-col gap-4">
            <div class="h-80 flex flex-col p-4 rounded-lg bg-neutral"> 
                <div class="flex items-center p-2 rounded-lg mb-2 bg-accent">
                    <span class="material-symbols-outlined">query_stats</span>
                    <input type="text" placeholder="Search Stock..." bind:value={symbol} on:input={handleSearch} class="ml-2 bg-transparent border-none outline-none flex-1 text-lg placeholder-white"/>
                </div>
                {#if stock_data.count > 0}
                    <ul class="flex flex-col gap-2">
                        {#each stock_data.result.slice(0, 5) as stock}
                            <li>
                                <button class="w-full px-4 py-2 rounded-full bg-accent" on:click={() => handleClick(stock)}>
                                    {stock.description}
                                </button>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>
            {#if selected_stock}
                <div class="flex flex-col items-center p-4 rounded-lg bg-neutral">
                    <h3 class="text-xl font-semibold">{selected_stock?.description} ${selected_stock?.c}</h3>
                </div>
                <div class="grid grid-cols-2 p-4 rounded-lg bg-neutral">
                    <div class="flex flex-col">
                        <p class="text-lg">Open:</p>
                        <p class="text-lg">Close:</p>
                        <p class="text-lg">Previous Close:</p>
                        <p class="text-lg">Change:</p>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-lg">${selected_stock?.o}</p>
                        <p class="text-lg">${selected_stock?.c}</p>
                        <p class="text-lg">${selected_stock?.pc}</p>
                        <p class="text-lg">${selected_stock?.d}</p>
                    </div>
                </div>
            {/if}
        </div>
        <div>
            <Graph stock={selected_stock}/>
        </div>
    </div>
</div>
