const promiseResponse = fetch('http://localhost:3000/users',{
    method: "GET",
});
console.log(promiseResponse);
console.log("inicio requisição");
promiseResponse.then(function(response){
    const promiseJson = response.json();
    console.log("promessa",promiseJson);
    promiseJson.then(function(json){
        console.log("json",json);
        console.log(json["Data atual"]);
        console.log(json["usuario"]);
        const data = new Date(json["Data atual"]);
        console.log("data",data);
        console.log("data",data.getTime());
    });
});
console.log("fim requisição");