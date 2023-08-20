const http = require("http");
const url = require("url");

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html");

    if(path == "/user"){
        user(req, res);
    }else if(path == "/feed"){
        feed(req, res);
    }else{
        notFound(req, res);
    }
}).listen("3000", () => console.log("라우터를 만들어보자!"));

const user = (req, res) => {
    const userInfo = url.parse(req.url, true).query;
    //QueryString 데이터를 userInfo에 할당
    res.end(`[user] name: ${userInfo.name}, age: ${userInfo.age}`);
    //결괏값으로 name과 age를 설정
};

const feed = (req, res) => {
    res.end(`<ul>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li>
        </ul>`);
};

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 page not found");
};