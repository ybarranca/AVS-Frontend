import { useAuthContext } from "./useAuthContext"
import { useAddressesContext } from "./useAddressesContext"
export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: addressesDispatch } = useAddressesContext()

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user')
    
        // dispatch logout action
        dispatch({type:'LOGOUT'})
        addressesDispatch({type: 'SET_ADDRESSES', payload: null})
    }
   return { logout }
}