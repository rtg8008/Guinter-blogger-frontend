import '../App.css';
import React, { useEffect } from 'react';
import { TextField, Stack, Button, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_URL, ProfileContext } from './ProfileContext';
import bcrypt from 'bcryptjs';



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
      console.log(data)
    });
  },[])
  const signupHandler = () => {
    console.log(document.getElementById('username').value);
    const submittedUsername = document.getElementById('username').value;
    console.log(document.getElementById('password').value);
    const submittedPassword = document.getElementById('password').value;
    let validSignUp = true;
    let validSignUpIndex = null;
    members.forEach((e, index)=>{
      if(e.username === submittedUsername)
      {
        validSignUp = false;
        validSignUpIndex = index;
        console.log('valid login', e);
      }
    })
    if(!validSignUp)
    {
      console.log('login not successful')
    }else{
      let data = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
      }
      bcrypt.hash(data.password, 10, (err, hash) => {
        data.password = hash;
        console.log(data.password);
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
    <div className="App">
      {/* {names.map((e, i) => {
        return <p key = {e.id}>{e.first_name}</p>
      })} */}
      <Stack spacing={2}>
        <div>
          <Button sx={{textAlign: 'center'}} onClick={()=>{
            nav('/login')
          }}>Login</Button>
          <Button onClick={()=>{
            nav('/')
          }}>Home</Button>
        </div>
        <FormControl>
        <Stack>
          <h1>Sign Up</h1>
          <TextField id="first_name" label="First Name" variant="filled" />
          <TextField id="last_name" label="Last Name" variant="filled" />

          <TextField id="username" label="Username" variant="filled" />
          <TextField id="password" label="Password" variant="filled" />
          <Button onClick = {()=>{signupHandler()}}id="submit" label="Submit" variant="filled">Submit</Button>
        </Stack>
      </FormControl>
      </Stack>




    </div>
  );
}

export default SignUp;
