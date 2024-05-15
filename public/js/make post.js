const postData = require('./fileFetch').postData;

function helperChanger(){
    // 버튼 색상변경 구현
    const title = document.getElementById("title");
    const content = document.getElementById("detail");
    const button = document.getElementById("submit");
    const helper = document.getElementById("helper_text");
    if(title.value.length>0 && content.value.length>0){
        button.style.backgroundColor = "#7F6AEE";
        helper.innerHTML = "";
    }else{
        button.style.backgroundColor = "#ACA0EB";
        helper.innerHTML = "* 제목, 내용을 모두 작성해주세요";
    }

}
async function postGenerator(){
    // 나중에 세션에서 userId 받아오면됨
    const userId = 1;
    // 게시글 본문을 LONGTEXT타입으로 저장 어떻게 함
    const title = document.getElementById("title");
    const content = document.getElementById("detail");
    // post submit
    // session + plz
    const data = {title: title.value, content: content.value};
    await postData("post", data)
    .then(response=>{
        if(response.status==200){
            console.log("게시글이 작성되었습니다.");
            window.location.assign("/Main");
        } else {
            console.log("게시글 작성에 실패했습니다.");
        }
    });
}
