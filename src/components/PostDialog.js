
import '../App.css';
import React from 'react';
import {  Dialog } from '@mui/material';
import { ColorButton, MyDialogContent, MyDialogActions, MyDialogTitle, MyDialogContentText, ContrastButton } from './CustomComponents';

const PostDialog = ({post, username}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <>
    <ContrastButton size='small' onClick ={handleOpen}>Read More</ContrastButton>
    <Dialog
    open={open}
    onClose={handleClose}
    scroll={'paper'}
    // sx={{width: '50vw', margin: '25vw'}}
    >
      <MyDialogTitle id={`dialog-title-${post.id}`}>{post.title}</MyDialogTitle>
      <MyDialogContent
        id={`dialog-content-${post.id}`}
        tabIndex={-1}

      >
        <MyDialogContentText
          id={`dialog-content-text-${post.id}`}
          tabIndex={-1}
        >
          From: {username}<br></br>
          {post.content}
        </MyDialogContentText>

      </MyDialogContent>
      <MyDialogActions>
        <ColorButton size='small' onClick={handleClose}>close</ColorButton>
      </MyDialogActions>
    </Dialog>    
    </>

  )
}
export default PostDialog;