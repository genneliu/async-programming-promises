import setText, { appendText } from "./results.mjs";

export function timeout(){
    const wait = new Promise((resolve) => {
        setTimeout(() => {
            resolve("Timeout!");
        }, 1500);
    });

    wait.then(text => setText(text));

    //promise takes executor function
}

export function interval(){
    let counter = 0;
    const wait = new Promise((resolve) => {
        setInterval(() => {
            console.log("INTERVAL");
            resolve(`Timeout! ${++counter}`);
        }, 1500);
    });

    wait.then(text => setText(text))
    .finally(() => appendText(`--Done ${counter}`));
}

//states: settled/resolved 
// counter and done states are not updated, promise is already resolved, so method does nothing

export function clearIntervalChain(){
    let counter = 0;
    let interval;
    const wait = new Promise((resolve) => {
        interval = setInterval(() => {
            console.log("INTERVAL");
            resolve(`Timeout! ${++counter}`);
        }, 1500);
    });

    wait.then(text => setText(text))
    .finally(() => clearInterval(interval));
}


export function xhr(){
}

export function allPromises(){
}

export function allSettled(){
}

export function race(){
}