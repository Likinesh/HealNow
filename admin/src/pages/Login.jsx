/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import { Admincontext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const [state,setState] = useState('Admin');
    const [email,setEmail] = useState('');
    const [password,setpassword] = useState('');

    const {Token,setToken,backendUrl} = useContext(Admincontext);

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            if(state==='Admin'){
                const {data} = await axios.post(backendUrl+'api/admin/login',{email,password});
                if(data.success){
                    console.log(data.token);
                    localStorage.setItem('Token',data.token);
                    setToken(data.token);
                    console.log(Token);
                }
                else{
                    toast.error(data.message);
                }
            }
            else{
                const {data} = await axios.post(backendUrl+'api/admin/login',{email,password});
            }
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <form onSubmit={onSubmit} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-4 m-auto items-center p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
            <p className="text-2xl font-semibold m-auto"><span className="text-[#5F6FFF]">{state}</span> Login</p>
            <div className="w-full">
                <p >Email</p>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="border border-[#DADADA] rounded w-full p-2 mt-1" required placeholder="Enter email"/>
            </div>
            <div className="w-full">
                <p>Password</p>
                <input type="password" onChange={(e)=>setpassword(e.target.value)} value={password} className="border border-[#DADADA] rounded w-full p-2 mt-1" required placeholder="Enter password"/>
            </div>
            <button className="bg-[#5F6FFF] text-white w-full py-2 rounded-lg text-base cursor-pointer">Login</button>
            {
                state==='Admin' ?
                <p>Doctor Login? <span onClick={()=>setState('Doctor')} className="underline text-[#5F6FFF] cursor-pointer">Click Here</span></p>
                :
                <p>Admin Login? <span onClick={()=>setState('Admin')} className="underline text-[#5F6FFF] cursor-pointer">Click Here</span></p>
            }
        </div>
    </form>
  )
}

export default Login