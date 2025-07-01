import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useEffect, useState } from 'react';

const PrivateRoute = () => {
  const { currentUser, loading } = useAuth();
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkWhitelist = async () => {
      if (!currentUser || !currentUser.email) {
        setIsWhitelisted(false);
        setIsChecking(false);
        return;
      }
      const whitelistCollection = collection(db, 'whitelist');
      const whitelistSnapshot = await getDocs(whitelistCollection);
      const whitelistedEmails = whitelistSnapshot.docs.map(doc => doc.id.toLowerCase());
      const isAuthorized = whitelistedEmails.includes(currentUser.email.toLowerCase());
      setIsWhitelisted(isAuthorized);
      setIsChecking(false);
    };

    if (!loading) {
      checkWhitelist();
    }
  }, [currentUser, loading]);

  if (loading || isChecking) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return currentUser && isWhitelisted ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
