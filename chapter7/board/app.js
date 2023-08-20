const express    = require("express");
const handlebars = require("express-handlebars");
const { ObjectId } = require("mongodb");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//req.body와 POST 요청을 해석하기 위한 설정

const mongodbConnection = require("./configs/mongodb-connection");
//MongoDB 연결 함수
const postService = require('./services/post-service');
//서비스 파일 로딩

app.engine(
    "handlebars",
    handlebars.create({
    //핸들바 생성 및 엔진 반환
        helpers: require("./configs/handlebars-helpers"),
    }).engine, 
);
//템플릿 엔진으로 핸들바 등록
app.set("view engine", "handlebars");
//웹 페이지 로드 시 사용할 템플릿 엔진 설정
app.set("views", __dirname + "/views");
//뷰 디렉터리를 views로 설정

app.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    try {
        const [ posts, paginator ] = await postService.list(collection, page, search);
        //postService.list에서 글 목록과 페이지네이터를 호출

        res.render("home", { title: "테스트 게시판", search, paginator, posts });
        //리스트 페이지 렌더링
    }catch(error){
        console.error(error);
        res.render("home", { title: "테스트 게시판" });
        //에러 발생 시 빈 값으로 렌더링
    }
});
//라우터 설정

app.get("/write", (req, res) => {
    res.render("write", { title: "테스트 게시판" });
});
//글쓰기 페이지 라우터 설정

app.post("/write", async (req, res) => {
    const post = req.body;

    const result = await postService.writePost(collection, post);
    //글쓰기 후 결과 반환
    res.redirect(`/detail/${result.insertedId}`);
    //생성된 Document의 _id를 사용해 상세페이지로 이동
});
//글쓰기 API

app.get("/detail/:id", async (req, res) => {
    const result = await postService.getDetailPost(collection, req.params.id);
    res.render("detail", {
        title: "테스트 게시판",
        post: result.value,
    });
});
//상세 페이지 라우터 설정

app.post("/check-password", async (req, res) => {
    const { id, password } = req.body;
    //id, password값을 가져옴

    const post = await postService.getPostByIdAndPassword(collection, { id, password });
    //postService의 getPostByIdAndPassword() 함수를 사용해 게시글 데이터 확인

    if(!post){
        return res.status(404).json({ isExist: false });
    }else{
        return res.json({ isExist: true });
    }
});
//패스워드 체크

app.get("/write", (req, res) => {
    res.render("write", { title: "테스트 게시판", mode: "create" });
});
//글쓰기 페이지 이동, mode는 create

app.get("/modify/:id", async (req, res) => {
    const { id } = req.params.id;

    const post = await postService.getPostById(collection, req.params.id);
    //getPostById() 함수로 게시글 데이터를 받아옴

    console.log(post);

    res.render("write", { title: "테스트 게시판", mode: "modify", post });
});
//수정 페이지로 이동, mode는 modify

app.post("/modify/", async (req, res) => {
    const { id, title, writer, password, content } = req.body;

    const post = {
        title,
        writer,
        password,
        content,
        createdDt: new Date().toISOString()
    };
    //업데이트 결과

    const result = postService.updatePost(collection, id, post);
    res.redirect(`/detail/${id}`);
});
//게시글 수정 API

app.delete("/delete", async (req, res) => {
    const { id, password } = req.body;
    try{
        const result = await collection.deleteOne({ _id: ObjectId(id), password: password });
        //collection에 deleteOne을 사용해 게시글 하나 삭제

        if(result.deletedCount !== 1){
            console.log("삭제 실패");
            return res.json({ isSuccess: false });
        }
        //삭제 결과가 잘못된 경우의 처리
        return res.json({ isSuccess: true });
    }catch(error){
        console.error(error);
        return res.json({ isSuccess: false });
        //에러 처리
    }
});

app.post("/write-comment", async (req, res) => {
    const { id, name, password, comment } = req.body;
    const post = await postService.getPostById(collection, id);
    //id로 게시글 정보 가져오기

    if(post.comments){
        post.comments.push({
            idx: post.comments.length + 1,
            name,
            password,
            comment,
            createdDt: new Date().toISOString(),
        });
        //게시글에 기존 댓글 리스트가 있으면 댓글 추가
    }else{
        post.comments = [
            {
                idx: 1,
                name,
                password,
                comment,
                createdDt: new Date().toISOString(),
            }
        ];
        //게시글에 댓글 정보가 없으면 리스트에 댓글 정보 추가
    }
    postService.updatePost(collection, id, post);
    return res.redirect(`/detail/${id}`);
    //업데이트 후에 상세 페이지로 리다이렉트
});
//댓글 추가 API

app.delete("/delete-comment", async (req, res) => {
    const { id, idx, password } = req.body;

    const post = await collection.findOne({
        _id: ObjectId(id),
        comments: {
            $elemMatch: {
                idx: parseInt(idx),
                password
            }
        },
    }, postService.projectOption);
    //게시글의 comments 안에 있는 특정 댓글 데이터 찾기

    if(!post){
        return res.json({ isSuccess: false });
    }
    //데이터가 없으면 json 값을 반환하고 종료

    post.comments = post.comments.filter((comment) => comment.idx != idx);
    postService.updatePost(collection, id, post);
    //댓글 번호가 idx 이외인 것만 comments에 다시 할당 후에 저장
    return res.json({ isSuccess: true });
});
//댓글 삭제 API

let collection;
app.listen(3000, async () => {
    console.log("Server started");

    const mongoClient = await mongodbConnection();
    //MongoDB 연결용 함수를 임포트

    collection = mongoClient.db().collection("post");
    //mongoClient.db()로 DB 선택하여 collection()으로 컬렉션 선택 후 collection에 할당
    console.log("MongoDB connected");
});