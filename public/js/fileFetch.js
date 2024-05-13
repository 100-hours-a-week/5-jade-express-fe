async function getData(path, data){
    const path = `http://localhost:8080/${path}`;
    const options = {method:'GET', 
    body: JSON.stringify(data), 
    headers:{'Content-Type':'application/json'}};
    try{
        await fetch(path, options)
        .then(response => response.json())
        .then(data=>{
            const fetchData = data;
            return fetchData;
        })
    } catch(error){
        console.error('error: ', error);
        return null;
    }
}
async function postData(path, data){
    const path = `http://localhost:8080/${path}`;
    const options = {method:'POST', 
    body: JSON.stringify(data), 
    headers:{'Content-Type':'application/json'}};
    try{
        await fetch(path, options)
        .then(response => response.json())
        .then(data=>{
            const fetchData = data;
            return fetchData;
        })
    } catch(error){
        console.error('error: ', error);
        return null;
    }
}
async function patchData(path, data){
    const path = `http://localhost:8080/${path}`;
    const options = {method:'PATCH', 
    body: JSON.stringify(data), 
    headers:{'Content-Type':'application/json'}};
    try{
        await fetch(path, options)
        .then(response => response.json())
        .then(data=>{
            const fetchData = data;
            return fetchData;
        })
    } catch(error){
        console.error('error: ', error);
        return null;
    }
}
async function deleteData(path){
    const path = `http://localhost:8080/${path}`;
    const options = {method:'DELETE', 
    headers:{'Content-Type':'application/json'}};
    try{
        await fetch(path, options)
        .then(response => response.json())
        .then(data=>{
            const fetchData = data;
            return fetchData;
        })
    } catch(error){
        console.error('error: ', error);
        return null;
    }
}
module.exports = {getData, postData, patchData, deleteData};