import '../App.css';
import React, { useEffect } from 'react';
import { TextField, Stack, Button, CardContent, Typography, CardActions, TextareaAutosize, Paper, Box, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import { API_URL, ProfileContext } from './ProfileContext';
import PostDialog from './PostDialog';
import {ColorButton, PostCard, PostCardEdit, MyPaper, MyTextField, Header, ContrastButton} from './CustomComponents'
import Home from './home';

function Posts() {
  const [posts, setPosts] = React.useState([])
  const [members, setMembers] = React.useState([])

  const [profile, setProfile] = React.useContext(ProfileContext)
  const nav = useNavigate();
  React.useEffect(()=>{
    const init = {

    }
    fetch(`${API_URL}members`)
    .then(res => res.json())
    .then (data => {
      setMembers(data)
      // console.log(data)
    });
    if(profile.id === undefined || profile.id === null)
    {

    }else{
      fetch(`${API_URL}posts/${profile.id}`)
      .then(res => res.json())
      .then (data => {
        let temp = data.map((e)=>{
          e.isEditing = false;
          return e;
        });
        // console.log('printing data with isediting var',temp);
        setPosts(temp)
      });
    }

  },[profile])
  const newPostHandler = () =>
  {
    //     {title: 'need food', content: 'need food now', user_id: 2},
    let data = {
      title: document.getElementById('new-post-title').value,
      content: document.getElementById('new-post-content').value,
      user_id: profile.id,
      date: (new Date().toUTCString())
    }
    if (data.content.length > 2048){
      data.content = data.content.substring(0,2048);
      console.log(data.content)
      console.log(data.content.length)
    }
    if (data.title.length > 128){
      data.title = data.title.substring(0,128);
    }
    if (data.date.length > 128){
      data.date = data.date.substring(0, 128)
    }

    // console.log('data', data);
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }
    fetch(`${API_URL}posts`, init)
    .then(res => res.json())
    .then(data => {
      setPosts(data);
      document.getElementById('new-post-title').value = ''
      document.getElementById('new-post-content').value = ''
    })
    let temp = new Date()  
    // console.log(`${temp.toDateString()} ${temp.toUTCString()}`);
  }
  const getUsernameFromUserID = (id) => {
    let result = ''
    members.forEach((e,i) => {
      if(e.id === id )
      {
        result = e.username
      }
    })
    return result;
  }
  const deletePostHandler = (postID) => {
    // console.log(postID)
    const init = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    }
    fetch(`${API_URL}posts/${postID}/${profile.id}`, init)
    .then(res => res.json())
    .then(data => {
      setPosts(data);

    })    
  }
  const editPostHandler = (id) => {
    // console.log('clicked edit button with id: ', id)
    posts.forEach((e,i)=>{
      if(e.id === id)
      {
        let temp = posts.map((e) => {
          return e;
        });
        temp[i].isEditing = true;
        setPosts(temp);
      }
    })
  }
  const submitChangesHandler = (id) => {
    // console.log('clicked edit button with id: ', id)
    let data = {
      title: document.getElementById(`edit-post-title${id}`).value,
      content: document.getElementById(`edit-post-content${id}`).value,
      user_id: profile.id,
      date: (new Date().toUTCString())
    }
    if (data.content.length > 2048){
      data.content = data.content.substring(0,2048);
      console.log(data.content)
      console.log(data.content.length)
    }
    if (data.title.length > 128){
      data.title = data.title.substring(0,128);
    }
    if (data.date.length > 128){
      data.date = data.date.substring(0, 128)
    }
    // console.log(data);
    const init = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }
    fetch(`${API_URL}posts/${id}`, init)
    .then(res => {
      if (res.status >=400) return posts;
      return res.json()
    })
    .then(data => {
      setPosts(data);

    })
    .catch(err => console.log(err))

    posts.forEach((e,i)=>{
      if(e.id === id)
      {
        let temp = posts.map((e) => {
          return e;
        });
        temp[i].isEditing = false;
        setPosts(temp);
      }
    })
  }
  const cancelChangesHandler = (id) => {
    // console.log('clicked edit button with id: ', id)
    posts.forEach((e,i)=>{
      if(e.id === id)
      {
        let temp = posts.map((e) => {
          return e;
        });
        temp[i].isEditing = false;
        setPosts(temp);
      }
    })   
  }
  const reducePostLength = (post) =>{
    if (post.length > 100){
      return post.substring(0, 100) + '...'
    }
    return post;
  }
  if (profile.id === null || profile.id === undefined){
    return (
      <div className="App">
        <Home></Home>
      </div>
    )
  }
  return (
    <div className="App">
      {/* {names.map((e, i) => {
        return <p key = {e.id}>{e.first_name}</p>
      })} */}
      <Header></Header>
      <MyPaper sx={{minWidth: 275, border: '2px 2px 2px 2px', borderColor: 'black', marginLeft: '10vw', marginRight: '10vw', marginBottom: '4vw', marginTop: '175px'}} elevation={10}>
        <h1>{profile.username}'s Blog Posts</h1>
      </MyPaper>
      <Box>
        <MyPaper sx={{minWidth: 275, border: '2px 2px 2px 2px', borderColor: 'black', margin: '2vw'}} elevation={8}>
          <Stack sx={{backgroundColor: 'grey', margin: '1vw'}} spacing={2}>
            <h2>New Post</h2>
            <MyTextField sx={{margin: '2vw'}} id = 'new-post-title' label='Title'></MyTextField>
            <MyTextField multiline maxRows={5} minRows={3} sx={{margin: '2vw'}} id = 'new-post-content' label='Content'></MyTextField>
            <ColorButton sx={{margin: '2vw'}} onClick={()=>{newPostHandler()}}>Post</ColorButton>
          </Stack>
        </MyPaper>
      </Box>

      
      <MyPaper sx={{minWidth: 275, border: '2px 2px 2px 2px', borderColor: 'black', marginLeft: '10vw', marginRight: '10vw'}} elevation={10}>
        <h2>Your Posts</h2>
      </MyPaper>
      <Stack sx={{padding:'2vw'}}>
        {posts.slice(0).reverse().map((e, i) => {
          if (e.isEditing){
            return (
              <PostCardEdit key={i} sx={{minWidth: 275, border: '2px 2px 2px 2px', borderColor: 'black', margin: '2vw'}}>
                <CardContent>
                  <Typography sx={{}} color ="text.secondary" gutterBottom>
                    {e.date}
                  </Typography>
                  <Typography variant='h5' sx={{ textAlign: 'left'}} color ="text.secondary" gutterBottom>
                    From: {getUsernameFromUserID(e.user_id)}
                  </Typography>
                  <Stack spacing={2}>
                    <MyTextField
                      id={`edit-post-title${e.id}`}
                      label='Title'
                      defaultValue={e.title}
                    />
                    <MyTextField multiline maxRows={4} minRows={1}
                      id={`edit-post-content${e.id}`}
                      label='Content' 
                      defaultValue={e.content}
                    />
                  </Stack>
                </CardContent>
                <CardActions>
                  <ColorButton onClick={() => {submitChangesHandler(e.id)}} size='small'>submit</ColorButton>
                  <ColorButton onClick={()=>{cancelChangesHandler(e.id)}} size='small'>cancel</ColorButton>
                </CardActions>
              </PostCardEdit>
              )
          }else{

            return (
              <PostCard key={i}sx={{minWidth: 275, border: '2px 2px 2px 2px', borderColor: 'black', margin: '2vw'}}>
                <CardContent>
                  <Typography sx={{fontSize:14}}  gutterBottom>
                    {e.date}
                  </Typography>
                  <Typography variant='h4' sx={{textAlign: 'center'}}gutterBottom>
                    {e.title}
                  </Typography>
                  <Typography variant='h5' sx={{textAlign: 'left'}} gutterBottom>
                    From: {getUsernameFromUserID(e.user_id)}
                  </Typography>
                  <Typography variant='body1' sx={{textAlign: 'left'}}>
                    {reducePostLength(e.content)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <PostDialog post={e} username={getUsernameFromUserID(e.user_id)}></PostDialog>
                  <ContrastButton onClick={() => {editPostHandler(e.id)}} size='small'>edit</ContrastButton>
                  <ContrastButton onClick={()=>{deletePostHandler(e.id)}} size='small'>delete</ContrastButton>
                </CardActions>
              </PostCard>
              )

          }
        })}
      </Stack>
      <MyPaper >
        <p>
          This website is created as a requirement for the USSF Z-Prefix "C.R.U.D application test" and is not officially sponsored by the USSF, Department of Defence, or U.S Government.
          No promise of security or continuity of profiles or posts is provided to users of this cite. No moderation of content posted on this cite is provided.
        </p>
        <a href="https://iconscout.com/icons/g" target="_blank">G Icon</a> by <a href="https://iconscout.com/contributors/twitter-inc" target="_blank">Twitter Emoji</a>
      </MyPaper>
    </div>
  );
}



export default Posts;
