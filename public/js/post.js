import { getData, postData, patchData, deleteData } from './fileFetch.js';

const postCancel = document.getElementById("post_cancel");
const commentCancel = document.getElementById("comment_cancel");
postCancel.addEventListener("click", cancelPost);
commentCancel.addEventListener("click", cancelComment);
const textarea = document.getElementById("comment_textarea");
textarea.addEventListener("change", commentColor);
// 이벤트
window.addEventListener("load", async (event) => {
    const url = window.location.href;
    const postId = url.match(/\/(\d+)$/)[1];
    await getPost(postId)
    const editButton = document.querySelector("#post_edit");
    editButton.addEventListener("click", ()=>editPost(postId));
    const deleteButton = document.querySelector("#post_delete");
    deleteButton.addEventListener("click", ()=>showPost(postId));
    const commentPostbtn = document.getElementById("comment_write_button");
    commentPostbtn.addEventListener("click", ()=>postComment(postId));
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
function showComment(commentId){
    const modal = document.getElementById("comment_modal");
    modal.style.display="block";
    document.body.style.overflow = 'hidden';
    const deleteButton = document.getElementById("comment_proc");
    deleteButton.addEventListener("click", ()=>deleteComment(commentId));
}
function showPost(postId){
    const modal = document.getElementById("post_modal");
    modal.style.display="block";
    document.body.style.overflow = 'hidden';
    const deleteButton = document.getElementById("post_proc");
    deleteButton.addEventListener("click", ()=>deletePost(postId));
}
async function editComment(commentId){
    const comment = await getData(`comment/${commentId}`, {});
    const button = document.getElementById("comment_write_button");
    button.innerHTML = "댓글 수정";
    
    // 이부분 작업중
    // 그냥 버튼 두개 만들고 하나 숨겼다가 표시하는게 나을듯
    const listenerList = getEventListeners(button);
    button.removeEventListener('click', listenerList.click[0].listener);
    
    
    const textarea = document.getElementById("comment_textarea");
    textarea.value = comment.text;
    button.addEventListener('click', async (event)=>{
        const data = {text: textarea.value};
        const success = await patchData(`comment/${commentId}`, data);
        if(success!=null && success){
            console.log("댓글이 수정되었습니다.");
            textarea.value = "";
            button.innerHTML = "댓글 등록";
            location.reload(true);
        }
        else {
            console.log("댓글 수정에 실패했습니다.");
        }
    })
}

async function deleteComment(commentId){
    const success = await deleteData(`comment/${commentId}`)
    if(success!==null && success){
        console.log("댓글이 삭제되었습니다.");
        location.reload(true);
    } else {
        console.log("댓글 삭제에 실패했습니다.");
    }
}
function editPost(postId){
    window.location.assign(`/edit_post/${postId}`);
}
async function deletePost(postId){
    // 게시글 삭제
    const success = await deleteData(`post/${postId}`)
    if(success!==null && success){
        console.log("게시글이 삭제되었습니다.");
        window.location.assign("/Main");
    } else {
        console.log("게시글 삭제에 실패했습니다.");
    }
}
async function getPost(postId){
    const post = await getData(`post/${postId}`);
    const comment = await getData(`comments/${postId}`);
    const userList = await getData("user");
    const postArticle = document.getElementsByClassName("content")[0];
    const commentArticle = document.getElementsByClassName("comment_list")[0];
    // 글 본문 부분
    {
        let head, like, comment, view, writer;
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
                            <img src="/public/images/profile.svg" alt="">
                            <h6>${writer}</h6>
                            <h5>
                                ${post.time}
                            </h5>
                        </div>
                        <div class="content_edit">
                            <button class="edit" id="post_edit">
                                수정
                            </button>
                            <button class="edit" id="post_delete">
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="content_body">
                    <img class="content_image"
                    src="/public/images/pexels-photo-255379.jpeg"
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
                            <img src="/public/images/profile.svg" alt="">
                            <h6>${commenter.nickname}</h6>
                            <h5>
                                ${com.time}
                            </h5>
                        </div>
                        <div class="content_edit">
                            <button class="edit" id="com_edit_${com.commentId}">
                                수정
                            </button>
                            <button class="edit" id="com_delete_${com.commentId}">
                                삭제
                            </button>
                        </div>
                    </div>
                    <p>
                        ${com.text}
                    </p>
            `
            commentArticle.appendChild(commentContainer)
            const editButton = document.querySelector(`#com_edit_${com.commentId}`);
            const deleteButton = document.querySelector(`#com_delete_${com.commentId}`);
            editButton.addEventListener("click", ()=>editComment(com.commentId));
            deleteButton.addEventListener("click", ()=>showComment(com.commentId));
        });
    }
}

// 댓글 작성부분
async function postComment(postId){
    const text = document.getElementById("comment_textarea");
    const data = {text: text.value};
    const success = await postData(`comment/${postId}`, data)
    if(success!==null && success){
        console.log("댓글이 등록되었습니다.");
        text.value = "";
        location.reload(true);
    } else {
        console.log("댓글 등록에 실패했습니다.");
    }
}

// 이거 모달창때문에 commentId, postId 넘겨주는게 좀 힘들거같은데 이걸 어떻게하지
// 아니면 route에서 postId 어떻게 들고오는지, 되면 더 편할듯
// commentId만 어떻게 함수통해서 잘 넘겨주면 되는데 그러면 모달창은 일단 분리해야됨