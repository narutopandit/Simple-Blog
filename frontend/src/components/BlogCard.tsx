

interface BlogType {
  name: string,
  date: string,
  title: string,
  content: string,
  id: string,
  varient?: 'full'|'half'
}

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
];
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
const BlogCard = ({ name, date, title, content, varient='full' }: BlogType) => {
  return (
      <div className='max-w-xl mt-5 max-h-fit border-b-blue-gray-50 border-b cursor-pointer'>
        <div className='flex p-4'>
        <Avitar names={name} size='small'/>
        <div className='flex flex-col justify-center pl-2 text-light-green-900 font-light'>{name}</div>
        <div className='flex flex-col justify-center pl-1'>
          <div className='w-1 h-1 rounded-full bg-gray-300' ></div>
        </div>
        <div className='flex flex-col justify-center pl-1 text-blue-gray-100 font-extralight text-sm'>{date}</div>
      </div>
      <div className='font-extrabold text-xl px-5 mb-2'>
        {title}
      </div>
      <div className='font-extralight text-gray-700 text-sm px-5'>

       {(varient=='full')?content:((content.length<=100)?content:content.slice(0,100)+"....")}
      </div>
      <div className='text-xs font-thin px-5 text-blue-gray-100 mt-2'>
        {`${Math.ceil(content.length/100)} minute(s) read`}
      </div>
      </div>
  )
}


export const Avitar =({names,size='small'}:{names:string,size:'small'|'large'})=>{

  const firstLetter = ()=>{
    
    let alpha = names.split(" ")
    return (alpha.length>1)?alpha[0][0]+alpha[1][0]:alpha[0][0]
  }
  const bgColor= getRandomColor();
  return (
  <div className={`relative inline-flex items-center justify-center ${(size=='small')?'w-10 h-10':'w-12 h-12'} overflow-hidden ${bgColor} rounded-full`}>
    <span className={`${(size=='small')?'text-sm':'text-md'} text-white dark:text-gray-300`}>{firstLetter()}</span>
  </div>)
}


export default BlogCard