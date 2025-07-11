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
    <div className="min-h-screen bg-bg-primary">
      <Container className="py-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <Heading as="h1" variant="content" className="text-text-primary">
                Admin Dashboard
              </Heading>
              <p className="text-text-secondary mt-1">
                Manage your church events and activities
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="px-4 py-2">
              Logout
            </Button>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[calc(100vh-16rem)]">
            {/* Form Section - Takes 35% of width on xl screens */}
            <div className="xl:col-span-4 xl:h-full xl:overflow-y-auto">
              <div className="xl:pr-2">
                <AddEventForm eventToEdit={eventToEdit} onFormSubmit={handleFormSubmit} />
              </div>
            </div>
            
            {/* Events List Section - Takes 65% of width on xl screens */}
            <div className="xl:col-span-8 xl:h-full xl:overflow-y-auto">
              <div className="xl:pr-2">
                <EventList onEditEvent={handleEditEvent} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Admin;