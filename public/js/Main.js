// post 파일 받아오는부분
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
// postGenerator를 작동시키는 이벤트가 필요
window.addEventListener("load", (event) => {
    postGenerator();
});
async function postGenerator(){
    // 구현할 기능
    // 1.post.json에서 post list 가져와서 화면에 보여주기
    // 1-1. 데이터 가져오기
    const postList = await loadFile("posts/post.json");
    const userList = await loadFile("users/user.json");
    const section = document.getElementsByClassName("content_list")[0];
    // 1-2. 데이터 split하기
    // 1-2-1. 제목 최대 26자까지, 이후론 다 자름
    // 1-2-2. 날짜 및 시간 split하기
    // 1-2-3. 좋아요 댓글 조회수 split하기
    // 1-2-4. 작성자 split하기
    // 1-3. split한 데이터 container에 담기
    // 1-4. 화면에 출력하기
    {
        postList.map((post)=>{
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
            // path 수정 필요
            path = `http://localhost:3000/views/post.html`;
            // 이 아래부분을 어떻게 해야할까? 링크부터 return이후 받아와서 화면에 표시하기까지
            // 해결
            let postContainer = Object.assign(
                document.createElement('a'), {href:`${path}`}
            );
            postContainer.innerHTML = `
                    <article class="content">
                        <div class="content_header">
                            <h2><strong>
                                ${head}
                            </strong></h2>
                            <div class="content_info">
                                <div>
                                    <h6>
                                        좋아요 ${like}
                                    </h6>
                                    <h6>
                                        댓글 ${comment}
                                    </h6>
                                    <h6>
                                        조회수 ${view}
                                    </h6>
                                </div>
                                <h5>
                                    ${post.time}
                                </h5>
                            </div>
                        </div>
                        <hr>
                        <div class="content_writer">
                            <img src="http://localhost:3000/static/profile.svg" alt="">
                            <h6>${writer}</h6>
                        </div>
                    </article>
                </a>
            `
            section.appendChild(postContainer);
        });
    }
}