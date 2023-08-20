async function myName(){
    return "test";
}

async function showName(){
    const name = await myName();
    console.log(name);
}

console.log(showName());