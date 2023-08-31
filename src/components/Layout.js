import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import '../assets/styles/Layout.css';

const Layout = ({ id }) => {
  return (
    <div className='layout'>
      <div className=" navbarLayout">
        <Navbar id={id} />
      </div>
      <div className="layoutContent">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
