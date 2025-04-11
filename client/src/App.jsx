// import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import Myappointement from './pages/Myappointements'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Chatbot from './components/chatbot'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
        <ToastContainer />
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/doctors' element={<Doctors/>}/>
          <Route path='/doctors/:speciality' element={<Doctors/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/my-profile' element={<MyProfile/>}/>
          <Route path='/my-appointments' element={<Myappointement/>}/>
          <Route path='/appointment/:docId' element={<Appointment/>}/>
        </Routes>
        <Chatbot/>
        {/* <script async type='module' src='https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js'></script>
        <zapier-interfaces-chatbot-embed is-popup='true' chatbot-id='cm94f8ndx000woxm3fgnd2aef'></zapier-interfaces-chatbot-embed> */}
        <Footer/>
    </div>
  )
}

export default App