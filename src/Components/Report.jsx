import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function Report({report, id , handleDelete }) {
    const navigate = useNavigate()

    const handleEdit = (e) => {
      e.stopPropagation();
      navigate(`/editReport/${id}`)
    }

    const deleteReport = (e) =>{
      e.stopPropagation();
      if (!window.confirm("Delete this report permanently?")) 
      return
      fetch(`https://6808be4e942707d722df8c3c.mockapi.io/api/v1/Report/${id}` , {
        method: "DELETE",
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

    .then((reportData) => {
        console.log(reportData)
       if(handleDelete){
        handleDelete(id)
       }
    })

    .catch((error) => {
        console.error("Error", error)
    })
    }
   
    const handleClick = () => {
        navigate(`/ReportDetail/${id}`)
    }
  return (
    <>
   
      <div onClick={handleClick} className='bg-indigo-100 cursor-pointer '>
        
        <div className='bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center '>
        <img src={report.image} alt={report.headline}/>
        <h1 ><span className='text-blue-600'>HEADLINE</span>: {report.headline}</h1>
       <h2><span className='text-blue-600'>DESCRIPTION</span>: {report.description}</h2>
       <p><span className='text-blue-600'>EYEWITNESS REPORT</span>: {report.eyewitness}</p>
        </div>
        <div className='flex justify-between'>
          <button className = 'bg-blue-400 text-white text-xs px-2 py-1 rounded-lg hover:cursor-pointer hover:bg-blue-500 transition' onClick={handleEdit}> Update</button>
          <button className = 'bg-blue-400 text-white text-xs px-2 py-1 rounded-lg hover:cursor-pointer hover:bg-red-500 transition' onClick={deleteReport}> Delete</button>
        </div>
     
      </div>
    </>
  )
}
