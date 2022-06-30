import '../App.css';
import React, { useEffect } from 'react';
import { TextField, Stack, Button, CardContent, Typography, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import { API_URL, ProfileContext } from './ProfileContext';
import PostDialog from './PostDialog';
import { ColorButton, PostCard, ColoredPaper, Header } from './CustomComponents';

function Home() {
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
    fetch(`${API_URL}posts`)
    .then(res => res.json())
    .then (data => {
      // console.log(data);
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
      <Header></Header>
      <ColoredPaper sx={{minWidth: 275, border: '2px 2px 2px 2px', borderColor: 'black', marginLeft: '12vw', marginRight: '12vw', marginBottom: '1vw', marginTop: '190px'}} elevation={10}>
        <h2>All Posts</h2>
      </ColoredPaper>      

      <Stack sx={{padding:'2vw'}}>
        {posts.slice(0).reverse().map((e, i) => {
            return (
              <PostCard key={i} sx={{minWidth: 275, border: '2px 2px 2px 2px', borderColor: 'black', margin: '2vw'}}>
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
