import TopBar from "./Components/TopBar";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./Components/Home";
import Create from "./Components/Create";
import { CssBaseline } from "@mui/material";


function App() {
  return (
    <>

<Router>
  <CssBaseline/>
  <TopBar/>
      <Routes>       
           <Route path="/"  element={<Home/>}/>   
           <Route path="/create"  element={<Create/>}/>                             
      </Routes> 
    </Router>
    </>
  );
}

export default App;
