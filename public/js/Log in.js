// user 파일 받아오는부분
async function loadFile(filename){
    const path = `http://localhost:3000/${filename}`;
    try{
        const response = await fetch(path);
        const json = await response.json();
        return json;
    } catch(error){
        console.error('error: ', error);
        return null;
    }
}

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
function findUser(email, password, userData){
    const user = userData.find(elem=>elem.email===email)
    if(!user){
        return true;
    } else if(user.password!=password){
        return true;
    } else{
        return false;
    }
}

// form에서 받아오는걸로 대체해볼까

async function buttonClicked(){
    const dataArr = await loadFile("users/user.json");
    const emailInput = document.getElementsByClassName("email")[0].value;
    const passwordInput = document.getElementsByClassName("password")[0].value;
    if(validate(emailInput, passwordInput)){
        if(findUser(emailInput, passwordInput, dataArr)){
            console.log("해당하는 사용자가 없습니다");
        } else{
            const button = document.getElementsByClassName("login_button")[0];
            button.style.backgroundColor="#7F6AEE";
            button.style.cursor="grab";
            setTimeout(()=>{
                window.location.assign("http://localhost:3000/views/Main.html");
            }, 3000);
        }
    }
}