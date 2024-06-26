import { getData, patchData } from './fileFetch.js';

// 이벤트 필요
window.addEventListener("load", (event) => {
    const url = window.location.href;
    const postId = url.match(/edit_post\/(\d+)/)[1];
    getPost(postId);
    const button = document.getElementsByClassName("submit_button")[0];
    button.addEventListener("click", ()=>{editPost(postId)});
});

async function getPost(postId){
    const post = await getData(`post/${postId}`);
    const title = document.getElementById("title");
    title.value = post.title;
    const detail = document.getElementById("detail");
    detail.value = post.content;
    // 기존 이미지 파일로 저장되어 보여줌
    // 이미지 파일은 1개만 올릴 수 있음
    // 이미지 업로드 보류
}

async function editPost(postId){
    const title = document.getElementById("title").value;
    const detail = document.getElementById("detail").value;
    console.log(title, detail)
    const data = {
        title: title, 
        content: detail, 
        image: "http://image.com/test"
    };
    const success = await patchData(`post/${postId}`, data);
    // 아래 success가 실패했을때만 출력됨, 근데 결과는 정상적으로 나옴
    if(success!==null&&success){
        console.log("게시글이 수정되었습니다.");
    } else {
        console.log("게시글 수정에 실패했습니다.");
    }
    //window.location.assign(`/post/${postId}`);
}