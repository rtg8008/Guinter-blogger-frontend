import '../App.css';
import React, { useEffect } from 'react';
import { TextField, Stack, Button, CardContent, Typography, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import { API_URL, ProfileContext } from './ProfileContext';


function Posts() {
  const [posts, setPosts] = React.useState([{title: '', content: ''}])
  const [members, setMembers] = React.useState([{name: ''}])

  const [profile, setProfile] = React.useContext(ProfileContext)
  const nav = useNavigate();
  React.useEffect(()=>{
    const init = {

    }
    fetch(`${API_URL}members`)
    .then(res => res.json())
    .then (data => {
      setMembers(data)
      console.log(data)
    });
    fetch(`${API_URL}posts/${profile.id}`)
    .then(res => res.json())
    .then (data => {
      let temp = data.map((e)=>{
        e.isEditing = false;
        return e;
      });
      console.log('printing data with isediting var',temp);
      setPosts(temp)
    });
  },[profile])
  const newPostHandler = () =>
  {
    //     {title: 'need food', content: 'need food now', user_id: 2},
    let data = {
      title: document.getElementById('new-post-title').value,
      content: document.getElementById('new-post-content').value,
      user_id: profile.id
    }
    console.log('data', data);
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

    })
    let temp = new Date()  
    console.log(`${temp.toDateString()} ${temp.toUTCString()}`);
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
    console.log(postID)
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
    console.log('clicked edit button with id: ', id)
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
    console.log('clicked edit button with id: ', id)
    let data = {
      title: document.getElementById(`edit-post-title${id}`).value,
      content: document.getElementById(`edit-post-content${id}`).value,
      user_id: profile.id
    }
    console.log(data);
    const init = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }
    fetch(`${API_URL}posts/${id}`, init)
    .then(res => res.json())
    .then(data => {
      setPosts(data);

    })

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
    console.log('clicked edit button with id: ', id)
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

  return (
    <div className="App">
      {/* {names.map((e, i) => {
        return <p key = {e.id}>{e.first_name}</p>
      })} */}
      <Button onClick={()=>{
        nav('/')
      }}>Home</Button>
      <h1>{profile.username}</h1>
      <h2>new post</h2>
      <Stack>
        <TextField id = 'new-post-title' label='Title'></TextField>
        <TextField id = 'new-post-content' label='Content'></TextField>
        <Button onClick={()=>{newPostHandler()}}>Post</Button>
      </Stack>
      <h2>current posts</h2>
      <Stack sx={{padding:'2vw'}}>
        {posts.map((e, i) => {
          if (e.isEditing){
            return (
              <Card sx={{minWidth: 275, border: '2px 2px 2px 2px', borderColor: 'black', padding: '2vw'}}>
                <CardContent>
                  <Typography sx={{fontSize:14}} color ="text.secondary" gutterBottom>
                    {getUsernameFromUserID(e.user_id)}
                  </Typography>
                    <TextField id={`edit-post-title${e.id}`} defaultValue={e.title}/>
                    <TextField id={`edit-post-content${e.id}`}  defaultValue={e.content}/>
                </CardContent>
                <CardActions>
                  <Button onClick={() => {submitChangesHandler(e.id)}} size='small'>submit</Button>
                  <Button onClick={()=>{cancelChangesHandler(e.id)}} size='small'>cancel</Button>
                </CardActions>
              </Card>
              )
          }else{

            return (
              <Card sx={{minWidth: 275, border: '2px 2px 2px 2px', borderColor: 'black', padding: '2vw'}}>
                <CardContent>
                  <Typography sx={{fontSize:14}} color ="text.secondary" gutterBottom>
                    {getUsernameFromUserID(e.user_id)}
                  </Typography>
                  <Typography sx={{fontSize:14}} color ="text.secondary" gutterBottom>
                    {e.title}
                  </Typography>
                  <Typography variant="body2">
                    {e.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => {editPostHandler(e.id)}} size='small'>edit</Button>
                  <Button onClick={()=>{deletePostHandler(e.id)}} size='small'>delete</Button>
                </CardActions>
              </Card>
              )

          }
        })}
      </Stack>

    </div>
  );
}

export default Posts;
