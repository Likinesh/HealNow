/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import Login from './pages/login'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer,toast} from 'react-toastify';
import { Admincontext } from './context/AdminContext';
const App = () => {
  const {Token} = useContext(Admincontext);
  return Token ? 
  (
    <div>

      <ToastContainer />
    </div>
  )
  :
  (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App