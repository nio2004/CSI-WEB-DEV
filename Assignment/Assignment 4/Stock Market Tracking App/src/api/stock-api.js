 const basePath = "https://finnhub.io/api/v1";
 const api_key = "cl7hi01r01qsmhruc2ngcl7hi01r01qsmhruc2o0";

 export const searchSymbol = async (query) => {
    const url = `${basePath}/search?q=${query}&token=${api_key}`;
    const response = await fetch(url);

    if(!response.ok){
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
 };

 export const fetchStockDetails = async (stockSymbol) => {
    const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${api_key}`;
    const response = await fetch(url);

    if(!response.ok){
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
 };

export const fetchQuote = async (stockSymbol) => {
    const url = `${basePath}/quote?symbol=${stockSymbol}&token=${api_key}`;
    const response = await fetch(url);

    if(!response.ok){
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
 }; 

 export const fetchHistoricalData = async (
    stockSymbol,
    resolution,
    from,
    to
 ) => {
    const url = `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${api_key}`; 
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}; 