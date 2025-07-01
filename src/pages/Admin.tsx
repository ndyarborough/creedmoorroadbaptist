import Button from '../shared/semantic/Button';
import Container from '../shared/semantic/Container';
import Heading from '../shared/semantic/Heading';
import { auth } from '../lib/firebase';
import AddEventForm from '../components/AddEventForm';
import EventList from '../components/EventList';
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
      <div className="mt-8">
        <Heading as="h2" variant="section">
          Add New Event
        </Heading>
        <AddEventForm />
      </div>
      <EventList />
      <Button onClick={handleLogout} className="mt-8">
        Logout
      </Button>
    </Container>
  );
};

export default Admin;
