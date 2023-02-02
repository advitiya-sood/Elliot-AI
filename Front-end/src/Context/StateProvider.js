import {React, createContext } from 'react';
import { surpriseMePrompts } from '../SurpriseMe';
import FileSaver from "file-saver";


export const dataContext= createContext();

function StateProvider(props) {

const randomPromt=()=>{
    const randomIndex=Math.floor(Math.random()*surpriseMePrompts.length);
    const promtRandom= surpriseMePrompts[randomIndex]
    return promtRandom
}

const downloadImage=(_id, image)=>{
  console.log("download image runs")
  FileSaver.saveAs(image,`download-${_id}.jpg`)
}



  return (
    <dataContext.Provider value={{randomPromt,downloadImage}} >
        {props.children}
    </dataContext.Provider>
  )
}

export default StateProvider

