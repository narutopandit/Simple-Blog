import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import CreateBlog from './pages/CreateBlog'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/signup'} element={<Signup/>}/>
          <Route path='/' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/blog' element={<Blogs/>}/>
          <Route path='/blog/:id' element={<Blog/>}/>
          <Route path='/create' element={<CreateBlog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
