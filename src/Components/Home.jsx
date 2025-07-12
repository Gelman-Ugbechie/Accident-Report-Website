import React, { useEffect, useState } from 'react'
import Report from './Report'

export default function Home() {
    const [report, setReport] = useState([])

    const getReport = () =>{
        fetch("https://6808be4e942707d722df8c3c.mockapi.io/api/v1/Report" , {
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
            setReport(repor)
        })

        .catch((error) => {
            console.error("Error", error)
        })
    }

    useEffect(() =>{
     getReport()
    },[])

    const handleDelete = (id) =>{
      setReport(report.filter((repor) => repor.id != id))
    }

  return (
    <>
    <div>      
          <div className='flex flex-wrap justify-center gap-4 bg-indigo-100'>
            {report.length > 0 ? (
              report.map((report) => (
                <Report
                  report={report} 
                  id={report.id} 
                  key={report.id}
                  handleDelete = {handleDelete}  // Changed from index to user.id
                />
              ))
            ) : (
              <div className="text-center w-full py-8">
                <p className="text-white text-xl">No users available</p>
              </div>
            )}
          </div>
    
  
    </div>
    </>
  )
}
