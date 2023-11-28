import { useState } from "react"
import { useAddressesContext } from "../hooks/useAddressesContext"
import { useAuthContext } from "../hooks/useAuthContext"

const AddressForm = () => {
    const { dispatch } = useAddressesContext()
    const { user } = useAuthContext()

    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('Login required')
            return
        }

        const address = { streetAddress, city, state, zipCode }

        const response = await fetch('/api/addresses', {
            method: 'POST',
            body: JSON.stringify(address),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(Array.isArray(json.emptyFields) ? json.emptyFields : []);
        }
        if (response.ok) {
            setStreetAddress('');
            setCity('');
            setState('');
            setZipCode('');
            setError(null)
            setEmptyFields([])
            console.log('New address added', json)
            dispatch({type:'CREATE_ADDRESS', payload: json})
        }
    }
    return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Address</h3>

        <label>Street Address:</label>
        <input 
            type="text"
            onChange={(e) => setStreetAddress(e.target.value)}
            value={streetAddress}
            className={emptyFields.includes('streetAddress') ? 'error' : ''}
        />

        <label>City:</label>
        <input 
            type="text"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            className={emptyFields.includes('city') ? 'error' : ''}
        />

        <label>State:</label>
        <input 
            type="text"
            onChange={(e) => setState(e.target.value)}
            value={state}
            className={emptyFields.includes('state') ? 'error' : ''}
        />

        <label>Zip Code:</label>
        <input 
            type="text"
            onChange={(e) => setZipCode(e.target.value)}
            value={zipCode}
            className={emptyFields.includes('zipCode') ? 'error' : ''}
        />

        <button>Add Address</button>
        {error && <div className="error">{error}</div>}
    </form>
    )
}

export default AddressForm