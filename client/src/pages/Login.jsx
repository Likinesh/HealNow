import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {BackendUrl,utoken,set_token} = useContext(AppContext)
  const [state,setState] = useState('Sign Up')
  const navigate=useNavigate();
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')

  const onSubmitHandler = async (event) =>{
    event.preventDefault()
    try {
      if(state==='Sign Up'){
        const {data}=await axios.post(BackendUrl+'api/user/register',{name,email,password},{withCredentials:true});
        if(data.success){
          localStorage.setItem('utoken',data.utoken);
          set_token(data.utoken);
          window.location.reload();
        }
        else{
          toast.error(data.message);
        }
      }
      else{
        const {data}=await axios.post(BackendUrl+'api/user/login',{email,password},{withCredentials:true});
        if(data.success){
          localStorage.setItem('utoken',data.utoken);
          set_token(data.utoken);
          console.log(utoken);
          window.location.reload();
        }
        else{
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(utoken){
      navigate('/')
    }
  },[utoken]);

  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
          <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
          <p>Please {state === 'Sign Up' ? "Sign Up" : "Login"} to Book Appointment</p>
          {
            state === 'Sign Up' && <div className='w-full'>
              <p>Full Name</p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name} required/>
            </div>
          }
          <div className='w-full'>
            <p>Email</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
          </div>
          <div className='w-full'>
            <p>Password</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required/>
          </div>
          <button type='submit' className='bg-blue-300 text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>
          {
            state === 'Sign Up' 
            ? <p>Already Have an Account? <span onClick={()=>setState('Login')} className='text-blue-300 underline cursor-pointer'>Login Here</span></p>
            : <p>Create a new Account? <span onClick={()=>setState('Sign Up')} className='text-blue-300 underline cursor-pointer'>Click Here</span></p>
          }
        </div>
    </form>
  )
}

export default Login