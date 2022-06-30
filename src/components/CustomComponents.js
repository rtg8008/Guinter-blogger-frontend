import styled from "@emotion/styled";
import { Button, Card, Paper, TextField } from "@mui/material";


const ColorButton = styled(Button)(({ theme }) => ({
  color: 'rgb(191, 225, 255)',
  backgroundColor: '#282c34',
  boxShadow: '5px',
  // border: '1px solid',
  // borderColor: '#302f3f',
  '&:hover': {
    backgroundColor: 'rgb(191, 225, 255)',
    color: '#282c34',
    // border: '1px solid',
    // borderColor: '#282c34',

  },
}));

const PostCard = styled(Card)(({ theme }) => ({
  color: 'rgb(191, 225, 255)',
  backgroundColor: '#282c34',
  boxShadow: '5px',
  padding: '1vw',

  // border: '1px solid',
  // borderColor: '#302f3f',

}));

const PostCardEdit = styled(Card)(({ theme }) => ({
  color: '#282c34',
  padding: '1vw',
  backgroundColor: 'rgb(191, 225, 255)',
  boxShadow: '5px',
  // border: '1px solid',
  // borderColor: '#302f3f',

}));
const ColoredPaper = styled(Paper)(({ theme }) => ({
  color: '#282c34',
  backgroundColor: 'rgb(191, 225, 255)',
  overflow: 'hidden',
  borderRadius: 4,
  padding: '1vw'

  // border: '1px solid',
  // borderColor: '#302f3f',

}));

const MyTextField = styled(TextField)(({
  color: '#282c34',
  borderBottomColor: '#282c34',
  '& label.Mui-focused': {
    borderBottomColor: '#282c34',
    color: '#282c34',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#282c34',
    color: '#282c34',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#282c34',
    },
    '&:hover fieldset': {
      borderColor: '#282c34',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#282c34',
    },
  },
}));

export {ColorButton, PostCard, PostCardEdit, ColoredPaper, MyTextField};