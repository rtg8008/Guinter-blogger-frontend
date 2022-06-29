import '../App.css';
import React, { useEffect } from 'react';
import { TextField, Stack, Button, CardContent, Typography, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import { API_URL, ProfileContext } from './ProfileContext';


function Home() {
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
    fetch(`${API_URL}posts`)
    .then(res => res.json())
    .then (data => {
      console.log(data);
      setPosts(data)
    });
  },[profile])

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


  return (
    <div className="App" >
      {/* {names.map((e, i) => {
        return <p key = {e.id}>{e.first_name}</p>
      })} */}
      <Button onClick={()=>{
        nav('/login')
      }}>Login</Button>
      <Button onClick={()=>{
        nav('/signup')
      }}>Sign Up</Button>
      <h1>Guinter Blog 2</h1>
      <h2>All Posts</h2>
      <Stack sx={{padding:'2vw'}}>
        {posts.map((e, i) => {
            return (
              <Card sx={{minWidth: 275, border: '2px 2px 2px 2px', borderColor: 'black', margin: '2vw'}}>
                <CardContent>
                  <Typography sx={{fontSize:14}} color ="text.secondary" gutterBottom>
                    {e.date}
                  </Typography>
                  <Typography variant="h4" component='div'sx={{textAlign:'left'}} color ="text.secondary" gutterBottom>
                    From: {getUsernameFromUserID(e.user_id)}
                  </Typography>
                  <Typography variant='h5'sx={{textAlign:'left'}} color ="text.secondary" gutterBottom>
                    Title: {e.title}
                  </Typography>
                  <Typography variant="body1" sx={{textAlign:'left'}}>
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

export default Home;
