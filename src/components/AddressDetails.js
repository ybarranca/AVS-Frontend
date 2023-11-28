import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddressesContext } from "../hooks/useAddressesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const AddressDetails = ({ address }) => {
    const { dispatch } = useAddressesContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleDeleteClick = async () => {
        if (!user) {
            return;
        }
        const response = await fetch('https://address-verifcation-api-fad6ad832469.herokuapp.com/api/addresses/' + address._id, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_ADDRESS', payload: json });
        }
    };

    const handleUpdateClick = () => {
        navigate(`https://address-verifcation-api-fad6ad832469.herokuapp.com/update-address/${address._id}`);
    };


    return(
        <div className="address-details">
            <h4>{address.streetAddress}</h4>
            <p><strong>City: </strong>{address.city}</p>
            <p><strong>State: </strong>{address.state}</p>
            <p><strong>Zip Code: </strong>{address.zipCode}</p>
            {address.zipPlus4 && <p><strong>Zip+4: </strong>{address.zipPlus4}</p>}
            <p>{formatDistanceToNow(new Date(address.createdAt), { addSuffix: true})}</p>
             <div className="address-actions">
                <button onClick={handleDeleteClick} className="address-action-btn">Delete</button>
                <button onClick={handleUpdateClick} className="address-action-btn">Update</button>
            </div>
        </div>
    )
}

export default AddressDetails