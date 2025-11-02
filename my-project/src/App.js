
import './App.css';
import { SignedIn, SignedOut, RedirectToSignIn, SignIn, UserProfile } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from './pages/Home';
import Layout from './components/Layout';
import UserProperties from './pages/properties/[id]/page';
import ChatBot from './components/Chatbot'
import Plan from './pages/Subscription';
import About from './pages/About';

function App() {
  return (
    
    <div>
      
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/ai' element={<Layout/>}></Route>
        <Route path='/dashboard/:id' element={<Dashboard/>}></Route>
        <Route path="/properties/:id" element={<UserProperties />} />
        <Route path='/chatbot' element={<ChatBot/>}></Route>
         <Route path='/subscription' element={<Plan/>}></Route>
          <Route path='/about' element={<About/>}></Route>

      </Routes>
      
</div>

  );
}

export default App;
