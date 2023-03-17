import { IconButton, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { dataContext } from '../Context/StateProvider';
import { Stack } from '@mui/system';

function Home() {
const context=useContext(dataContext);
const{downloadImage}=context;

const [allPosts, setAllPosts]=useState([]);
const [search, setSearch]=useState("");
const [result, setResult]=useState([]);
const [searchTimeout, setSearchTimeout]=useState(null);
const [display, setDisplay]=useState(allPosts);


const fetchPost= async ()=>{
  try{
    const response= await fetch("https://elloit-ai.onrender.com/api/v1/posts",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
      }
    })
    let photos=await response.json()
    setAllPosts(photos.data.reverse())
    
  }catch(error){
    console.log(error)
    alert(error)
  }
}

const handleSearch=(event)=>{
  setSearch(event.target.value)

    setTimeout(()=>{
      const SearchResults=allPosts.filter(
        (item)=>item.prompt.toLowerCase().includes(search.toLowerCase()))
        setResult(SearchResults);
      },500)
      
}

useEffect(() => {
    fetchPost();
  }, [])
  
const toPost=()=>(       //check if searched or not then set obj to display
  (search)?result:allPosts
)


  return (
    <Box>
    <Box display="flex" justifyContent="center"  >
      <Stack gap="5px" >
      <Typography  marginX="auto" position="sticky" variant='h3' color="#2874A6"   width="fit-content" mt="20px">The Wall
            </Typography>
      <TextField  sx={{width:"70vh"}} onChange={handleSearch} name="search" value={search}
           placeholder='Search...' variant="outlined" />
      </Stack>
    </Box>

    <Box sx={{bgcolor:"#F2F3F4", width: "auto", height:"fit-content", margin:"20px 20px" }}>
      <ImageList  cols={4} gap={8}  sx={{marginY:"20px", marginX:"10px"  }} >

        {toPost().map((item) => (
          <ImageListItem key={item.image} sx={{borderRadius:"10px", bgcolor:"#D4E6F1", marginY:"10px" , maxHeight:"80vh", maxWidth:"50vh"}} >
            <img
              src={item.image}
              srcSet={item.image}
              alt={item.prompt}
              loading="eager"
            />
            <Box textAlign="center" display="flex" gap="5px" margin="5px" >
              <IconButton onClick={()=>downloadImage(item._id,item.image)} >
                <FileDownloadOutlinedIcon sx={{marginY:"auto", color:"black" }} />
              </IconButton>
              <Typography>{item.prompt} </Typography>
            </Box>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>

    </Box>
  )
}

export default Home
