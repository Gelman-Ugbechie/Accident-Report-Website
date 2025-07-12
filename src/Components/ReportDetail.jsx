import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'

export default function ReportDetail() {
  const [repor,setRepor] = useState({})
  const [loading, setLoading] = useState(true)



  const {id} = useParams()
  const navigate = useNavigate()
  console.log(id);

  const getRepor = (id) =>{
    fetch(`https://6808be4e942707d722df8c3c.mockapi.io/api/v1/Report/${id}` , {
      method: "GET",
      headers: {
          "content-type": "application/json"
      },
  })
  .then((res) => {
      if (res.ok){
          return res.json()
      }
      throw new Error("Network response was not ok.")
  })

  .then((repor) => {
      console.log(repor)
      setRepor(repor)
      setLoading(false)
  })

  .catch((error) => {
      console.error("Error", error)
  })
  }

  useEffect ( () =>{
    getRepor(id)
  }, [id])

  // const reportt = report.find((report) => report.id === Number(id));
  // console.log(reportt);
  if (loading){
    <div>Loading Report data......</div>
  }

  if (!repor) {
    return (
      <div className="p-4 text-center">
        <p>Report not found</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-400 text-white rounded"
        >
          Go Back
        </button>
      </div>
    )
}

  return (
    <>
    < div className="bg-indigo-100  w-full">
      <div className="bg-blue-400 rounded-lg shadow-lg pb-4 pr-2 pl-(-2) text-center place-items-center">
        <img 
          src={repor.image} 
          alt={repor.headline}  
          className='w-36 h-36 rounded-full mx-auto mb-4 object-cover'
        />  
        <h1 className='w-150'><span className="text-2xl ">HEADLINE: </span> {repor.headline}</h1>
        <h2 className='w-150' ><span className="text-2xl " >DESCRIPTON: </span> {repor.description}</h2>
        <p className='w-150'><span className="text-2xl ">EYEWITNES REPORT: </span> {repor.eyewitness}</p>
        
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:cursor-pointer"
        >
          Back to List
        </button>
      </div>
    </div>
      
    </>
  )
}
