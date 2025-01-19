import React, { useContext, useState ,useEffect } from 'react'
import { store } from './taskApp'
import axios from 'axios'


function DisplayAllPost() {

   // const {allPostData,setAllPostData} = useContext(store)
    const [commentContent,setcommentContent] = useState({content:""})
     const [allPostData,setAllPostData] = useState([])
     const [allCommentsData,setAllComentsData] = useState([])
    //console.log(allPostData)
   // console.log(commentContent)

   useEffect(()=>{

    axios.get("http://localhost:8080/getAllPostsData").then((res)=>{
         //console.log(res.data.allPostsData)
         setAllPostData(res.data.allPostsData)
         setAllComentsData(res.data.allCommentsData)
    }).catch((err)=>{
        console.log(err)
    })
    
},[])


   const postCommentFun = (e,id)=>{
    e.preventDefault()
    let token = JSON.parse(sessionStorage.getItem("Token"))
    let headers = {
        "Authorization": `${token}`
    }

    if(token){
           axios.post(`http://localhost:8080/postComment/${id}`,commentContent,{headers}).then((res)=>{
                 console.log(res)
                 if(res.status==201){
                    setAllComentsData([res.data.CreatedCommentResult,...allCommentsData])
                    setcommentContent({content:""})
                 }
           }).catch((err)=>{
               console.log(err)
           })
    }else{
          alert("You Did Not Login Please Login")
    }

   }



  return (<>

<div className='displayallPostsContainer'>

<div class="row row-cols-1 row-cols-md-3 g-4">

{allPostData.length>0 ? allPostData.map((post,index)=>{
     return(<>
      <div class="col">
<div class="card h-100">
 <div class="card-body">
   <h4 class="card-title">{post.title}</h4>
   <p class="card-text">{post.body}</p>
   </div>
     <div className='CommentsContainer'>
          <h6 style={{textAlign:"center"}}>Comments</h6>
          <form onSubmit={(e)=>{postCommentFun(e,post._id)}}>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <input type='text' required onChange={(e)=>{setcommentContent({content:e.target.value})}}/>
          <button type='submit'>Comment</button>
          </div>
          </form>
                   <div>
                       {allCommentsData.map((comment,i)=>{
                                 if(comment.post_id==post._id){
                                    return <><div style={{margin:"5px 15px" ,borderRadius:"10px",border:"2px solid black",padding:"2px 20px"}}><b>User Name : {comment.username}</b><p>User Comment : {comment.content}</p></div></>
                                 }
                       })}
                   </div>
         
     </div>
</div>
</div>
     </>)
}) : "" }

</div>

</div>

  </>)
}

export default DisplayAllPost