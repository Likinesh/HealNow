import { useContext } from 'react'
import { assets } from '../assets/assets'
import { Admincontext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
const Nabar = () => {
    const {Token,setToken} = useContext(Admincontext);
    const navigate= useNavigate();
    const logout = ()=>{
        navigate('/');
        Token && setToken('');
        Token && localStorage.removeItem('Token');
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 border-b bg-white border-white'>
        <div className='flex items-center gap-2 text-xs'>
            {/* Logo */}
            <img src={assets.admin_logo} className='w-36 sm:w-40 cursor-pointer' alt=''/>
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{Token ? 'Admin' : 'Doctor'}</p>
        </div>
        <button className='bg-[#5F6FFF] text-white text-sm px-6.5 py-2 rounded-full cursor-pointer' onClick={logout}>Logout</button>
    </div>
  )
}

export default Nabar