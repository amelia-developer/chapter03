import { createContext, useState } from "react";

// context생성
export const ThemaContext = createContext(null) // 초기값으로 null을 설정해줌

export const ThemaProvider = ({children}) => {
    const [isDark, setIsDark] = useState(false)
    const [isThemaName, setIsThemaName] = useState('white')
    
    return (
        <ThemaContext.Provider value={{isDark, setIsDark, isThemaName, setIsThemaName}}>
            {children}
        </ThemaContext.Provider>
    )
}

