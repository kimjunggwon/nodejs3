function goodPromise(val){
    return new Promise((resolve, reject) => {
        resolve(val);
    });
    //Promise를 생성 후 반환
}

goodPromise("test")
//Promise에서 resolve 이후에는 then 호출 가능
    .then((val) => {
        return val + " a,";
    })
    .then((val) => {
        return val + "b,";
    })
    .then((val) => {
        return val + "c";
    })
    .then((val) => {
        console.log(val);
    })
    .catch((err) => {
    //Promise에서 reject가 호출되었을 경우 실행
        console.log(err);
    });