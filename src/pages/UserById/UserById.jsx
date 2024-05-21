import UserAvatar from "/src/assets/images/polzovatel.jpg"
import { Link } from "react-router-dom";

// MUI 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useState } from "react";
import { Tab } from "@mui/material";
import Tabs from '@mui/material/Tabs';


import userAvatar from "/src/assets/images/polzovatel.jpg";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};





import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { FollowerUser, GetPostByUser, getProfileById } from '../../api/Profile/profile'



function UserById() {
  
  const [ Follow , setFollow ] = useState ("Follow")
  
  let getPost = useSelector((store) => store.profile.postUser);
  
  // mui tabs
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const dispatch = useDispatch ()
    const {id} = useParams()
    const data = useSelector ( ( store ) => store.profile.userProfile)
    useEffect ( ( ) => {
        dispatch ( getProfileById (id))
        dispatch ( GetPostByUser ( id ))
    },[dispatch,id])
    console.log(data);
  return (
    <div className="overflow-hidden">
    
    <div className="flex ml-[24%] gap-[10%] pt-[4.4%]">
      <div>
        <img className="w-[200px] rounded-[500px] h-[200px]" 
         src={
            data.image == 0 ||
            data.image == null
              ? userAvatar
              : `${import.meta.env.VITE_APP_FILES_URL}${data.image}`
          } alt="avatar" />
      </div>
      <div className="mt-[-2%]">
        <div className="flex gap-[5%] items-center mb-[5%]">
          <h1 className="font-medium text-[120%]">
            {data.userName}
          </h1>
          <Button onClick={()=> dispatch ( FollowerUser ( id )) } size="small" sx={{background:"#EFEFEF", boxShadow:"0px 0px 0px black" , color:"black" , fontFamily:"inherit", paddingX:"25px" , borderRadius:"8px"}} variant="contained"> Follow 
            </Button>
            
          <Button size="small" sx={{background:"#EFEFEF", boxShadow:"0px 0px 0px black" , color:"black" , fontFamily:"inherit", paddingX:"25px" , borderRadius:"8px"}} variant="contained" onClick={handleOpen}>Send Message</Button>
          <h1 className= "w-[4%] cursor-pointer">
            •••
          </h1>       
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      
        </div>
        <div className="mb-[3%]">
          <ul className="flex gap-[6%]">
            <li className="flex">
              <h1 className="font-medium">
                {data.postCount}
              </h1>
              <h1 className="ml-[5px]">
                публикаций
              </h1>
            </li>
            <li className="flex">
            <h1 className="font-medium">
                {data.subscribersCount}
              </h1>
              <h1 className="ml-[5px]">
              подписчиков
              </h1>
            </li>
            <li className="flex">
            <h1 className="font-medium">
                {data.subscriptionsCount}
              </h1>
              <h1 className="ml-[5px]">
                подписок
              </h1>
            </li>
          </ul>
        </div>
        <h1 className="font-medium mb-[1.5%]">
            {data.fullName}
        </h1>
        <p className="w-[450px] text-[95%] mb-[3%]">
            {data.about}
        </p>
        <span className="text-[83%]">
        </span>
      </div>
    </div>
    
    <hr style={{display : data.postCount == 0 ? "none" : "block"}} className="border-gray-300 mt-[4%] w-[70%] m-auto"/>



    <div className="w-[60%] grid grid-cols-3 ml-[20%] gap-[10px] pt-[4.4%]">
    {getPost.map (( elem ) => {
      return (
        <div key={elem.id}>
          <img
          className="hover:opacity-80 w-[250px] h-[40vh] ease-in duration-100 cursor-pointer" src={
            elem.images == 0 || elem.images == null
            ? UserAvatar
            : `${import.meta.env.VITE_APP_FILES_URL}${elem.images}`
          }
          alt="avatar" />

        </div>
      )
    })}
    </div>
<h1 style={{display : data.postCount == 0 ? "block" : "none"}} className="text-center mt-[10%] text-[250%] text-gray-400">
  No Publick ☹
</h1>
    </div>
  )
}

export default UserById