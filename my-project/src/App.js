
import './App.css';
import { SignedIn, SignedOut, RedirectToSignIn, SignIn } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Home from './pages/Home';
import Layout from './components/Layout';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/h' element={<Home/>}></Route>
        <Route path='/ai' element={<Layout/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/signIn' element={<SignInPage/>}></Route>
        <Route path='signUp' element={<SignUpPage/>}/>

      </Routes>
</div>
  );
}

export default App;
