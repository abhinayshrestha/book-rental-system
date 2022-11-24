import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const http = axios.create({
    baseURL : BASE_URL,
})

const token = localStorage.getItem('token');

const GET = (url: string,getheaders?: boolean) => {
    if(getheaders){
        return http.get(BASE_URL + url,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
    }
    return http.get(BASE_URL + url);    
}

const POST = (url: string,data: any,getheaders?: boolean) => {
    if(getheaders){
        return http.post(BASE_URL + url, data,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
    }
    return http.post(BASE_URL + url, data);
}

const DELETE = (url: string, getheaders?: boolean) => {
    if (getheaders) {
      return http.delete(BASE_URL + url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return http.delete(BASE_URL + url);
  };

export const httpClient = {
    GET,
    POST,
    DELETE
}