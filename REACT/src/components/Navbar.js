import React, {useState} from 'react'
import './Navbar.css'
import Logo from '../assets/gaslogo.png'
import { FaBars, FaTimes } from 'react-icons/fa'
import {Link} from 'react-router-dom';

//Function that get's the address of where the data is.
//Also keeps code organized

function Navbar(){
    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)
    return(
        <div className='navbar'>
            <div className='logo'>
                <Link to='/'><img src={Logo} alt='logo' /></Link>
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <Link to='/' className='nav-item' >Home</Link>
                <Link to='/Quote' className='nav-item'>Quote</Link>
                <Link to='/QuoteHistory' className='nav-item'>Quote History</Link>
                <Link to='/ModifyAccount' className='nav-item'>Modify Account</Link>
                <Link to='/login' className='nav-item'>Login</Link>
            </ul>
            <div className='hamburger' onClick={handleClick}>
                {click ? (<FaTimes size={30} style={{ color: '#f8f8f8' }} />) : (<FaBars size={30} style={{ color: '#f8f8f8' }} />)}
            </div>
        </div>
    )
}





export default Navbar;