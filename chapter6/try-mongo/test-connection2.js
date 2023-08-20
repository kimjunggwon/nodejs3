const { MongoClient } = require('mongodb'); 
const uri = process.env.mongodb_uri; 
const client = new MongoClient(uri);

async function run(){ //비동기 처리 함수
    await client.connect();
    const adminDB = client.db('test').admin(); //admin DB 인스턴스
    const listDatabases = await adminDB.listDatabases(); //데이터베이스 정보 가져오기
    console.log(listDatabases);
    return "OK";
}

run() // 실행 함수
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());