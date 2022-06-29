import '../App.css';
import React, { useEffect } from 'react';
import { TextField, Stack, Button, FormControl, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from './ProfileContext';
import {API_URL} from './ProfileContext';
import bcrypt from 'bcryptjs';
import {ColorButton, ColoredPaper, MyTextField} from './CustomComponents'

function Login() {
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

  const loginHandler = () =>{
    // console.log(document.getElementById('username').value);
    const submittedUsername = document.getElementById('username').value;
    // console.log(document.getElementById('password').value);
    const submittedPassword = document.getElementById('password').value;
    let validLogin = false;
    let validLoginIndex = null;
    

    members.forEach(async (e, index)=>{
      
      await bcrypt.compare(submittedPassword, e.password, async (err, res) => {
        if (e.username === submittedUsername && res)
        {
          validLogin = true;
          validLoginIndex = index;
          // console.log('valid login', e);
          // console.log('before setting context: ', profile);
          await setProfile({id: e.id, username: e.username})
          // console.log('after setting context', profile)
          nav('/posts')
        }
        else{
          // console.log('login not successful')
        }
      })

    })
  }

  return (
    <div className="App">
      {/* {names.map((e, i) => {
        return <p key = {e.id}>{e.first_name}</p>
      })} */}
      <Stack spacing={2}>
        <div>
          <ColorButton sx={{margin: '0.5vw'}} onClick={()=>{
            nav('/signup')
          }}>Sign Up</ColorButton>
          <ColorButton sx={{margin: '0.5vw'}} onClick={()=>{
            nav('/')
          }}>Home</ColorButton>
        </div>
        <Box>
          <ColoredPaper sx={{margin: '10vw'}} elevation={10}>
            <FormControl>
              <Stack spacing={1}>
                <h1>Login</h1>
                <MyTextField id="username" label="Username" />
                <MyTextField id="password" type="password" label="Password"  />
                <Button onClick={()=>{loginHandler()}} id="submit" label="Submit" variant="filled">Submit</Button>
              </Stack>        
            </FormControl>
          </ColoredPaper>
        </Box>

      </Stack>




    </div>
  );
}

export default Login;
