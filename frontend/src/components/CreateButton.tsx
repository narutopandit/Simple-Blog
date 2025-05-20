

const CreateButton = ({name,onClick}:{name:String,onClick:(e:any)=>void}) => {
  return (
    <div>
         <button className={`flex items-center gap-2 px-4 py-2 text-white font-semibold 
                       bg-gradient-to-r from-purple-500 to-indigo-500 
                       rounded-lg shadow-lg transition-transform duration-300 ease-in-out
                       hover:scale-105 hover:from-purple-400 hover:to-indigo-400 
                       hover:shadow-[0_6px_15px_rgba(168,75,245,0.5)] mx-4`} onClick={onClick}>      
            {(name==="Create")?<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 19v-7m0 0V5m0 7H5m7 0h7"></path></svg>:null}
            {name}
            </button>
    </div>
  )
}

export default CreateButton