const http = require("http"); //http 객체 생성
let count = 0;

const server = http.createServer((req, res) => { //server 객체 생성
    log(count); //카운트 1증가
    res.statusCode = 200; //결과값 200
    res.setHeader("Content-Type", "text/plain"); // 헤더 설정
    res.write("hello \n"); //응답값 설정
    setTimeout(() => {
        res.end("Node.js");
    }, 2000); //2초 후 Node.js 출력
});

function log(count){
    console.log((count += 1));
}

server.listen(8000);