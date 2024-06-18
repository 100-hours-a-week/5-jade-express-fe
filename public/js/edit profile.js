import { getData, patchData, deleteData} from "./fileFetch.js";

document.getElementById("submit").addEventListener("click", helperChanger);
document.getElementsByClassName("dismiss")[0].addEventListener("click", showModal);
document.getElementsByClassName("cancel_btn")[0].addEventListener("click", cancelUser);
document.getElementsByClassName("proc_btn")[0].addEventListener("click", deleteUser);

window.addEventListener("load", (event)=>{
    getUser();
})

async function getUser(){
    const user = await getData("user");
    const email = document.getElementsByClassName("show_only")[0];
    email.innerHTML = user.email;
    const nickname = document.getElementById("nickname");
    nickname.value = user.nickname;
}
// 추후에 백엔드 서버에 닉네임을 넘기면 validate check를 해주는편이 좋을 것 같다
async function findNickname(nickname){
    const userData = await getData("users");
    const user = userData.find(elem=>elem.nickname===nickname);
    if(user===undefined){
        return false;
     } else{
        return true;
    }
}
async function helperChanger(){
    const helper = document.getElementsByClassName("helper_text")[0];
    const nickname = document.getElementById("nickname");
    if(nickname.value.length===0){
        helper.innerHTML = "* 닉네임을 입력해주세요.";
    } else if(nickname.value.length>10){
        helper.innerHTML = "* 닉네임은 최대 10자까지 작성 가능합니다.";
    } else if(await findNickname(nickname.value)){
        helper.innerHTML = "* 중복된 닉네임 입니다.";
    } else {
        // 수정하기 클릭시 수정 성공
        const data = {nickname:nickname.value};
        const success = await patchData("user", data);
        if(success!==null&&success){
            console.log("닉네임 수정이 완료되었습니다.");
            const toast = document.getElementsByClassName("profile_message")[0];
            toast.style.opacity = 1;
            setTimeout(()=>{
                toast.style.opacity = 0;
            }, 2000);
        } else{
            console.log("닉네임 수정에 실패했습니다.");
        }
    }
}
// 모달창 내부 함수
function showModal(){
    const modal = document.getElementById("user_modal");
    modal.style.display="block";
    document.body.style.overflow = "hidden";
}
function cancelUser(){
    const modal = document.getElementById("user_modal");
    modal.style.display="none";
    document.body.style.removeProperty("overflow");
}
// 회원 탈퇴
async function deleteUser(){
    const success = await deleteData("user");
    if(success!==null&&success){
        console.log("회원탈퇴가 완료되었습니다.");
        window.location.assign("/");
    } else{
        console.log("회원탈퇴에 실패했습니다.");
    }
}