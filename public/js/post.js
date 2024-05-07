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

// 이벤트
window.addEventListener("load", (event) => {
    getPost();
    // 댓글창 값 추적하기
    // mutationObserver 사용해서 값 변경 추적
    // mutation으로 하니까 작동안함
});
// 아래 함수를 onchange()로 불러오는 방법으로 변경
function commentColor(){
    const target = document.getElementById("comment_textarea");
    const button = document.getElementsByClassName("write_button")[0];
    if(target.value.length>0){
        button.style.backgroundColor="#7F6AEE";
    } else{
        button.style.backgroundColor="#ACA0EB";
    }
}

function cancelComment(){
    const modal = document.getElementById("comment_modal");
    modal.style.display="none";
    document.body.style.removeProperty("overflow");
    
}
function cancelPost(){
    const modal = document.getElementById("post_modal");
    modal.style.display="none";
    document.body.style.removeProperty("overflow");
}
function showComment(){
    const modal = document.getElementById("comment_modal");
    modal.style.display="block";
    document.body.style.overflow = 'hidden';
}
function showPost(){
    const modal = document.getElementById("post_modal");
    modal.style.display="block";
    document.body.style.overflow = 'hidden';
}
async function editComment(){
    const commentId = 1;
    const commentList = await loadFile("comments/comment.json");
    const comment = commentList.findIndex(elem=>elem.commentId===commentId);
    const button = document.getElementById("comment_write_button");
    button.innerHTML = "댓글 수정";
    const textarea = document.getElementById("comment_textarea");
    button.setAttribute("onclick", "");
    textarea.value = commentList[comment].text;
    button.addEventListener('click', (event)=>{
        console.log(textarea.value);
        commentList[comment].text = textarea.value;
        textarea.value = "";
        button.innerHTML = "댓글 등록";
        button.setAttribute("onclick", "postComment()");
        console.log(commentList);
    })
    // post commentList to comment.json
}
async function deleteComment(){
    const commentId = 1;
    const commentList = await loadFile("comments/comment.json");
    const index = commentList.findIndex(elem=>elem.commentId===commentId);
    if(index>-1) commentList.splice(index, 1);
    console.log(commentList);
    // post commentList to comment.json
}
function editPost(){
    // 경로 수정 필요 - 라우팅
    window.location.assign("http://localhost:3000/views/edit post.html");
}
async function deletePost(){
    // 게시글 삭제
    const postList = await loadFile("posts/post.json");
    const postId = 1;
    const index = postList.findIndex(elem=>elem.id===postId);
    if(index>-1) postList.splice(index, 1);
    console.log(postList);
    // post to post.json
    window.location.assign("http://localhost:3000/views/Main.html");
}
async function getPost(){
    const postId = 1;
    const postList = await loadFile(`posts/post.json`);
    const post = postList.find(elem=>elem.id===postId);
    const commentList = await loadFile(`comments/comment.json`);
    const comment = commentList.filter(elem=>elem.postId===postId);
    const userList = await loadFile(`users/user.json`);
    const postArticle = document.getElementsByClassName("content")[0];
    const commentArticle = document.getElementsByClassName("comment_list")[0];
    // 글 본문 부분
    {
        let head, like, comment, view, writer, path;
        if(post.title.length>26){
            head = post.title.substr(0, 26);
        } else head = post.title;
        // 1000 이상일때 1k, 1만 이상시 10k, 10만 이상시 100k로 표기
        if(post.likes>1000){
            like = parseInt(post.likes/1000);
            like = like.toString()+'k';
        } else like=post.likes;
        if(post.views>1000){
            view = parseInt(post.views/1000);
            view = view.toString()+'k';
        } else view = post.views;
        if(post.comments>1000){
            comment = parseInt(post.comments/1000);
            comment = comment.toString()+'k';
        } else comment = post.comments;
        writer = userList.find((user)=>user.userId === post.writer)
        writer = writer.nickname;
        // 이 아래부분을 어떻게 해야할까? 링크부터 return이후 받아와서 화면에 표시하기까지
        // 해결
        let postContainer = Object.assign(
            document.createElement('div'), {}
        );
        postContainer.innerHTML = `
                <div class="content_header">
                    <h2><strong>
                        ${head}
                    </strong></h2>
                    <div class="content_info">
                        <div class="content_writer">
                            <img src="http://localhost:3000/static/profile.svg" alt="">
                            <h6>${writer}</h6>
                            <h5>
                                ${post.time}
                            </h5>
                        </div>
                        <div class="content_edit">
                            <button class="edit" id="edit" onclick="editPost()">
                                수정
                            </button>
                            <button class="edit" id="delete" onclick="showPost()">
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="content_body">
                    <img class="content_image"
                    src="http://localhost:3000/static/pexels-photo-255379.jpeg"
                    >
                    <p>
                        ${post.content}   
                    </p>
                </div>

                <div class="content_footer">
                    <button class="info" id="view">
                        <strong>${view}</strong>
                        <br>
                        <strong class="small">조회수</strong>
                    </button>
                    <button class="info" id="comment_number">
                        <strong>${comment}</strong>
                        <br>
                        <strong class="small">댓글</strong>
                    </button>
                </div>
                <hr>
        `
        postArticle.appendChild(postContainer);
    }
    // 글 댓글 부분
    {
        comment.map((com)=>{
            const commenter = userList.find(elem=>elem.userId===com.writer);
            let commentContainer = Object.assign(
                document.createElement('div'), {class: "comment"}
            );
            commentContainer.innerHTML = `
                    <div class="content_info">
                        <div class="content_writer">
                            <img src="http://localhost:3000/static/profile.svg" alt="">
                            <h6>${commenter.nickname}</h6>
                            <h5>
                                ${com.time}
                            </h5>
                        </div>
                        <div class="content_edit">
                            <button class="edit" id="edit" onclick="editComment()">
                                수정
                            </button>
                            <button class="edit" id="delete" onclick="showComment()">
                                삭제
                            </button>
                        </div>
                    </div>
                    <p>
                        ${com.text}
                    </p>
            `
            commentArticle.appendChild(commentContainer);
        });
    }
}

// 댓글 작성부분
async function postComment(){
    const postId = 1;
    const commentList = await loadFile("comments/comment.json");
    console.log(commentList);
    let commentId = commentList.findLastIndex(elem=>elem.commentId>1);
    // post submit
    const date = new Date();
    const time = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    // 현재 로그인중인 user, 조회중인 post 받아와야함 필요 (지금은 이걸로 일단 대체)
    const user = {
        "userId": 1,
        "email": "test@startupcode.kr",
        "password": "Test1234!",
        "nickname": "startup",
        "profile_image": "https://image.kr/img.jpg"
    }
    const text = document.getElementById("comment_textarea");
    const newComment = {
        "postId" : postId,
        "commentId": commentId+2,
        "writer" : user.userId,
        "time" : time,
        "text" : text.value
    }
    commentList.push(newComment);
    console.log(commentList);
    // post to comment.json
    text.value = "";
}