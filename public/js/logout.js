import { postData } from './fileFetch.js';

window.addEventListener("load", (event)=>{
    logoutFunction();
});

const logoutFunction = async function(){
    await postData("logout");
    window.location.assign("/");
}