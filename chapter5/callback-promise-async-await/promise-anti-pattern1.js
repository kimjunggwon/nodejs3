function myWork(work){
    return new Promise((resolve, reject) => {
        if(work === 'done'){
            resolve("가능");
        }else{
            reject(new Error("불가능"));
        }
    });
}

myWork('done').then(function(value){
    console.log(value);
}, function(err){
    console.error(err);
});
//콜백 함수 구조와 다를게 없음(좋지 않은 방법)

myWork('doing')
    .then(function(value){
        console.log(value);
    })
    .catch(function(err){
        console.error(err);
    });
//catch()구문으로 에러를 처리(좋은 방법)