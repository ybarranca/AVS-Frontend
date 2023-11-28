import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddressUpdateForm from '../components/AddressUpdateForm';
import { useAuthContext } from '../hooks/useAuthContext';

const AddressUpdatePage = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { id } = useParams(); // Get the address ID from URL params

    // Redirect to sign-on page if not authenticated
    useEffect(() => {
        if (!user) {
            navigate('/signon');
        }
    }, [user, navigate]);

    // Render the update form only if the user is authenticated
    return (
        <div>
            {user && (
                <>
                    <AddressUpdateForm id={id} />
                </>
            )}
        </div>
    );
};

export default AddressUpdatePage;
