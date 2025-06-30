import  Button  from '../shared/semantic/Button';
import  Container  from '../shared/semantic/Container';
import  Heading  from '../shared/semantic/Heading';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <Container>
      <Heading as="h1" variant="page">Admin Dashboard</Heading>
      <p>Welcome to the admin dashboard.</p>
      <Button onClick={handleLogout} className="mt-4">
        Logout
      </Button>
    </Container>
  );
};

export default Admin;
