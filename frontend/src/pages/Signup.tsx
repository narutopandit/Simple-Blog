import { Link, useNavigate } from "react-router-dom"
import { SignButton } from "../components/ButtonSign"
import InputBox from "../components/InputBox"
import Quotes from "../components/Quotes"
import { useState } from "react"
import { SignupInput } from "@manish98211/z-common"
import sendRequest from "../components/ReqSender"


const Signup = () => {
  const navigate = useNavigate();
  const [postInputs, setpostInputs] = useState<SignupInput>({
    name:"",
    email:"",
    password:""
  })
 const handleReq = ()=>{
  sendRequest({type:"signup",postInputs:postInputs},navigate);
 }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="flex justify-center items-center w-full min-h-screen">
            <div className="flex flex-col items-center w-3/4">
                <div className="text-4xl font-bold mb-3">Create an account</div>
                <div className="text-lg text-gray-600/50 font-normal ml-4 mb-7 text-slate-500">Already have an account? <Link to={"/signin"} className="text-blue-500 underline">Login</Link></div>
                <InputBox title="Name" placeholder="Enter your name" onChange={(e)=>{
                  setpostInputs({...postInputs,name:e.target.value})
                }} />
                <InputBox title="Email" placeholder="xyz@example.com" type="email" onChange={(e)=>{
                  setpostInputs({...postInputs,email:e.target.value})
                }}/>
                <InputBox title="Password" type="password" placeholder="*******" onChange={(e)=>{
                  setpostInputs({...postInputs,password:e.target.value})
                }} />
                <SignButton onClick={handleReq} title="Sign Up"/>
            </div>
        </div>
        <div className="hidden lg:block min-h-screen">
            <Quotes/>
        </div>
    </div>
  )
}

export default Signup