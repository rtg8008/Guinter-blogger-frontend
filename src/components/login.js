import '../App.css';
import React, { useState } from 'react';
import { Stack, FormControl, Box  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from './ProfileContext';
import {API_URL} from './ProfileContext';
import bcrypt from 'bcryptjs';
import {ColorButton, MySnackBar, MyTextField, Header, MyPaper} from './CustomComponents'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
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


  return (
    <div className="App">
      {/* {names.map((e, i) => {
        return <p key = {e.id}>{e.first_name}</p>
      })} */}
      <Stack spacing={2}>
      <Header></Header>
        <Box>
          <MyPaper sx={{position:'fixed', top:'190px', left:'20vw', right:'20vw'}} elevation={10}>
            <FormControl>
              <Stack spacing={1}>
                <h1>Login</h1>
                <MyTextField id="username" label="Username" />
                <MyTextField id="password" type="password" label="Password"  />
                <LoginButton members={members} setMembers={setMembers} setProfile={setProfile} />
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

const LoginButton = ({members, setMembers, setProfile}) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  }
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
          setOpen(true);
          // console.log('login not successful')
        }
      })

    })
  }

  return (
    <>
      <ColorButton onClick = {()=>{loginHandler()}}id="submit" label="Submit">Login</ColorButton>
      <MySnackBar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{width: '100%'}} >
          Login Failed! Please enter the correct Username and Password
        </Alert>
      </MySnackBar>
    </>
  )
}


export default Login;
