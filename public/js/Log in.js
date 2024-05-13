const getData = require('./fileFetch').getData;

function validate(){
    const validateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validatePassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/;
    const email = document.getElementsByClassName("email")[0].value;
    const password = document.getElementsByClassName("password")[0].value;
    const helper = document.getElementsByClassName("helper_text")[0];
    const button = document.getElementsByClassName("login_button")[0];
    if(email.match(validateEmail) == null){
        helper.innerHTML = `* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)`;
        button.style.backgroundColor="#ACA0EB"
        return false;
    } else if(password.length==0){
        helper.innerHTML = `* 비밀번호를 입력해주세요.`;
        button.style.backgroundColor="#ACA0EB"
        return false;
    } else if(password.match(validatePassword)==null){
        helper.innerHTML = `* 비밀번호가 다릅니다.`;
        button.style.backgroundColor="#ACA0EB"
        return false;
    } else {
        helper.innerHTML = ``;
        button.style.backgroundColor="#7F6AEE"
        return true;
    }
}

async function buttonClicked(){
    const emailInput = document.getElementsByClassName("email")[0].value;
    const passwordInput = document.getElementsByClassName("password")[0].value;
    if(validate(emailInput, passwordInput)){
        const data = {email:emailInput, password:passwordInput}
        await getData("login", data)
        .then(response=>{
            if(response.status==200){
                const button = document.getElementsByClassName("login_button")[0];
                button.style.backgroundColor="#7F6AEE";
                button.style.cursor="grab";
                setTimeout(()=>{
                    window.location.assign("/Main");
                }, 3000);
            } else {
                console.log("해당하는 사용자가 없습니다");
            }
        })
    }
}