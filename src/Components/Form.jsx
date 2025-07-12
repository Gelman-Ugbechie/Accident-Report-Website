import React , {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function Form() {
    // const [image, setImage] = useState(" ");
    // const [headline,setHeadline] = useState(" ")
    // const [description,setDescription] = useState(" ")
    // const [eyewitness, setEyewitness] = useState(" ")

    const [formData, setFormData] = useState({
        image: "",
      headline: "",
      description: "",
      eyewitness: "",
      
    })
    const [isEditing, setIsediting] = useState(false)

    const navigate = useNavigate()
    const{id} = useParams()
    console.log(id)

    useEffect(() => {
      if(id){
        setIsediting(true)
        fetchReport(id)
      }
    },[id])

    const fetchReport = (reportid) => {
      fetch(`https://6808be4e942707d722df8c3c.mockapi.io/api/v1/Report/${reportid}`,{
        method: "GET",
        headers: {"content-type":"application/json"},
        
    })
    .then((res) => {
        if(res.ok){
            return res.json()
        }
        throw new Error("Report not Submitted")
    })

    .then((data) => {
      setFormData({
          image: data.image || "",
          headline: data.headline || "",
          description: data.description || "",
          eyewitness: data.eyewitness || ""
      });
    
  })
  

    .catch((error) => {
        console.error("Error adding Report: ", error)
    }
    )
 

    } 

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData,
          [name]: value,
        }))
      };
        
  const handleSubmit = (e) => {
        e.preventDefault();

        const reportData = {
          image: formData.image,
          headline: formData.headline,
          description: formData.description,
          eyewitness: formData.eyewitness,
      };

     if (isEditing){
      updateReport(reportData)
     }
     else{
      addReport(reportData)

     }

      }

      const addReport = (report) => {
        fetch("https://6808be4e942707d722df8c3c.mockapi.io/api/v1/Report ",{
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify(report)
        })
        .then((res) => {
            if(res.ok){
                return res.json()
            }
            throw new Error("Report not Submitted")
        })

        .then((datar) => {
            console.log(`Report successfully submitted ${datar}`)
            alert('Report sucessfully submitted')
            resetForm()
            
        })

        .catch((error) => {
            console.error("Error adding Report: ", error)
            alert("Failed to submit report. Please try again.");
        }
        )
     
      }

      const resetForm = () =>{
        setFormData({
            image: "",
           headline: "",
           description: "",
           eyewitness: "",

        })
        setIsediting(false)
      };
    
      const updateReport = (report) => {
        fetch(`https://6808be4e942707d722df8c3c.mockapi.io/api/v1/Report/${id}`,{
          method: "PUT",
          headers: {"content-type":"application/json"},
          body: JSON.stringify(report)
      })
      .then((res) => {
          if(res.ok){
              return res.json()
          }
          throw new Error("Report not Submitted")
      })

      .then((datar) => {
          console.log(`Report successfully Updated ${datar}`)
          resetForm()
          navigate('/')
          alert('Report sucessfully Updated')
      })

      .catch((error) => {
          console.error("Error updating Report: ", error)
          alert("Failed to update report. Please try again.");
      }
      )
   

      }

    


  return (
    <>
      <form onSubmit={handleSubmit} className='bg-indigo-100 grid place-items-center p-4 gap-3'>
        <label>Pic</label>
        <input className ='bg-gray-200 w-20 h-6 rounded-lg border-1 hover:cursor-pointer' onChange={handleChange} type='file' value ={formData.image} name='image' placeholder='insert accident image'></input>
        <label>Headline</label>
        <input  required className ='bg-white w-50 h-20'onChange={handleChange}  type='text' value ={formData.headline} name='headline' placeholder='Headline of the accident'></input>
        <label>Description</label>
        <input  required className ='bg-white w-90 h-40' onChange={handleChange} type='text' value ={formData.description} name='description' placeholder='a brief description of the accident'></input>
        <label>Eyewitness Report</label>
        <input  required className ='bg-white w-90 h-40' onChange={handleChange} type='text' value ={formData.eyewitness} name='eyewitness' placeholder='a detailed eye witness report'></input>
        <button className ='bg-blue-500 w-20 h-15 rounded-lg text-white hover:cursor-pointer hover:bg-blue-600 transition'>{isEditing ? 'Update Report': 'Add Report '}</button>
        {isEditing && (
                <button
                    type='button'
                    className='bg-blue-500 w-20 h-15 rounded-lg text-white hover:cursor-pointer hover:bg-blue-600 transition'
                    onClick={() => navigate('/')}
                >
                    Cancel
                </button>
            )}
      </form>
    </>
  )
}
