import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAddressesContext } from "../hooks/useAddressesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const AddressUpdateForm = () => {
    const { id } = useParams(); // Get the address ID from URL params
    const { dispatch } = useAddressesContext();
    const { user } = useAuthContext();
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [successMessage, setSuccessMessage] = useState(''); // For displaying success message

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await fetch(`/api/addresses/${id}`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                const json = await response.json();

                if (response.ok) {
                    setStreetAddress(json.streetAddress);
                    setCity(json.city);
                    setState(json.state);
                    setZipCode(json.zipCode);
                } else {
                    setError(json.error);
                }
            } catch (err) {
                setError('Error fetching address');
            }
        };

        if (user) {
            fetchAddress();
        }
    }, [id, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        if (!user) {
            setError('Login required');
            return;
        }

        let fields = [];
        if (!streetAddress) fields.push('streetAddress');
        if (!city) fields.push('city');
        if (!state) fields.push('state');
        if (!zipCode) fields.push('zipCode');

        if (fields.length > 0) {
            setEmptyFields(fields);
            setError('Please fill in all fields');
            return;
        }

        try {
            const address = { streetAddress, city, state, zipCode };
            const response = await fetch(`/api/addresses/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(address),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                dispatch({ type: 'UPDATE_ADDRESS', payload: json });
                setEmptyFields([]);
                setSuccessMessage('Address updated successfully!');
            }
        } catch (err) {
            setError('Error updating address');
        }
    };

    return (
        <div>
            <h3>Update Address</h3>
            <form onSubmit={handleSubmit}>
                <label>Street Address:</label>
                <input 
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className={emptyFields.includes('streetAddress') ? 'error' : ''}
                />
                <label>City:</label>
                <input 
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={emptyFields.includes('city') ? 'error' : ''}
                />
                <label>State:</label>
                <input 
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={emptyFields.includes('state') ? 'error' : ''}
                />
                <label>Zip Code:</label>
                <input 
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className={emptyFields.includes('zipCode') ? 'error' : ''}
                />
                <button type="submit">Update Address</button>
                {error && <div className="error">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
            </form>
        </div>
    );
};

export default AddressUpdateForm;
