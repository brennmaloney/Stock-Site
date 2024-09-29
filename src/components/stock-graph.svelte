<script>
    export let stock;
    import { fetchRecommendation } from "../lib/public_data";
    import { Chart, registerables } from "chart.js";
    
    Chart.register(...registerables);

    const Utils = {
        CHART_COLORS: {
            green: 'rgba(0, 255, 0, 1)',
            lightGreen: 'rgb(144, 238, 144, 1)',
            yellow: 'rgb(252, 245, 95, 1)',
            lightRed: 'rgb(250, 128, 114, 1)',
            red: 'rgba(255, 0, 0, 1)',
        },
        transparentize: function (color, opacity) {
            const rgba = color.replace('1)', `${opacity})`);
            return rgba;
        },
    };

    let recs = []
    let chart;
    let delayed;

    $: if (stock) {
        handleRecommendation()
    }
    async function handleRecommendation() {
        delayed = false;
        recs = await fetchRecommendation(stock.symbol)
        createGraph()
    }

    function createGraph() {
        if (chart) chart.destroy();
        const ctx = document.getElementById('StockGraph').getContext('2d');
        const [strongBuy, buy, hold, sell, strongSell, period] = ['strongBuy', 'buy', 'hold', 'sell', 'strongSell', 'period'].map(key => recs.map(item => item[key]).reverse());
        const max = Math.max(...strongBuy, ...buy, ...hold, ...sell, ...strongSell);

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: period,
                datasets: [{
                    data: strongBuy,
                    label: 'Strong Buy',
                    borderColor: Utils.CHART_COLORS.green,
                    backgroundColor: Utils.transparentize(Utils.CHART_COLORS.green, 0.5),
                    pointRadius: 8,
                    pointHoverRadius: 12
                }, {
                    data: buy,
                    label: 'Buy',
                    borderColor: Utils.CHART_COLORS.lightGreen,
                    backgroundColor: Utils.transparentize(Utils.CHART_COLORS.lightGreen, 0.5),
                    pointRadius: 8,
                    pointHoverRadius: 12
                }, {
                    data: hold,
                    label: 'Hold',
                    borderColor: Utils.CHART_COLORS.yellow,
                    backgroundColor: Utils.transparentize(Utils.CHART_COLORS.yellow, 0.5),
                    pointRadius: 8,
                    pointHoverRadius: 12
                }, {
                    data: sell,
                    label: 'Sell',
                    borderColor: Utils.CHART_COLORS.lightRed,
                    backgroundColor: Utils.transparentize(Utils.CHART_COLORS.lightRed, 0.5),
                    pointRadius: 8,
                    pointHoverRadius: 12
                }, {
                    data: strongSell,
                    label: 'Strong Sell',
                    borderColor: Utils.CHART_COLORS.red,
                    backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
                    pointRadius: 8,
                    pointHoverRadius: 12
                }]
            },
            options: {
                responsive: true,
                animation: {
                    onComplete: () => {
                        delayed = true;
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default' && !delayed) {
                            delay = context.dataIndex * 300 + context.datasetIndex * 100;
                        }
                        return delay;
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Recommendations for ' + stock.description
                    }
                },
                scales: {
                    y: {
                        max: max+3
                    }
                }
            }
        }); 
    }

</script>



{#if stock}
    <div class="flex bg-neutral h-max rounded-lg px-4">
        <canvas id="StockGraph"></canvas>
    </div>
{:else}
    <div class="flex bg-neutral h-max rounded-lg px-4">
        Please select a stock to view recommendations
    </div>
{/if}