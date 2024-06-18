import { getData, postData } from "./fileFetch.js";
document.getElementsByClassName("post")[0].addEventListener("change", validateForm);
document.getElementById("submit").addEventListener("click", Signin);
window.addEventListener("load", async (event)=>{
    const userList = await getData("users");
    validateForm(userList);
})

function findNickname(nickname, userData){
    const user = userData.find(elem=>elem.nickname===nickname)
    if(!user){
        return false;
     } else{
        return true;
    }
}
function findEmail(email, userData){
    const user = userData.find(elem=>elem.email===email);
    if(!user){
        return false;
    } else{
        return true;
    }
}

// 닉네임 검사
function validateNickname(nickname, userData){
    const helper = document.getElementById("nickname");
    const blank_pattern = /[\s]/g;
    if(nickname==""){
        helper.innerHTML = `* 닉네임을 입력해주세요`;
        return false;
    }
    // 닉네임에 공백 포함시
    else if(nickname.match(blank_pattern)!=null){
        helper.innerHTML = `* 띄어쓰기를 없애주세요`;
        return false;
    }
    // 닉네임 중복 시
    else if(findNickname(nickname, userData)){
        helper.innerHTML = `* 중복된 닉네임 입니다.`;
        return false;
    }
    // 닉네임 11자 이상 작성 시
    else if(nickname.length> 10){
        helper.innerHTML = `* 닉네임은 최대 10자 까지 작성 가능합니다.`;
        return false;
    }
    else{
        helper.innerHTML = ``;
        return true;
    }
}
// 비밀번호 검사
function validatePassword(password, password2){
    const validate = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/
    const helper = document.getElementById("password_helper");
    const helper2 = document.getElementById("password_check_helper");
    if(password==""){
        helper.innerHTML = `* 비밀번호를 입력해주세요.`;
        return false;
    }
    // 비밀번호 양식이 다를 시
    else if (password.match(validate)==null){
        helper.innerHTML = `* 비밀번호 양식을 맞춰주세요.`;
        return false;
    }
    else if(password2==""){
        helper.innerHTML = "";
        helper2.innerHTML = `* 비밀번호를 한번더 입력해주세요`;
        return false;
    }
    // 비밀번호 확인이 다를 시
    else if(!(password==password2)){
        helper.innerHTML = `* 비밀번호가 다릅니다.`;
        helper2.innerHTML = `* 비밀번호가 다릅니다.`;
        return false;
    }
    else{
        helper.innerHTML = "";
        helper2.innerHTML = "";
        return true;
    }
}
// 이메일 검사
function validateEmail(email, userData){
    const validate = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const helper = document.getElementById("email_helper");
    if(email==""){
        helper.innerHTML = `* 이메일을 입력해주세요.`;
        return false;
    }
    // 이메일 주소 형식이 다를 시
    else if(email.match(validate) == null){
        helper.innerHTML = `* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)`;
        return false;
    }
    // 이메일 중복 시
    else if(findEmail(email, userData)){
        helper.innerHTML = `* 중복된 이메일 입니다.`;
        return false;
    }
    else{
        helper.innerHTML = "";
        return true;
    }
}
async function validateForm(userData){
    // 이거 한번만 주는데 되려나 모르겠음
    const email=document.getElementsByClassName("email")[0];
    const password=document.getElementsByClassName("password")[0];
    const passwordCheck=document.getElementsByClassName("password_check")[0];
    const nickname=document.getElementsByClassName("nickname")[0];
    if(userData!==null
    && validateEmail(email.value, userData) 
    && validatePassword(password.value, passwordCheck.value) 
    && validateNickname(nickname.value, userData)){
        const button=document.getElementsByClassName("signin_button")[0];
        button.style.backgroundColor="#7F6AEE";
        button.style.cursor="grab";
    }
}
async function Signin(){
    const image="http://image.com/test";
    const email=document.getElementsByClassName("email")[0];
    const password=document.getElementsByClassName("password")[0];
    const nickname=document.getElementsByClassName("nickname")[0];
    const data = {
        email: email.value, 
        password: password.value, 
        nickname: nickname.value,
        profile_image: image
    }
    const success = await postData("user", data);
    if(success!=null&&success){
        console.log("회원가입이 완료되었습니다.");
        window.location.assign("/");
    } else {
        console.log("회원가입에 실패했습니다.");
    }
}