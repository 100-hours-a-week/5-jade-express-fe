// 성공시 json, 실패시 null
export async function getData(path){
    const url = `http://localhost:8080/${path}`;
    const options = {method:'GET', 
    headers:{'Content-Type':'application/json'}};
    try{
        const response = await fetch(url, options)
        if(response.status==200){
            const fetchData = await response.json();
            return fetchData;
        }else{
            return null;
        }
    } catch(error){
        console.error('error: ', error);
        return null;
    }
}
// 성공시 true, 실패시 false, 에러시 null
export async function postData(path, data){
    const url = `http://localhost:8080/${path}`;
    const options = {method:'POST', 
    body: JSON.stringify(data), 
    headers:{'Content-Type':'application/json'}};
    try{
        const response = await fetch(url, options);
        if(response.status==200){
            return true;
        }
        return false;
    } catch(error){
        console.error('error: ', error);
        return null;
    }
}
// 성공시 true, 실패시 false, 에러시 null
export async function patchData(path, data){
    const url = `http://localhost:8080/${path}`;
    const options = {method:'PATCH', 
    body: JSON.stringify(data), 
    headers:{'Content-Type':'application/json'}};
    try{
        const response = await fetch(url, options)
        if(response.status==200){
            return true;
        }
        else return false;
    } catch(error){
        console.error('error: ', error);
        return null;
    }
}
// 성공시 true, 실패시 false, 에러시 null
export async function deleteData(path){
    const url = `http://localhost:8080/${path}`;
    const options = {method:'DELETE', 
    headers:{'Content-Type':'application/json'}};
    try{
        const response = await fetch(url, options);
        if(response.status==200){
            return true;
        }
        else return false;
    } catch(error){
        console.error('error: ', error);
        return null;
    }
}