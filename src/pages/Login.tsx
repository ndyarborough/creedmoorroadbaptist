import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import  Container  from '../shared/semantic/Container';
import  Input  from '../shared/semantic/Input';
import  Button  from '../shared/semantic/Button';
import  Heading  from '../shared/semantic/Heading';
import  Flex  from '../shared/semantic/Flex';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      setError('Failed to log in');
      console.error(err);
    }
  };

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
          <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <Heading as="h2" variant="content" className="mb-4 text-center">Admin Login</Heading>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            <div className="mb-4">
              <Input
                label="Email"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <Input
                label="Password"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Flex items="center" justify="between">
              <Button type="submit">
                Sign In
              </Button>
            </Flex>
          </form>
          <Button onClick={handleGoogleSignIn} className="w-full mt-4">
            Sign In with Google
          </Button>
        </div>
      </Flex>
    </Container>
  );
};

export default Login;
