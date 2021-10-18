import { axios } from './axios.min';
import setText , {appendText} from './results.mjs';

export async function get(){
    const {data} = await axios.get("http://localhost:3000/orders/1");
    setText(JSON.stringify(data));
}

export async function getCatch(){
    try {
        const {data} = await axios.get("http://localhost:3000/orders/123");
        setText(JSON.stringify(data));
    } catch (error) {
        setText(error);
    }
}


export async function chain(){
    const {data} = await axios.get("http://localhost:3000/orders/1");
    const {data: address} = await axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`); 
    setText(`City: ${JSON.stringify(address.city)}`)
}

//when we dont want functions to depend on other functions
export async function concurrent(){
    const orderStatus = axios.get("http://localhost:3000/orderStatuses");
    const orders = axios.get("http://localhost:3000/orders");

    setText(""); //clear text to see data when it comes back

    //axios.get is still an eager promise

    //await 2 functinos
    appendText(JSON.stringify(statuses));
    appendText(JSON.stringify(order[0]));

}

//power of async is creating parallel calls 
//async await is syntactic sugar on top of promises
export async function parallel(){
    setText("");

    await Promise.all([
        (async () => {
            const {data} = await axios.get("http://localhost:3000/orderStatuses");
            appendText(JSON.stringify(data))
        })(),
        (async () => {
            const {data} = await axios.get("http://localhost:3000/orders");
            appendText(JSON.stringify(data))
        })(),
    ]);

}

//two promises in array promise.all; will wait until all complete before returning
