import axios from 'axios';

class Request{
    static async get(url,options){
        return await axios.get(url,options);
    }
}


export default Request;
