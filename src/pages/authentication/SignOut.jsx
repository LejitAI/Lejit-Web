import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleSignOut = async () => {
            try {
                const response = await fetch('backend/api/auth/signout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    // Clear all authentication data from localStorage
                    localStorage.clear();
                    // Redirect to sign-in page
                    navigate('/signin');
                }
            } catch (error) {
                console.error('Sign out error:', error);
                // Still clear local storage and redirect even if the API call fails
                localStorage.clear();
                navigate('/signin');
            }
        };

        handleSignOut();
    }, [navigate]);

    return null; // This component doesn't render anything
};

export default SignOut;