import React, { useState,useEffect,useRef,useContext} from 'react'
import Axios from 'axios'
import Navbar  from '../../components/navbar'
import Footer from '../../components/footer'
import Posts from './components/posts'
import UserContext from '../../context/UserContext'


const SingleThread = ({match}) => {

    const {params:{topicid}}=match
    const [thread,setThread]=useState([])
    const[posts,setPosts]=useState([])
    const [reply,setReply]=useState('')
    const [file,setfile]=useState('')
    const errors=[]
    const {userdetails:{userid}}=useContext(UserContext);
    const replyBox=useRef('')

    useEffect(() => {

      const getData=async () => {
        const pagedata=await Axios.get(`http://localhost:5000/community/thread/${topicid}`)
        if(pagedata){
            setThread(pagedata.data[0])
            setPosts(pagedata.data[1])
        }
      }
      getData()
    }, [])


    const focusonreplybox=()=>{
      replyBox.current.focus()
      replyBox.current.scrollIntoView({ block: 'nearest', behavior: 'auto'});
    }

    const checkerrors=async(value)=>{
      if(!value){
        errors.reply='Reply is Must'
      }
      if(!userid){
        errors.login='Must Login before you can post anything'
      }
      return errors
    }

    const handlesubmit=async(e)=>{
      e.preventDefault()

      const check=await checkerrors(reply)
      console.log(errors)
      if(Object.keys(check).length===0){
        const formData=new FormData()
        formData.set('topicid',topicid)
        formData.set('userid',userid)
        formData.set('reply',reply)
        formData.append('file',file);
        const newPost=await Axios.post('http://localhost:5000/community/createthread',formData,
        {headers: {'Content-Type':'multipart/form-data'}
        });
        if(newPost){
          window.location.reload();
        }
      }
    }

    return (
    <>
    <Navbar/>
          <div className='container mt-5'>

            <div className='title'>
                <div className='row'>
                    <div className='col-8'>
                    {thread.map(title=>{
                        return(
                            <>
                          <span className='float-left'><img className="img-thumbnail mr-3 rounded-circle" src={`http://127.0.0.1:8887/userimgs/${title.pic}`} style={{maxHeight:80,maxWidth:80}} alt=""/></span>  <h3>{title.topic_title}</h3>
                          <span>Created By: {title.username}</span>
                        </>)
                    })}
                    <div className='col-4 float-right'>
                        <button className='btn btn-success' onClick={focusonreplybox}>Reply to this topic</button>
                    </div>
                    
                    </div>
                </div>
            </div>
          

          <div class="card mt-5 shadow-lg p-3" >
          <div class="row">
          
            {thread.map(ogPost=>{
              console.log(ogPost)
              return(
                <>
                <div className="col-md-4">
                <img src={`http://127.0.0.1:8887/userimgs/${ogPost.pic}`} className="card-img h-75" alt="..."/>
                <p className='text-center bold'>{ogPost.username}</p>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{ogPost.topic_title}</h5>
                  <p className="card-text">{ogPost.topic_desc}</p>
                  {ogPost.topic_pic ?  <img src={`http://127.0.0.1:8887/forumposts/${ogPost.topic_pic}`} className="card-img h-50 w-50" alt="..."/>:null}
                  <p className="card-text mt-5">Created At: {ogPost.created_at}</p>
                </div>
              </div>
              </>
              )
            })}
              </div>
              </div>
            {posts.length >0 
            ? posts.map(post=>{
              return(
                <Posts post={post}/>
              )
            }):null
           }

           <div className="card my-4">
          <h5 className="card-header">Reply to the Topic:</h5>
          <div className="card-body">
            <form onSubmit={handlesubmit}>  
              <div className="form-group">
                <textarea className="form-control" rows="3" ref={replyBox} name='reply' onChange={e=>setReply(e.target.value)}></textarea>
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

export default SingleThread
