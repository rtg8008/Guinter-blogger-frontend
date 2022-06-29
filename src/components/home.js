import '../App.css';
import React, { useEffect } from 'react';
import { TextField, Stack, Button, CardContent, Typography, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import { API_URL, ProfileContext } from './ProfileContext';
import PostDialog from './PostDialog';
import { ColorButton, PostCard } from './CustomComponents';

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
  const reducePostLength = (post) =>{
    if (post.length > 100){
      return post.substring(0, 100) + '...'
    }
    return post;
  }

  return (
    <div className="App" >
      {/* {names.map((e, i) => {
        return <p key = {e.id}>{e.first_name}</p>
      })} */}
      <ColorButton variant='contained' sx={{margin: '0.5vw'}} onClick={()=>{
        nav('/login')
      }}>Login</ColorButton>
      <ColorButton variant='contained' sx={{margin: '0.5vw'}} onClick={()=>{
        nav('/signup')
      }}>Sign Up</ColorButton>
      <h1>Guinter Blog</h1>
      <h2>All Posts</h2>
      <Stack sx={{padding:'2vw'}}>
        {posts.map((e, i) => {
            return (
              <PostCard sx={{minWidth: 275, border: '2px 2px 2px 2px', borderColor: 'black', margin: '2vw'}}>
                <CardContent>
                  <Typography sx={{fontSize:14}} gutterBottom>
                    {e.date}
                  </Typography>
                  <Typography variant="h4" component='div'sx={{textAlign:'left'}} gutterBottom>
                    From: {getUsernameFromUserID(e.user_id)}
                  </Typography>
                  <Typography variant='h5'sx={{textAlign:'left'}} gutterBottom>
                    Title: {e.title}
                  </Typography>
                  <Typography variant="body1" sx={{textAlign:'left'}}>
                    {reducePostLength(e.content)}
                  </Typography>
                  <CardActions>
                    <PostDialog post={e} username={getUsernameFromUserID(e.user_id)}></PostDialog>
                  </CardActions>
                </CardContent>
              </PostCard>
              )
        })}
      </Stack>
      <a href="https://iconscout.com/icons/g" target="_blank">G Icon</a> by <a href="https://iconscout.com/contributors/twitter-inc" target="_blank">Twitter Emoji</a>
    </div>
  );
}

export default Home;
