import { SignButton } from "../components/ButtonSign"
import InputBox from "../components/InputBox"
import Quotes from "../components/Quotes"


const Signup = () => {
  return (
    <div className="grid grid-cols-2">
        <div className="flex justify-center items-center w-full">
            <div className="flex flex-col items-center w-3/4">
                <div className="text-4xl font-bold mb-3">Create an account</div>
                <div className="text-lg text-gray-600/50 font-normal ml-4 mb-7 text-slate-500">Already have an account? <a href="" className="underline">Login</a></div>
                <InputBox title="Name" placeholder="Enter your name"/>
                <InputBox title="Email" placeholder="xyz@example.com"/>
                <InputBox title="Password" placeholder=""/>
                <SignButton title="Sign Up"/>
            </div>
        </div>
        <div>
            <Quotes/>
        </div>
    </div>
  )
}

export default Signup