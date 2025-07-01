import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import  Container  from '../shared/semantic/Container';
import  Button  from '../shared/semantic/Button';
import  Heading  from '../shared/semantic/Heading';
import  Flex  from '../shared/semantic/Flex';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/admin');
    } catch (err) {
      setError('Failed to sign in with Google');
      console.error(err);
    }
  };

  return (
    <Container>
      <Flex justify="center" items="center" className="h-screen">
        <div className="w-full max-w-xs">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <Heading as="h2" variant="content" className="mb-4 text-center">Admin Login</Heading>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            <Button onClick={handleGoogleSignIn} className="w-full mt-4">
              Sign In with Google
            </Button>
          </div>
        </div>
      </Flex>
    </Container>
  );
};

export default Login;
