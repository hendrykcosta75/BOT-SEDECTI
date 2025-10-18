export async function returnCurso(){
    
    const data = {
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "***REMOVED***"
        },
        method: "POST",
        body: JSON.stringify({})
    }

    const response = await fetch("https://api.smcmais.com.br/cursos/list", data);
    const json = response.json();

    return json;
}