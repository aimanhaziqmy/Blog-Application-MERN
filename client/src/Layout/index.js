import React from 'react'
import Header from '../Header'
import { Outlet } from 'react-router-dom'
function index() {
  return (
    <main>
        <Header />
        <Outlet/>
    </main>
  )
}

export default index