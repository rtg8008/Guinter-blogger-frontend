import styled from "@emotion/styled";
import { Button, Card, Paper, TextField } from "@mui/material";


const ColorButton = styled(Button)(({ theme }) => ({
  color: 'rgba(191, 225, 255, 0.95)',
  backgroundColor: '#282c34da',
  boxShadow: '5px',
  // border: '1px solid',
  // borderColor: '#302f3f',
  '&:hover': {
    backgroundColor: 'rgba(191, 225, 255, 0.95)',
    color: '#282c34da',
    // border: '1px solid',
    // borderColor: '#282c34',

  },
}));

const PostCard = styled(Card)(({ theme }) => ({
  color: 'rgba(191, 225, 255, 0.95)',
  backgroundColor: '#282c34da',
  boxShadow: '5px',
  padding: '1vw',

  // border: '1px solid',
  // borderColor: '#302f3f',

}));

const PostCardEdit = styled(Card)(({ theme }) => ({
  color: '#282c34da',
  padding: '1vw',
  backgroundColor: 'rgba(191, 225, 255, 0.95)',
  boxShadow: '5px',
  // border: '1px solid',
  // borderColor: '#302f3f',

}));
const ColoredPaper = styled(Paper)(({ theme }) => ({
  color: '#282c34da',
  backgroundColor: 'rgba(191, 225, 255, 0.95)',
  overflow: 'hidden',
  borderRadius: 4,
  padding: '1vw'

  // border: '1px solid',
  // borderColor: '#302f3f',

}));

const MyTextField = styled(TextField)(({
  color: '#282c34da',
  borderBottomColor: '#282c34da',
  '& label.Mui-focused': {
    borderBottomColor: '#282c34da',
    color: '#282c34da',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#282c34da',
    color: '#282c34da',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#282c34da',
    },
    '&:hover fieldset': {
      borderColor: '#282c34da',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#282c34da',
    },
  },
}));

export {ColorButton, PostCard, PostCardEdit, ColoredPaper, MyTextField};