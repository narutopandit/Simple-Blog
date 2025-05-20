import { Link, useNavigate } from "react-router-dom"
import { SignButton } from "../components/ButtonSign"
import InputBox from "../components/InputBox"
import Quotes from "../components/Quotes"
import { useState } from "react"
import { SignInput } from "@manish98211/z-common"
import sendRequest from "../components/ReqSender"

const Signin = () => {
  const navigate = useNavigate();
  const [postInputs,setpostInputs] = useState<SignInput>({
    email: "",
    password: "",
  })

  const handleReq =()=>{
    sendRequest({type:"signin",postInputs:postInputs},navigate)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="flex justify-center items-center w-full min-h-screen">
            <div className="flex flex-col items-center justify-center w-3/4">
                <div className="text-4xl font-bold mb-3">Welcome Back!!</div>
                <InputBox title="Email" placeholder="xyz@example.com" type="email" onChange={(e)=>{
                  setpostInputs({...postInputs,email: e.target.value})
                }} />
                <InputBox title="Password"  type="password" placeholder="*******" onChange={(e)=>{
                  setpostInputs({...postInputs,password: e.target.value})
                }} />
                <SignButton onClick={handleReq} title="Sign In"/>
                <div className="text-lg text-gray-600/50 font-normal ml-4 mb-7 text-slate-500">Don`t have an account? <Link to={"/signup"} className="text-blue-500 underline">Sign Up</Link></div>
            </div>
        </div>
        <div className="hidden lg:block min-h-screen">
            <Quotes/>
        </div>
    </div>
  )
}

export default Signin