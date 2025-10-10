import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useClerk,UserButton,useUser} from '@clerk/clerk-react'
import { Link } from "react-router-dom";

const Navbar = () =>{
    // const navigate = useNavigate()
    const {user} = useUser()
    const {openSignIn} = useClerk()

    return(
         <nav className="px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo / Brand */}
      <Link to="/" className="text-xl font-bold">
        PropertyDeller 🏠
      </Link>

      {/* Menu Links */}
     
      {/* Auth Buttons */}
      <div className="space-x-4">
       {
                user?<UserButton/>:(
           <button onClick={openSignIn}>Get started➡️</button>
                )
            }
      </div>
    </nav>
        // <div>
        //     <h1>PropertyDeller</h1>
        //     
        // </div>
    )
}

export default Navbar;