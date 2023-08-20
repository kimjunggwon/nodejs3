function myWork(work){
    return new Promise((resolve, reject) => {
        resolve(work.toUpperCase());
    });
}

function playGame(work){
    return new Promise((resolve, reject) => {
        if(work === 'DONE'){
            resolve('GO PLAY GAME');
        }else{
            reject(new Error("DON'T"));
        }
    });
}

myWork('done')
    .then(function(result){
        playGame(result).then(function(val){
            console.log(val);
        });
    });
//프로미스 중첩 사용

myWork('done')
    .then(playGame)
        .then(console.log)
//결과를 then으로 넘김