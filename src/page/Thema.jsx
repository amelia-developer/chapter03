import React, {useContext} from 'react'
import { ThemaContext } from '../context/ThemaContext'

const Thema = () =>  {
    const {isDark, setIsDark, isThemaName, setIsThemaName} = useContext(ThemaContext)

    const onSkinToggle = () => {
        const isNextThema = !isDark
        setIsDark(!isDark)        
        setIsThemaName(isNextThema ? 'dark' : 'white')
    }

    return (
        <>
            <button type='button' onClick={onSkinToggle} style={{backgroundColor:isDark ? "black" : "#e7e7e7", color:isDark ? "#fff" : "#000"}} 
            className='btn-thema-toggle'>{isThemaName}Mode</button>
        </>
    )
}

export default Thema
