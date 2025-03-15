import axios from "axios"
import { BACKEND_URL } from "../config"
import { NavigateFunction } from "react-router-dom";
interface reqType {
    type: string,
    postInputs: object
}
    async function sendRequest({type,postInputs}:reqType,navigate:NavigateFunction) {
        try{
          const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`,postInputs,{
        headers: {
          'Content-Type': 'application/json'
        }
       })
    //    console.log(response.data)
       localStorage.setItem('token',response.data.jwt);
       navigate('/blog');
        }catch(e){
          alert('Failed to Sign Up')
        }
      }
    
export default sendRequest;