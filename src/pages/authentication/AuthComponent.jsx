import { useState } from "react";
import { signInWithGoogle, logOut, auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthComponent = () => {
  const [user, loading, error] = useAuthState(auth);
  const [authError, setAuthError] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      setAuthError(null);
      await signInWithGoogle();
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      setAuthError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {user ? (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium">{user.displayName}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
        >
          <img
            src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Sign in with Google
        </button>
      )}

      {authError && (
        <div className="text-red-500 text-sm mt-2">{authError}</div>
      )}
    </div>
  );
};

export default AuthComponent;
