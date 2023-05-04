import React, { useEffect, useState } from 'react'
import { ReactComponent as SunIcon } from '../icons/sunIcon.svg'
import { ReactComponent as MoonIcon } from "../icons/moonIcon.svg"
import {useNavigate,useLocation} from 'react-router-dom'
import './DarkTheme.css'

const DarkTheme = () => {
    const [theme, setTheme] = useState('darktheme')
    const usenavigate = useNavigate()
    const location  =useLocation()
    const handaltheme = () => {
        if (theme === 'darktheme') {
            usenavigate(`/ligth`)
            setTheme('ligththeme')
        } else {
            usenavigate(`/dark`)
            setTheme('darktheme')
        }
    }
    useEffect(() => {
        if(location.pathname === '/dark'){
            setTheme('darktheme')
            // usenavigate(`/dark`)
        }else{
            // usenavigate(`/ligth`)
            setTheme('ligththeme')
        }
        document.body.className = theme
    }, [theme])
    return (
        <>
            <div className="dark_wrap">
                <div className="dark_main" onClick={handaltheme}>
                    {theme === 'darktheme' ? <SunIcon /> : <MoonIcon />}
                </div>
            </div>
        </>
    )
}

export default DarkTheme