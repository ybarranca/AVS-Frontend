import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressVerificationForm from '../components/AddressVerificationForm';
import { useAuthContext } from '../hooks/useAuthContext';

const AddressVerificationPage = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    // Redirect to sign-on page if not authenticated
    useEffect(() => {
        if (!user) {
            navigate('/signon');
        }
    }, [user, navigate]);

    // Render the form only if the user is authenticated
    return (
        <div>
            {user && (
                <>
                    <AddressVerificationForm />
                </>
            )}
        </div>
    );
};

export default AddressVerificationPage;
