const { MongoClient } = require('mongodb'); //MongoDB 패키지 임포트

const uri = process.env.mongodb_uri; //MongoDB 연결 정보

const client = new MongoClient(uri); //MongoDB Client 객체 생성
client.connect(err => { //MongoDB에 접속
    const collection = client.db("test").collection("devices");
    //DB 및 Collection에 접속

    client.close();
    //연결 끊기
});