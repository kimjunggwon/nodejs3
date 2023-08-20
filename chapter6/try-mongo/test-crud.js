const MongoClient = require('mongodb').MongoClient;
const url = process.env.mongodb_uri;

const client = new MongoClient(url, { useNewUrlParser: true });
//MongoCLient 생성

async function main(){
    try{
        await client.connect();
        //커넥션을 생성하고 연결 시도
        console.log('MongoDB 접속 성공');

        const collection = client.db('test').collection('person');
        //test 데이터베이스의 person 컬렉션 가져오기

        await collection.insertOne({ name: 'test', age: 26 });
        console.log('문서 추가 완료');
        //문서 하나 추가

        const documents = await collection.find({ name: 'test' }).toArray();
        console.log('찾은 문서:', documents);
        //문서 찾기

        await collection.updateOne({ name: 'test' },{ $set: { age: 27 } });
        console.log('문서 업데이트');
        //문서 갱신

        const updatedDocuments = await collection.find({ name: 'test' }).toArray();
        console.log('갱신된 문서:', updatedDocuments);
        //갱신된 문서 확인

        // await collection.deleteOne({ name: 'test' });
        // console.log('문서 삭제');
        //문서 삭제

        await client.close();
        //연결 끊기
    }catch(err){
        console.error(err);
    }
}

main();