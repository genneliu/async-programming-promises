import { axios } from "./axios.min";
import setText, {appendText, showWaiting, hideWaiting} from "./results.mjs";

export function get() {
    axios.get("httpy://localhost:3000/orders/1")
    .then(({data}) => {
        setText(JSON.stringify(data));
    });
}

export function getCatch() {
    axios.get("httpy://localhost:3000/orders/1")
    .then(({data}) => {
        setText(JSON.stringify(data));
    })
    .catch(err => setText(err));
}

export function chain() {
    axios.get("httpy://localhost:3000/orders/1")
    .then(({data}) => {
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    .then(({data}) => {
        setText(`City: ${data.city}`)
    })
}



export function chainCatch() {
    axios.get("httpy://localhost:3000/orders/1")
    .then(({data}) => {
         axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
         throw new Error("Error!");
    })
    .catch(err => {
        setText(err);
        throw new Error("Second Error")
    })
    .then(({data}) => {
        setText(`City: ${data.my.city}`)
    })
    .catch(err => setText(err));
}

export function final() {
}