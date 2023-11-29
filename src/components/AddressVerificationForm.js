import React, { useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

const AddressVerificationForm = () => {
    const { user } = useAuthContext();
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);
        setEmptyFields([]);

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

        if (!user) {
            setError('Login required');
            return;
        }

        try {
            const response = await fetch('https://address-verifcation-api-fad6ad832469.herokuapp.com/api/addresses/compare', {
                method: 'POST',
                body: JSON.stringify({ streetAddress, city, state, zipCode }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Includes the input address in the result for comparison
                setResult({ ...data, inputAddress: { streetAddress, city, state, zipCode } });
            } else {
                setError(data.message || 'An error occurred');
            }
        } catch (err) {
            setError('Failed to connect to the server');
        }
    };

    return (
        <div className="address-verification">
            <form onSubmit={handleSubmit} className="create">
                <h3>Verify Address</h3>
                <label>Street Address:</label>
                <input 
                    type="text"
                    name="streetAddress"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className={emptyFields.includes('streetAddress') ? 'error' : ''}
                />

                <label>City:</label>
                <input 
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={emptyFields.includes('city') ? 'error' : ''}
                />

                <label>State:</label>
                <input 
                    type="text"
                    name="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={emptyFields.includes('state') ? 'error' : ''}
                />

                <label>Zip Code:</label>
                <input 
                    type="text"
                    name="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className={emptyFields.includes('zipCode') ? 'error' : ''}
                />

                <button type="submit">Verify Address</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {result && (
                <div className="verification-result">
                    {result.match ? (
                        <div className="result-content">
                            <h4>Match Type: {result.type}</h4>
                            {result.type === 'near' && result.address && (
                                <div className="address-comparison">
                                    <p><strong>Input Address:</strong> {`${streetAddress}, ${city}, ${state} ${zipCode}`}</p>
                                    <p><strong>Near Match Address:</strong> {`${result.address.streetAddress}, ${result.address.city}, ${result.address.state} ${result.address.zipCode}${result.address.zipPlus4 ? '-' + result.address.zipPlus4 : ''}`}</p>
                                </div>
                            )}
                            {result.type === 'exact' && (
                                <p><strong>Exact Match Address:</strong> {`${result.address.streetAddress}, ${result.address.city}, ${result.address.state} ${result.address.zipCode}${result.address.zipPlus4 ? '-' + result.address.zipPlus4 : ''}`}</p>
                            )}
                        </div>
                    ) : (
                        <p className="error-message">No matching address found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AddressVerificationForm;