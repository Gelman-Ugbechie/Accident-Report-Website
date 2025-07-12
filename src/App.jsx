import React from 'react'
import Form from './Components/Form'
import {BrowserRouter, Routes, Route, Link,} from "react-router-dom"
import ReportDetail from './Components/ReportDetail'
import Home from './Components/Home'

export default function App() {


  return (
    <>
     <BrowserRouter> 
     <nav className='bg-blue-500 flex gap-4 text-white w-full'>
          <Link to='/' className=' hover:font-bold cursor-pointer'>Home</Link>
          <Link to='/Form' className='hover:font-bold cursor-pointer'>Add Report</Link>
        </nav>

      <div className='bg-indigo-100 text-center pb-8 w-full'>
        <h1 className='text-2xl'>REACT ACCIDENT REPORT WEBSITE</h1>
        <p>Report Accidents in real-time and receive prompt feedback from necessary authorities....</p>
        
       
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Form' element={<Form />} />
        <Route path='/ReportDetail/:id' element={<ReportDetail />} />
        <Route path='/editReport/:id' element={<Form />} />

     
       
      </Routes>
      
    </BrowserRouter>
    <footer className='bg-blue-500 flex gap-4 text-white justify-between '>
          <h1>Lorem</h1>
          <h1> &copy;Copyright React app</h1>
          <h1>Lorem</h1>
        </footer>
        
    </>
  )
}
