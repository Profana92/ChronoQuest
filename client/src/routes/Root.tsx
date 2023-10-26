import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../components/Header'

const Root: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <footer>This is a footer</footer>
    </>
  )
}

export default Root
