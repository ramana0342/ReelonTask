import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { store } from './taskApp'

function ManageUserPost() {

  const {LoginStatus, setLoginStatus} = useContext(store)

  useEffect(()=>{
    let token = JSON.parse(sessionStorage.getItem("Token"))
     
      let headers = {
          "Authorization": `${token}`
      }
      if(token){
        axios.get("http://localhost:8080/getUsersPostData",{headers}).then((res)=>{
          setUserPostsData(res.data.userPostsData)
         // console.log(res.data.userPostsData)
        })
      }
  },[])


  
  const [postData , setPostData] = useState({title:"",body:""})
  const [postStatus,setPostStatus] = useState()
  const [postBtnStatus,setBtnStatus] = useState()
  const [userPostsData, setUserPostsData] = useState([])
  const [deleteBtnStatus,setDeleteBtnStatus] = useState()
  const [editPostData, setEditPostData] = useState();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); 

  const handleChange = (field,value)=>{
        setPostData({...postData,[field]:value})
  }

  const createPostFun = (e)=>{
      e.preventDefault()
      setBtnStatus(true)
      setPostStatus()
      let token = JSON.parse(sessionStorage.getItem("Token"))
      //console.log(token)
      let headers = {
          "Authorization": `${token}`
      }
     
      axios.post("http://localhost:8080/createPost",postData,{headers}).then((res)=>{
        console.log(res)
           if(res.status==201){
            setPostData({title:"",body:""})
            setUserPostsData([res.data.newPostResult,...userPostsData])
            setBtnStatus()
            setPostStatus("Post Created Successfully")
            setTimeout(()=>{
              setPostStatus()
            },3000)
           }

                
           
      }).catch((err)=>{
          console.log(err)
          setBtnStatus()
          setPostStatus()
      })

 }


 const deletePostFun = (id)=>{
            
      axios.delete(`http://localhost:8080/deleteUserPost/${id}`).then((res)=>{
             // console.log(res)
            if(res.status==201){
              setDeleteBtnStatus()
              setUserPostsData((prev)=> prev.filter((post,i)=> post._id!=id))
            }
      }).catch((err)=>{
              console.log(err)
              setDeleteBtnStatus()
      })

 }

//  Edit  Part       

 const editPostFun = (post) => {
  setEditPostData(post);
  setIsEditModalVisible(true);
};

const handleEditChange = (field, value) => {
  setEditPostData({ ...editPostData, [field]: value });
};

const updatePostFun = (e) => {
  e.preventDefault();
  let token = JSON.parse(sessionStorage.getItem("Token"))
  let headers = {
      "Authorization": `${token}`
  }

  axios.put("http://localhost:8080/edituserPost",editPostData,{headers}).then((res)=>{
       if(res.status==201){
        setUserPostsData((prev)=>prev.map((post,i)=> post._id === editPostData._id ? res.data.editedPostData : post ));
        setIsEditModalVisible(false);
        setEditPostData()
    }
  }).catch((err)=>{
       console.log(err)
  })


}



  return (
    
  <>
     {LoginStatus ? <>
   <div className='CreatePostContainer'>

       <h3>Create Your Post</h3>
      <div className='createPostInputDiv'>
        <form onSubmit={createPostFun}>
       <input type="text" class="form-control" placeholder="Post Title"  aria-describedby="addon-wrapping" required onChange={(e)=>{handleChange("title",e.target.value)}} value={postData.title}/>
       <textarea type='text' class="form-control postBody" placeholder="Post Body"  aria-describedby="addon-wrapping" required onChange={(e)=>{handleChange("body",e.target.value)}} value={postData.body}/>
       
       {postBtnStatus ? <button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Loading...</span>
</button> : <button type="submit button" class="btn btn-primary">Create Post</button> } 
     <br></br>
     {postStatus ? <b>{postStatus}</b> : ""}
       </form>
       </div>
     </div>


     <div className='displayUserPostsContainer'>

     <div class="row row-cols-1 row-cols-md-3 g-4">

  {userPostsData.length>0 ? userPostsData.map((post,index)=>{
          return(<>
           <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h4 class="card-title">{post.title}</h4>
        <p class="card-text">{post.body}</p>
        <div>
       { post._id == deleteBtnStatus ? <button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Deleting...</span>
</button> : <button type="button" class="btn btn-primary" onClick={()=>{deletePostFun(post._id);setDeleteBtnStatus(post._id)}}>Delete</button>}
<button type='button' className='btn btn-warning' onClick={() =>{ editPostFun(post)}}> Edit</button>
        </div>
      </div>
    </div>
  </div>
          </>)
  }) : "" }
 
  </div>

     </div></> : <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}><h1>Please Login</h1></div>}

   

   {isEditModalVisible ? 
    <div className='editPostModal'>
    <div className='modalContent'>
      <h3>Edit Post</h3>
      <form onSubmit={updatePostFun}>
        <input
          type='text'
          className='form-control'
          placeholder='Post Title'
          required
          value={editPostData.title}
          onChange={(e) => handleEditChange('title', e.target.value)}
        />
        <textarea
          className='form-control postBody'
          placeholder='Post Body'
          required
          value={editPostData.body}
          onChange={(e) => handleEditChange('body', e.target.value)}
        />
        <div style={{display:"flex" , justifyContent:"space-around"}}>
        <button type='submit' className='btn btn-success'>
          Update Post
        </button>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => setIsEditModalVisible(false)}
        >
          Close
        </button>
        </div>
      </form>
    </div>
  </div> 

   :""}


       
  </>)

}

export default ManageUserPost