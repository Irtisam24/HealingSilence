import React,{useState,useEffect} from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Axios from 'axios'
import {Link} from 'react-router-dom'

const Community = () => {
    
    const [data,setData]=useState([])
    const [totalposts,setTotalPosts]=useState([])
    useEffect(() => {
      const getData=async()=>{
          const catData=await Axios.get('http://localhost:5000/community/')
          if(catData){
              setData(catData.data[0])
              setTotalPosts(catData.data[1])
      }
    }
      getData()
    }, [])

    
  return (
    <>
      <Navbar />

        <div className='container mt-5 mb-5'>
        <table className='table'>
            
             <thead>
             <tr>
                 <th>Category</th>
                 <th>Total Threads</th>
                 <th>Latest Thread</th>
              </tr>
             </thead>   
            <tbody>
                {data.map(category=>{
                    return(
                        <tr key={category.cat_id}>
                            <td><Link to={`/community/${category.cat_id}`}>{category.cat_title}</Link>
                            <br/>
                            <span className='mt-3'>{category.cat_desc}</span></td>
                            <td>{totalposts.map(total=>{
                                if(total.cat_id === category.cat_id){
                                    return(
                                    total.count
                                    )
                                }else{
                                    return null
                                }
                            })}</td>
                            <td>{category.topic_title}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
      <Footer />
    </>
  )
}

export default Community
