const url = require("url");
const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("익스프레스로 라우터 리펙터링하기");
});

app.get("/", (_, res) => res.end("HOME"));
app.get("/user", user);
app.get("/feed", feed);
// GET 메서드의 라우팅 설정

function user(req, res){
    const user = url.parse(req.url, true).query;

    res.json(`[user] name: ${user.name}, age: ${user.age}`);
    //결괏값으로 name과 age를 제공
}

function feed(_, res){
    res.json(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
    </ul>`);
}
// /feed로 요청이 오면 실행되는 함수