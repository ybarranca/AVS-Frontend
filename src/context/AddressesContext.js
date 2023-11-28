import { createContext, useReducer } from 'react'

export const AddressesContext = createContext()

export const addressesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ADDRESSES':
            return {
                addresses: action.payload
            }
        case 'CREATE_ADDRESS':
            return {
                addresses: [action.payload, ...state.addresses]
            }
        case 'DELETE_ADDRESS':
            return {
                addresses: state.addresses.filter((w) => w._id !== action.payload._id)
            }
        case 'UPDATE_ADDRESS':
            return {
                addresses: state.addresses.map((address) => 
                    address._id === action.payload._id ? action.payload : address
                )
            };
        default:
            return state
    }
}

export const AddressesContextProvider = ({ children }) => {
 const [state, dispatch] = useReducer(addressesReducer, {
    addresses: null
 })


    return (
        <AddressesContext.Provider value={{...state, dispatch}}>
            { children }
        </AddressesContext.Provider>
    )
}