import { Button, Input, TextField, Typography } from '@mui/material'
import {  Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { dataContext } from '../Context/StateProvider';
import Loading from '../Loading';


function Create() {
const context=useContext(dataContext);
const{randomPromt}=context;
const navigate=  useNavigate()


const [formInfo, setFormInfo]=useState({
    promt:"",
    image:""
})
const [generatingImg, setgeneratingImg]=useState(false)



const handleSurpriseMe=()=>{
    setFormInfo({promt:randomPromt()})
}

const handleOnChange=(event)=>{
    setFormInfo({...formInfo,[event.target.name]:event.target.value})
}


const handleGenerate= async()=>{
    if(formInfo.promt){
        try{
            setgeneratingImg(true);
            const response= await fetch("https://elloit-ai.onrender.com/api/v1/elliot",{
                method:"POST",
                headers:{
                            "Content-Type":"application/json",
                        },
                body: JSON.stringify({prompt:formInfo.promt})
            })
            const data=await response.json()
            setFormInfo({...formInfo,image:`data:image/jpeg;base64,${data.photo}`})
        }catch(error){
            console.log(error)
            alert(error)
        }finally{
            setgeneratingImg(false);
        }
    }else{
        alert("please Enter the promt")
    }
}
 
const handlePost= async()=>{
    if(formInfo.promt && formInfo.image ){
        try{
            setgeneratingImg(true);
            const response= await fetch("https://elloit-ai.onrender.com/api/v1/posts",{
                method:"POST",
                headers:{
                            "Content-Type":"application/json",
                        },
                body: JSON.stringify({prompt:formInfo.promt,image:formInfo.image})
            })
            await response.json()
            navigate("/");
        }catch(error){
            console.log(error)
            alert(error)
        }finally{
            setgeneratingImg(false);
        }
    }else{
        alert("Some Error occured while posting")
    }
}

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" marginTop="20px">

        <Box textAlign="center" display="flex" flexDirection="column" gap="5px" >
            <Typography variant="h4" > Put your Imagination into Reality </Typography>
            <Typography variant="h6" > We leverage the power of AI to generate an  awesome looking image for you</Typography>
        </Box>
    
        <Box display="flex" marginX="auto"    marginTop="20px"  width="50%" flexDirection="column">
            <TextField  onChange={handleOnChange} name="promt" value={formInfo.promt}
                width="30%" placeholder='Write down your thoughts...' variant="outlined" />

            <Box sx={{display:"flex", justifyContent:"space-around",gap:"10px" ,marginTop:"5px" , marginX:"auto"}}>
                <Button variant="contained"  onClick={handleSurpriseMe}
                    sx={{width:"fit-content", bgcolor:"#85929E" }} >
                    Surprise ME!!!</Button>
                <Button variant="contained"  onClick={handleGenerate}
                        sx={{width:"fit-content", bgcolor:"#45B39D" }} >
                    Generate</Button>
            </Box>

        </Box>

        <Box display="flex" justifyContent="center" my="20px" mx="auto"
        width="300px" height="300px"   >
            {generatingImg?(<Loading/>) :
            (<img width="300px" height="300px" src={formInfo.image}  alt="Click on generate to create an image." ></img>)
            }
            
        </Box>
         
         {formInfo.image?(<Box display="flex" marginX="auto" gap="5px" flexDirection="column">
            <Typography color="grey" >Post the image on The Wall</Typography>
            <Button variant="contained"  onClick={handlePost}
                    sx={{width:"fit-content", bgcolor:"#2980B9", marginX:"auto" }} >
                    POST</Button>
        </Box>):null}
    

    </Box>
  )
  }

export default Create
