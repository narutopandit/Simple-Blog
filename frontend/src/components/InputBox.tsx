import { ChangeEvent } from "react"

interface paramsTypes {
  title: string,
  placeholder: string,
  onChange: (e: ChangeEvent<HTMLInputElement>)=> void
  type?: string, 
}


const InputBox = ({title,placeholder,onChange,type}: paramsTypes) => {
  return (
    <div className="w-full max-w-sm min-w-[200px] mb-3">
  <label className="block mb-2 text-base text-slate-600 font-bold">
      {title}
  </label>
  <input onChange={onChange} type={type} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={placeholder} />
</div>
  )
}

export default InputBox