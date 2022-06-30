import '../App.css';
import React, { useEffect, useState } from 'react';
import { TextField, Stack, Button, FormControl, Card, Paper, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_URL, ProfileContext } from './ProfileContext';
import bcrypt from 'bcryptjs';
import { ColorButton, MyPaper, Header, MyTextField } from './CustomComponents';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



function SignUp() {
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
      // console.log(data)
    });
  },[])

  return (
    <div className="App">
      {/* {names.map((e, i) => {
        return <p key = {e.id}>{e.first_name}</p>
      })} */}
      <Header></Header>
      <Stack spacing={2}>

        <Box>
          <MyPaper sx={{position:'fixed', top:'190px', left:'20vw', right:'20vw'}} elevation={10}>
            <FormControl>
              <Stack spacing={1}>
                <h1>Sign Up</h1>
                <MyTextField id="first_name" label="First Name"  />
                <MyTextField id="last_name" label="Last Name"  />
                <MyTextField id="username" label="Username"  />
                <MyTextField id="password" type={'password'} label="Password"  />
                <SignUpButton members={members} setMembers={setMembers} setProfile={setProfile} ></SignUpButton>
              </Stack>
            </FormControl>
          </MyPaper>
        </Box>


      </Stack>


      <MyPaper sx={{position:'fixed', bottom:'0vw'}}>
        <p>
          This website is created as a requirement for the USSF Z-Prefix "C.R.U.D application test" and is not officially sponsored by the USSF, Department of Defence, or U.S Government.
          No promise of security or continuity of profiles or posts is provided to users of this cite. No moderation of content posted on this cite is provided.
        </p>
        <a href="https://iconscout.com/icons/g" target="_blank">G Icon</a> by <a href="https://iconscout.com/contributors/twitter-inc" target="_blank">Twitter Emoji</a>
      </MyPaper>

    </div>
  );
}

const SignUpButton = ({members, setMembers, setProfile}) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  }
  const signupHandler = () => {
    // console.log(document.getElementById('username').value);
    const submittedUsername = document.getElementById('username').value;
    // console.log(document.getElementById('password').value);
    const submittedPassword = document.getElementById('password').value;
    let validSignUp = true;
    let validSignUpIndex = null;
    members.forEach((e, index)=>{
      if(e.username === submittedUsername)
      {
        validSignUp = false;
        validSignUpIndex = index;
        // console.log('valid login', e);
      }
    })
    if(!validSignUp)
    {
      setOpen(true);
      // console.log('login not successful')
    }else{
      let data = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
      }
      bcrypt.hash(data.password, 10, (err, hash) => {
        data.password = hash;
        // console.log(data.password);
        const init = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        }
        fetch(`${API_URL}members`, init)
        .then(res => res.json())
        .then(async (data) => {
          setMembers(data)
          await setProfile({id: data[data.length-1].id, username: data[data.length-1].username})
          nav('/posts')
  
        })      
      
      })
    }  
  }

  return (
    <>
      <ColorButton onClick = {()=>{signupHandler()}}id="submit" label="Submit">Create Account</ColorButton>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{width: '100%'}} >
          Sign Up Failed! Please try another Username
        </Alert>
      </Snackbar>
    </>
  )
}

export default SignUp;
