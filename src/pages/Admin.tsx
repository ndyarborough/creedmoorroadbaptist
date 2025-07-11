import { useState } from 'react';
import Button from '../shared/semantic/Button';
import Container from '../shared/semantic/Container';
import Heading from '../shared/semantic/Heading';
import Flex from '../shared/semantic/Flex';
import { auth } from '../lib/firebase';
import AddEventForm from '../components/AddEventForm';
import EventList from '../components/EventList';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import type { Event } from '../shared/types';

const Admin = () => {
  const navigate = useNavigate();
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleEditEvent = (event: Event) => {
    setEventToEdit(event);
  };

  const handleFormSubmit = () => {
    setEventToEdit(null); // Reset form after submission
  };

  return (
    <Container className="py-8">
      <Heading as="h1" variant="page">Admin Dashboard</Heading>
      <p>Welcome to the admin dashboard.</p>

      <Flex direction="row" gap={8} className="max-w-[90%] mx-auto mt-8">
        <div className="mt-8">
          <AddEventForm eventToEdit={eventToEdit} onFormSubmit={handleFormSubmit} />
        </div>
        <EventList onEditEvent={handleEditEvent} />
      </Flex>

      <Button onClick={handleLogout} className="mt-8">
        Logout
      </Button>
    </Container>
  );
};

export default Admin;