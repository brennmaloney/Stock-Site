async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch stock data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return null;
    }
}

export async function fetchQuote(symbol) {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`;
    return fetchData(url);
}   

export async function fetchStock(symbol) {
    const url = `https://finnhub.io/api/v1/search?q=${symbol}&exchange=US&token=${import.meta.env.VITE_FINNHUB_API_KEY}`;
    return fetchData(url);
}

export async function fetchRecommendation(symbol) {
    const url = `https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`;
    return fetchData(url);
}