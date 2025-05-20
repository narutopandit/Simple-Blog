import { useEffect, useRef, useState } from 'react'
import { Avitar } from './BlogCard'
import CreateButton from './CreateButton'
import { Link, useNavigate } from 'react-router-dom';

interface buttonType {
  name: string;
  Button?: boolean;
}
const AppBar = ({ name, Button = true }: buttonType) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const toggleDashboard = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dashboardRef.current && !dashboardRef.current.contains(event.target)) {
        const avatarElement = document.querySelector('.cursor-pointer');
        if (avatarElement && !avatarElement.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  function onClick() {
    navigate('/create');
  }
  function onClick2() {
    navigate('/drafts');
  }

  function LogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/signin');
  }
  return (
    <div className='flex justify-between p-3  border-b-blue-gray-50 border-b'>
      <div className='flex justify-center items-center'>
        <Link to={'/blog'}>Simple-Blog</Link>
      </div>
      <div className='flex items-center justify-center'>
      {(Button) ? <CreateButton name={"Drafts"} onClick={onClick2} /> : null}
        {(Button) ? <CreateButton name={"Create"} onClick={onClick} /> : null}
        <div onClick={toggleDashboard}
          className="cursor-pointer p-4" ref={dashboardRef} >
          <Avitar names={name} size='large' />
        </div>
        <div
          ref={dashboardRef}
          className={`fixed top-20 right-16 rounded-md h-50 w-40 bg-gray-100 shadow-lg transform transition-transform duration-300 ease-in-out ${(isOpen) ? "translate-x-0" : "translate-x-[100vw]"
            }`}
        >
          <h2 className="p-4 text-xl font-bold">{localStorage.getItem('username')}</h2>
          <div className='bg-red-600 text-white font-medium px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200 flex w-28 ml-3 mb-3 cursor-pointer' onClick={LogOut}>
            <svg viewBox="0 0 512 512">
              <path
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
              ></path>
            </svg>
            <button className='ml-2'>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}



export default AppBar