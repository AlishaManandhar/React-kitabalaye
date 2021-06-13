import axios from "axios";
import { toast } from "react-toastify";


  axios.interceptors.response.use(
    res => {
      const msg= res.data
      if ("message" in msg)
      {
        const message = msg.message
        toast.success(message)
      }
      
      return res.data
    },
    err=>{
        if (err.response.status >=400 && err.response.status <=500)
        {
          if(err.response.status === 401)
          {
            window.location = "/login"
          }
          return Promise.reject(err)
        }
    } 
   
  );
function setToken(token) {
    axios.defaults.headers.common["Authorization"] = token;
}


const val = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setToken
};

export default  val;
