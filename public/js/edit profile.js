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

window.addEventListener("load", (event)=>{
    getUser();
})

async function getUser(){
    const userId = 1; // 임시로 유저아이디 1로 지정
    const userList = await loadFile("users/user.json");
    const index = userList.findIndex(elem=>elem.userId===userId);
    const user = userList[index];
    const email = document.getElementsByClassName("show_only")[0];
    email.innerHTML = user.email;
    const nickname = document.getElementById("nickname");
    nickname.value = user.nickname;
}
function findNickname(nickname, userData){
    const user = userData.find(elem=>elem.nickname===nickname);
    if(!user){
        return false;
     } else{
        return true;
    }
}
async function helperChanger(){
    const userList = await loadFile("users/user.json");
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
        const userList = await loadFile("users/user.json");
        const index = userList.findIndex(elem=>elem.userId===userId);
        const user = userList[index];
        user.nickname = nickname.value;
        userList[index] = user;
        console.log(userList);
        // post to user.json
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
    const userList = await loadFile("users/user.json");
    const commentList = await loadFile("comments/comment.json");
    const postList = await loadFile("posts/post.json");
    // 댓글 삭제
    let index = 1;
    while(index>-1){
        index = commentList.findIndex(elem=>elem.writer === userId);
        if(index>-1) commentList.splice(index, 1);
    }
    // 게시글 삭제
    index = 1;
    while(index>-1){
        index = postList.findIndex(elem=>elem.userId===userId);
        if(index>-1) postList.splice(index, 1);
    }
    // 유저 삭제
    index = userList.findIndex(elem=>elem.userId===userId);
    if(index>-1) userList.splice(index, 1);
    console.log(userList);
    // post userList to user.json
    window.location.assign("http://localhost:3000/views/Log in.html");
}