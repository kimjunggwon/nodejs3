const paginator = require("../utils/paginator");
const { ObjectId } = require("mongodb");

async function list(collection, page, search){
    const perPage = 10;

    const query = { title: new RegExp(search, "i") };
    //title이 searchh와 부분일치하는지 확인

    const cursor = collection.find(query, { 
        limit: perPage, 
        skip: (page - 1) * perPage 
    }).sort({ createdDt: -1 });
    /*
    limit는 10개만 가져온다는 의미
    skip은 설정된 개수만큼 건너뜀
    생성일 역순으로 정렬
    */
    const totalCount = await collection.count(query);
    //검색에 걸리는 게시물의 총합
    const posts = await cursor.toArray();
    //커서로 받아온 데이터를 리스트로 변경

    const paginatorObj = paginator({ totalCount, page, perPage: perPage });
    //페이지 네이터 생성
    return [posts, paginatorObj];
}
//글목록 서비스 로작

async function writePost(collection, post){
    post.hits = 0;
    //조회수
    post.createdDt = new Date().toISOString();
    //생성일시 ISO 포맷으로 저장
    return await collection.insertOne(post);
    //MongoDB에 post를 저장 후 결과 반환
}
//글쓰기 서비스 로직

const projectOption = {
    projection: {
        //프로젝션(투영) 결괏값에서 일부만 가져올 때 사용
        password: 0,
        "comments.password": 0,
    },
};
//패스워드는 노출 할 필요가 없으므로 결괏값으로 가져오지 않음

async function getDetailPost(collection, id){
    return await collection.findOneAndUpdate({
         _id: ObjectId(id) 
        }, { 
            $inc: { hits: 1 } 
        }, projectOption);
    /*
        MongoDB Collection의 findOneAndUpdate() 함수를 사용
        게시글을 읽을 때마다 hits를 1씩 증가
    */
}
//상세 페이지 서비스 로직

async function getPostByIdAndPassword(collection, { id, password }){
    return await collection.findOne({
        _id: ObjectId(id),
        password: password
    }, projectOption);
}

async function getPostById(collection, id){
    return await collection.findOne({
        _id: ObjectId(id)
    }, projectOption);
}

async function updatePost(collection, id, post){
    const toUpdatePost = {
        $set: {
            ...post,
        },
    };
    return await collection.updateOne({
        _id: ObjectId(id)
    }, toUpdatePost);
}

module.exports = {
    list,
    writePost,
    getDetailPost,
    updatePost,
    getPostById,
    getPostByIdAndPassword,
    updatePost,
};
//require()로 파일을 임포트 시 외부로 노출하는 객체