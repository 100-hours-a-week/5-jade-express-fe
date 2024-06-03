import { patchData } from "./fileFetch.js";

document.getElementById("submit").addEventListener("click", updatePassword);

async function getUser(){
    const password = document.getElementById("password");
    const passwordCheck = document.getElementById("password_check");
    window.addEventListener("keyup", (event)=>{
        validatePassword(password.value, passwordCheck.value);
    })
}
// 비밀번호 검사
function validatePassword(password, password2){
    const validate = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/
    const helper = document.getElementById("password_helper");
    const helper2 = document.getElementById("password_check_helper");
    const button = document.getElementsByClassName("password_button")[0];
    if(password==""){
        helper.innerHTML = `* 비밀번호를 입력해주세요.`;
        button.style.backgroundcolor="#ACA0EB";
        return false;
    }
    // 비밀번호 양식이 다를 시
    else if (password.match(validate)==null){
        helper.innerHTML = `* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.`;
        button.style.backgroundcolor="#ACA0EB";
        return false;
    }
    else if(password2==""){
        helper.innerHTML = "";
        helper2.innerHTML = `* 비밀번호를 한번더 입력해주세요`;
        button.style.backgroundcolor="#ACA0EB";
        return false;
    }
    // 비밀번호 확인이 다를 시
    else if(!(password==password2)){
        helper.innerHTML = `* 비밀번호 확인과 다릅니다.`;
        helper2.innerHTML = `* 비밀번호와 다릅니다.`;
        button.style.backgroundcolor="#ACA0EB";
        return false;
    }
    else{
        helper.innerHTML = "";
        helper2.innerHTML = "";
        button.style.backgroundColor="#7F6AEE";
        return true;
    }
}
window.addEventListener("load", (event)=>{
    getUser();
})
async function updatePassword(){
    const password = document.getElementById("password");
    const password_check = document.getElementById("password_check");
    const toast = document.getElementsByClassName("profile_message")[0];
    if(validatePassword(password.value, password_check.value)){
        const userId = 1;
        // 세션에서 받아오는걸로 수정
        const data = {password:password.value};
        const success = await patchData(`user/password/${userId}`, data)
        if(success!==null && success){
            toast.innerHTML = "비밀번호가 변경되었습니다.";
        } else {
            toast.innerHTML = "비밀번호 변경에 실패했습니다.";
        }
        toast.style.opacity = 1;
        await setTimeout(()=>{
            toast.style.opacity=0;
        }, 2000);
    }
}