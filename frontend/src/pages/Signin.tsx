import { SignButton } from "../components/ButtonSign"
import InputBox from "../components/InputBox"
import Quotes from "../components/Quotes"

const Signin = () => {
  return (
    <div className="grid grid-cols-2">
        <div className="flex justify-center items-center w-full">
            <div className="flex flex-col items-center w-3/4">
                <div className="text-4xl font-bold mb-3">Welcome Back!!</div>
                <InputBox title="Email" placeholder="xyz@example.com"/>
                <InputBox title="Password" placeholder=""/>
                <SignButton title="Sign In"/>
                <div className="text-lg text-gray-600/50 font-normal ml-4 mb-7 text-slate-500">Don`t have an account? <a href="" className="text-blue-500 underline">Sign Up</a></div>
            </div>
        </div>
        <div>
            <Quotes/>
        </div>
    </div>
  )
}

export default Signin