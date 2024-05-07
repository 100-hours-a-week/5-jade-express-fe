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

// 이벤트 필요
window.addEventListener("load", (event) => {
    getPost();
});

async function getPost(){
    const postId = 1;
    const postList = await loadFile(`posts/post.json`);
    const post = postList.find(elem=>elem.id===postId);
    const title = document.getElementById("title");
    title.value = post.title;
    const detail = document.getElementById("detail");
    detail.value = post.content;
    // 기존 이미지 파일로 저장되어 보여줌
    // 이미지 파일은 1개만 올릴 수 있음
    // 이미지 업로드 보류
}

async function editPost(){
    const postId = 1;
    let postList = await loadFile(`posts/post.json`);
    const postIndex = postList.findIndex(elem=>elem.id===postId);
    const title = document.getElementById("title");
    const detail = document.getElementById("detail");
    //const image = document.getElementById("file");
    postList[postIndex].title = title.value;
    postList[postIndex].content = detail.value;
    console.log(postList);
    //postList[postIndex].image = file.value;

    // post to post.json 구현 필요
    window.location.assign("http://localhost:3000/views/post.html");
}