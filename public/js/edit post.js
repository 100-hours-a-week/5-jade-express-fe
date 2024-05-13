const getData = require('./fileFetch').getData;
const patchData = require('./fileFetch').patchData;

// 이벤트 필요
window.addEventListener("load", (event) => {
    getPost();
});

async function getPost(){
    const postId = 1;
    const post = await getData(`post/${postId}`, {});
    const title = document.getElementById("title");
    title.value = post.title;
    const detail = document.getElementById("detail");
    detail.value = post.content;
    // 기존 이미지 파일로 저장되어 보여줌
    // 이미지 파일은 1개만 올릴 수 있음
    // 이미지 업로드 보류
}

async function editPost(){
    const title = document.getElementById("title");
    const detail = document.getElementById("detail");
    const postId = 1;
    const data = {
        title: title, 
        content: detail, 
        image: "http://image.com/test"
    };
    await patchData(`post/${postId}`, data)
    window.location.assign("/post");
}