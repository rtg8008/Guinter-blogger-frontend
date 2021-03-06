import styled from "@emotion/styled";
import { Button, Card, DialogTitle, DialogActions, DialogContent, DialogContentText, Paper, TextField, Snackbar } from "@mui/material";
// import zIndex from "@mui/material/styles/zIndex";
import { useNavigate } from "react-router-dom";


const ColorButton = styled(Button)(({ theme }) => ({
  color: 'rgba(219, 239, 255, 0.95)',
  backgroundColor: '#0d0f13da',
  boxShadow: '5px',
  border: '1px solid',
  borderColor: 'rgba(219, 239, 255, 0.95)',
  '&:hover': {
    backgroundColor: 'rgba(219, 239, 255, 0.95)',
    color: '#0d0f13da',
    border: '1px solid',
    borderColor: '#0d0f13da',

  },
}));
const ContrastButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(219, 239, 255, 0.95)',
  color: '#0d0f13da',
  boxShadow: '5px',
  border: '1px solid',
  borderColor: '#0d0f13da',
  '&:hover': {

    color: 'rgba(219, 239, 255, 0.95)',
    backgroundColor: '#0d0f13da',
    border: '1px solid',
    borderColor: 'rgba(219, 239, 255, 0.95)',

  },
}));

const PostCard = styled(Card)(({ theme }) => ({
  color: 'rgba(219, 239, 255, 0.95)',
  backgroundColor: '#0d0f13da',
  boxShadow: '5px',
  padding: '1vw',

  // border: '1px solid',
  // borderColor: '#302f3f',

}));

const PostCardEdit = styled(Card)(({ theme }) => ({
  color: '#0d0f13da',
  padding: '1vw',
  backgroundColor: 'rgba(219, 239, 255, 0.95)',
  boxShadow: '5px',
  // border: '1px solid',
  // borderColor: '#302f3f',

}));
const MyPaper = styled(Paper)(({ theme }) => ({
  color: '#0d0f13da',
  backgroundColor: 'rgba(219, 239, 255, 0.95)',
  overflow: 'hidden',
  borderRadius: 4,
  padding: '1vw'

  // border: '1px solid',
  // borderColor: '#302f3f',

}));

const MyTextField = styled(TextField)(({
  color: '#0d0f13da',
  borderBottomColor: '#0d0f13da',
  '& label.Mui-focused': {
    borderBottomColor: '#0d0f13da',
    color: '#0d0f13da',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#0d0f13da',
    color: '#0d0f13da',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#0d0f13da',
    },
    '&:hover fieldset': {
      borderColor: '#0d0f13da',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0d0f13da',
    },
  },
}));
const MyDialogContent = styled(DialogContent)(({ theme }) => ({
  color: '#131925',
  padding: '1vw',
  fontSize: '14pt',
  backgroundColor: 'rgba(219, 239, 255, 0.95)',
  boxShadow: '5px',
  zIndex: '2000',

  // border: '1px solid',
  // borderColor: '#302f3f',

}));
const MyDialogTitle = styled(DialogTitle)(({ theme }) => ({
  color: '#131925',
  padding: '1vw',
  backgroundColor: 'rgba(219, 239, 255, 0.95)',
  boxShadow: '5px',
  fontSize: '28pt',
  zIndex: '2000',

  // border: '1px solid',
  // borderColor: '#302f3f',

}));
const MyDialogActions = styled(DialogActions)(({ theme }) => ({
  color: '#131925',
  padding: '1vw',
  fontSize: '14pt',
  zIndex: '2000',

  backgroundColor: 'rgba(219, 239, 255, 0.95)',
  boxShadow: '5px',
  // border: '1px solid',
  // borderColor: '#302f3f',

}));
const MyDialogContentText = styled(DialogContentText)(({ theme }) => ({
  color: '#131925',
  padding: '1vw',
  backgroundColor: 'rgba(219, 239, 255, 0.95)',
  // minWidth: '55vw',
  minHeight: '40vw',
  maxHeight: '50vw',
  boxShadow: '5px',
  fontSize: '14pt',
  zIndex: '2000',

  

  // border: '1px solid',
  // borderColor: '#302f3f',
}));
const MyHeaderPaper = styled(Paper)(({ theme }) => ({
  color: '#0d0f13da',
  backgroundColor: 'rgba(219, 239, 255, 0.95)',
  // overflow: 'hidden',
  borderRadius: 4,
  padding: '1vw',
  border: '2px 2px 2px 2px',
  borderColor: 'black',
  position:'fixed',
  minWidth: '70vw',
  maxHeight: '150px',
  top:'0vw',
  left: '10vw',
  right: '10vw',
  zIndex: '1000',
  
    // sx={{minWidth: 275, border: '2px 2px 2px 2px', borderColor: 'black', marginLeft: '10vw', marginRight: '10vw', marginBottom: '4vw', marginTop: '4vw', position: 'fixed'}}
  // border: '1px solid',
  // borderColor: '#302f3f',

}));


const Header = () => {
  const nav = useNavigate();
  return (
    <MyHeaderPaper elevation={10}>
      <h1>Guardian Post</h1>
      {/* <Stack direction='row' spacing={1} sx={{textAlign: 'center', alignContent: 'center'}}> */}
        <ColorButton size='small' variant='contained' sx={{margin: '0.5vw'}} onClick={()=>{
        nav('/login')
        }}>Login</ColorButton>
        <ColorButton size='small' variant='contained' sx={{margin: '0.5vw'}} onClick={()=>{
          nav('/')
        }}>Home</ColorButton>
        <ColorButton size='small' variant='contained' sx={{margin: '0.5vw'}} onClick={()=>{
          nav('/signup')
        }}>Sign Up</ColorButton>
      {/* </Stack> */}

    </MyHeaderPaper>  
  )


}

const MySnackBar = styled(Snackbar)(() => ({
  zIndex: 3000,

}));
export {ColorButton, MySnackBar, PostCard, PostCardEdit, MyPaper, MyTextField, MyDialogContent, MyDialogActions, MyDialogTitle, MyDialogContentText, ContrastButton, Header};