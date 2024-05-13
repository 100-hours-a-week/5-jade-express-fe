const getData = require('./fileFetch').getData;
const deleteData = require('./fileFetch').deleteData;
const patchData = require('./fileFetch').patchData;

window.addEventListener("load", (event)=>{
    getUser();
})

async function getUser(){
    const userId = 1; // 임시로 유저아이디 1로 지정
    let user;
    await getData(`user/${userId}`, {})
    .then(response=>{
        if(response.status==200){
            user = response.data;
        } else{
            console.log("해당하는 사용자가 없습니다");
        }});
    const email = document.getElementsByClassName("show_only")[0];
    email.innerHTML = user.email;
    const nickname = document.getElementById("nickname");
    nickname.value = user.nickname;
}
async function findNickname(nickname){
    const userList = await getData("user", {});
    const user = userData.find(elem=>elem.nickname===nickname);
    if(!user){
        return false;
     } else{
        return true;
    }
}
async function helperChanger(){
    const helper = document.getElementsByClassName("helper_text")[0];
    const nickname = document.getElementById("nickname");
    if(nickname.value.length===0){
        helper.innerHTML = "* 닉네임을 입력해주세요."
    } else if(nickname.value.length>10){
        helper.innerHTML = "* 닉네임은 최대 10자까지 작성 가능합니다."
    } else if(findNickname(nickname.value, userList)){
        helper.innerHTML = "* 중복된 닉네임 입니다."
    } else {
        // 수정하기 클릭시 수정 성공
        const userId = 1; // 임시로 유저아이디 1로 지정
        const data = {nickname:nickname.value};
        await patchData(`user/${userId}`, data)
        .then(response=>{
            if(response.status==200){
                console.log(response.body);
                console.log("닉네임 수정이 완료되었습니다.");
            } else {
                console.log("닉네임 수정에 실패했습니다.");
            }
        });
        const toast = document.getElementsByClassName("profile_message")[0];
        toast.style.opacity = 1;
        setTimeout(()=>{
            toast.style.opacity=0;
        }, 2000);
    }
}
// 모달창 내부 함수
function showModal(){
    const modal = document.getElementById("user_modal");
    modal.style.display="block";
    document.body.style.overflow = 'hidden';
}
function cancelUser(){
    const modal = document.getElementById("user_modal");
    modal.style.display="none";
    document.body.style.removeProperty("overflow");
}
// 회원 탈퇴
async function deleteUser(){
    const userId = 1;
    await deleteData(`user/${userId}`)
    .then(response=>{
        if(response.status==200){
            console.log("회원탈퇴가 완료되었습니다.");
        } else {
            console.log("회원탈퇴에 실패했습니다.");
        }
    });
    window.location.assign("/");
}