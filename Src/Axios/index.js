import axios from "axios";
import { store } from "../Redux/store";




const Api = axios.create({
  baseURL:"https://wilfredo-limitary-rosio.ngrok-free.dev/api/v1",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
  
});

Api.interceptors.request.use(
    (config)=>{
        const token=store.getState().user.accesstoken
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
      return config
    },
    (err)=>Promise.reject(err)
)

Api.interceptors.response.use()

Api.interceptors.response.use(
    (response)=>response,
    async (err)=>{
        const originalrequest=err.config
        if(err.response?.status === 401 && !originalrequest._retry){
             originalrequest._retry=true
             try{
                const res=await Api.post('/users/refreshtoken')
                const newtoken=res.data.data.accessToken
                store.dispatch({
          type: "user/setAccessToken",
          payload: newtoken
        });
         originalrequest.headers.Authorization = `Bearer ${newtoken}`;

        return Api(originalrequest);

             }catch(err){
              store.dispatch({ type: "user/logout" });
             }


        }
        return Promise.reject(err);

    }
)


export default Api;