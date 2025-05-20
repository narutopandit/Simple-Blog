
import AppBar from '../components/AppBar'
import CreateCard from '../components/CreateCard'

const CreateBlog = () => {
  return (
    <div>
        <div>
            <AppBar Button={false} name={localStorage.getItem('username')||""}/>
        </div>
        <div className='flex justify-center my-9'>
           <CreateCard/> 
        </div>
    </div>
  )
}

export default CreateBlog