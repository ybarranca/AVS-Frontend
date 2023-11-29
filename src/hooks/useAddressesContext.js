import { AddressesContext } from "../context/AddressesContext"
import { useContext } from "react"

export const useAddressesContext = () => {
    const context = useContext(AddressesContext)

    if (!context) {
        throw Error('useAddressesContext must be used inside an AddressesContextProvider')
    }

    return context
}