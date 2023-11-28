import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignon = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signon = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signon', {
            method: 'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context
            dispatch({type:'LOGIN', payload: json})
            
            setIsLoading(false)
        }
    }
    
    return { signon, isLoading, error }
}