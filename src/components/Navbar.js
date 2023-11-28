import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <header>
            <div className="container">
                <div className="nav-left">
                    <Link to="/"><h1>Address Verification System</h1></Link>
                </div>
                <div className="nav-center">
                    <Link to="/address-verification" className="nav-link">Verify Address</Link>
                </div>
                <nav >
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link  to="/signon" className='user-functions'>Sign On</Link>
                            <Link to="/signup" className='user-functions'>Sign Up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;