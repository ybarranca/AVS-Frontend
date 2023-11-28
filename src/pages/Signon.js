import { useState } from 'react'
import { useSignon } from '../hooks/useSignon'

const Signon = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signon, error, isLoading} = useSignon()

const handleSubmit = async (e) => {
    e.preventDefault()

    await signon(email, password)
}

    return (
        <form className="signon" onSubmit={handleSubmit}>
            <h3>Sign on</h3>

            <label>Email Address:</label>
            <input
                type ="Email"
                onChange = {(e) => setEmail(e.target.value)}
                value ={email}
            />
            <label>Password:</label>
            <input
                type ="password"
                onChange = {(e) => setPassword(e.target.value)}
                value ={password}
            />
            
            <button disabled={isLoading}>Sign on</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signon