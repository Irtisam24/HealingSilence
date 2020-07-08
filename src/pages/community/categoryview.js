import React,{useEffect,useState,useContext,useRef} from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import {Link} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Axios from 'axios';

const CategoryView = ({match}) => {
    const { params: { catid } } = match;
    const {userdetails:{userid}}=useContext(UserContext);
    const [topics,settopics]=useState([])
    const [postCount,SetPostCount]=useState([])
    const [postdesc,setPostDesc]=useState('')
    const [posttitle,setPostTitle]=useState('')
    const [file,setfile]=useState('')

    const createtopicbox=useRef('')
    const errors=[]
    
    let Title
    useEffect(() => {
      const gettopics=async () => {
        const alltopics=await Axios.get(`http://localhost:5000/community/${catid}`)
        if(alltopics){
            settopics(alltopics.data[0])
            SetPostCount(alltopics.data[1])
        }
      }
      gettopics()
    }, [])


    const checkerrors=()=>{
        if(!posttitle){
            errors.title='Must have a title'
        }
        if(!postdesc){
            errors.postdesc='Must have a Description'
        }
        if(!userid){
            errors.userid='Must be logged in before you can post'
        }

        return errors

    }

    const focusoncreatetopic=()=>{
        createtopicbox.current.scrollIntoView({ block: 'nearest', behavior: 'auto'});
    }

    const handlesubmit=async(e)=>{
        e.preventDefault()
        const finderros=await checkerrors();
        console.log(userid)
        if(Object.keys(finderros).length===0){
            const formData=new FormData()
            formData.set('userid',userid)
            formData.set('catid',catid)
            formData.set('topictitle',posttitle)
            formData.set('topicdesc',postdesc)
            formData.append('file',file)
            const newtopic=await Axios.post('http://localhost:5000/community/createtopic',formData,
            {headers: {'Content-Type':'multipart/form-data'}
            });
            if(newtopic){
                window.location.reload();
            }
        }
    }

  return (
    <>
      <Navbar/>
    
        <div className='container mt-5 mb-5'>
            <div class="card">
            <div class="card-header">
            {topics.map(topic=>{
                Title=topic.cat_title
            })}
            
            {Title}
                <button className='btn btn-success float-right' onClick={focusoncreatetopic}>Create New Post</button>
            </div>
            <div class="card-body">
                <table className='table'>
                    <thead>
                    <tr>
                        <th>
                            Thread Title
                        </th>
                        <th>Total Posts</th>
                        <th>Created By</th>
                    </tr>
                    </thead>

                    <tbody>
                        {topics.map(topic=>{
                            return(
                            <tr key={topic.topic_id}>
                                <td><Link to={`/community/${topic.cat_id}/${topic.topic_id}`}>{topic.topic_title}</Link></td>
                                <td>
                                    {postCount.map(replies=>{
                                        if(topic.topic_id===replies.topic_id){
                                            return(
                                                replies.count
                                            )
                                        }else{
                                            return null
                                        }
                                    })}
                                </td>
                                <td>
                                    {topic.username}
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
            </div>
        
        <div className="card my-4" ref={createtopicbox}>
          <h5 className="card-header">Create a New Topic:</h5>
          <div className="card-body">
            <form onSubmit={handlesubmit} >  
              <div className='form-group'>
              <label className='form-control-label' for='posttitle'>Post Title</label>
                <input className='form-control' name='posttitle' onChange={e=>setPostTitle(e.target.value)}></input>
              </div>
              <div className="form-group">
              <label className='form-control-label' for='reply'>Post Description</label>
                <textarea className="form-control" rows="3"  name='reply' onChange={e=>setPostDesc(e.target.value)}></textarea>
                {errors.reply ? <p className='alert alert-danger mt-2'>{errors.reply}</p> : null}
                {errors.login ? <p className='alert alert-danger mt-2'>{errors.login}</p> : null}
                
                <div className='custom-file mt-2'>
                <input type='file'  onChange={e=>setfile(e.target.files[0])}/>
                </div>

              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
        </div>
        
        <Footer/>
    </>
  )
}

export default CategoryView