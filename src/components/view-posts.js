import '../App.css';
import React, { useEffect } from 'react';
import { TextField, Stack, Button, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import { API_URL, ProfileContext } from './ProfileContext';


function Posts() {
  const [posts, setPosts] = React.useState([{title: '', content: ''}])
  const [profile, setProfile] = React.useContext(ProfileContext)
  const nav = useNavigate();
  React.useEffect(()=>{
    const init = {

    }
    fetch(`${API_URL}posts/${profile.id}`)
    .then(res => res.json())
    .then (data => {
      setPosts(data)
      console.log(data)
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

  }

  return (
    <div className="App">
      {/* {names.map((e, i) => {
        return <p key = {e.id}>{e.first_name}</p>
      })} */}
      <Button onClick={()=>{
        nav('/')
      }}>Home</Button>
      <Stack>
        <TextField id = 'new-post-title' label='Title'></TextField>
        <TextField id = 'new-post-content' label='Content'></TextField>
        <Button onClick={()=>{newPostHandler()}}>Post</Button>
      </Stack>
      <Stack>
        {posts.map((e, i) => {
          return (
          <Card sx={{minWidth: 275, border: '2px 2px 2px 2px', borderColor: 'black', paddingTop: '2vw'}}>
            <CardContent>
              <Typography sx={{fontSize:14}} color ="text.secondary" gutterBottom>
                {e.user_id}
              </Typography>
              <Typography sx={{fontSize:14}} color ="text.secondary" gutterBottom>
                {e.title}
              </Typography>
              <Typography variant="body2">
                {e.content}
              </Typography>
            </CardContent>
          </Card>
          )
        })}
      </Stack>

    </div>
  );
}

export default Posts;
