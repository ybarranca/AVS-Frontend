import { useEffect }from 'react'
import { useAddressesContext } from "../hooks/useAddressesContext"
import { useAuthContext } from '../hooks/useAuthContext'

// components
import AddressDetails from '../components/AddressDetails'
import AddressForm from '../components/AddressForm'


const Home = () => {
    const { addresses, dispatch } = useAddressesContext()
    const {user} = useAuthContext()

    useEffect(() => {
     const fetchAddresses = async () => {
        const response = await fetch('/api/addresses', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'SET_ADDRESSES', payload: json})
        }
     }

     if (user) {
        fetchAddresses()
     }
    }, [dispatch, user])

    return(
        <div className="home">
            <div className="addresses">
                {addresses && addresses.map((address) => (
                    <AddressDetails key={address._id} address={address} />
                ))}
            </div>
            <AddressForm />
        </div>
    )
}

export default Home