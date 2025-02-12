import React from 'react'
import Header from '../components/Header'
import SpecalityMenu from '../components/SpecalityMenu'
import TopDoctors from '../components/TopDoctors'

const Home = () => {
  return (
    <div>
        <Header/>
        <SpecalityMenu/>
        <TopDoctors/>
    </div>
  )
}

export default Home