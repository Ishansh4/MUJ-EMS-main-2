
import First from './components/First';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Assign from "./components/Assign";
import Faculty from "./components/Faculty";




import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path='/admin' element={<Admin />}/>
          <Route path='/first' element={<First />}/>
          <Route path='/home' element={<Home />}/>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/assign" element={<Assign />}/>
          <Route path="/faculty" element={<Faculty />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
