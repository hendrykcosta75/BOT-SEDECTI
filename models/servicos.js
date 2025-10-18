export async function getServicos() {

     const data = {
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "***REMOVED***"
        },
        method: "GET"
    }

    const response = await fetch("https://api.smcmais.com.br/smcmais/servicos", data);
    const json = response.json();

    return json;

}