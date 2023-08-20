const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const Person     = require('./person-model');

mongoose.set("strictQuery", false);
//설정 시 경고창 노출이 되지 않음

const app = express();
app.use(bodyParser.json());
//HTTP에서 Body를 파싱하기 위한 설정
app.listen(3000, async() => {
    console.log("Server started");
    const mongodbUri = process.env.mongodb_uri;

    mongoose.connect(mongodbUri, { useNewUrlParser: true })
        .then(console.log("Connected to MongoDB"));
    //MongoDB에 커넥션 설정
});

app.get("/person", async (req, res) => {
    const person = await Person.find({});
    res.send(person);
});
//모든 person 데이터 출력

app.get("/person/:email", async (req, res) => {
    const person = await Person.findOne({ email: req.params.email });
    res.send(person);
});
//특정 이메일로 person 찾기

app.post("/person", async (req, res) => {
    const person = new Person(req.body);
    await person.save();
    res.send(person);
});
//person 데이터 추가

app.put("/person/:email", async (req, res) => {
    const person = await Person.findOneAndUpdate(
        { email: req.params.email },
        { $set: req.body },
        { new: true }
    );

    console.log(person);
    res.send(person);
});
//person 데이터 수정

app.delete("/person/:email", async (req, res) => {
    await Person.deleteMany({ email: req.params.email });
    res.send({ success: true });
});
//person 데이터 삭제