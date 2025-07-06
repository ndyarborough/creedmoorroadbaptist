import Button from '../shared/semantic/Button';
import Container from '../shared/semantic/Container';
import Heading from '../shared/semantic/Heading';
import Flex from '../shared/semantic/Flex';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "../shared/semantic/Tabs";
import { auth } from '../lib/firebase';
import AddEventForm from '../components/AddEventForm';
import AddGroupForm from '../components/AddGroupForm';
import EventList from '../components/EventList';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import GroupList from '../components/GroupList';

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
    <Container className="py-8">
      <Heading as="h1" variant="page">Admin Dashboard</Heading>
      <p>Welcome to the admin dashboard.</p>
      
      <Flex direction="col" className="max-w-[70%] mx-auto mt-8">
        <Tabs>
          <TabList>
            <Tab index={0}>Events</Tab>
            <Tab index={1}>Groups</Tab>
          </TabList>

          <TabPanels className="max-w-[80%] mx-auto">
            <TabPanel index={0}>
              <div className="mt-8">
                <Heading as="h2" variant="section">
                  Add New Event
                </Heading>
                <AddEventForm />
              </div>
              <EventList />
            </TabPanel>
            <TabPanel index={1}>
              <div className="mt-8">
                <Heading as="h2" variant="section">
                  Add New Group
                </Heading>
                <AddGroupForm />
              </div>
              <div className="mt-8">
                <Heading as="h2" variant="section">
                  Existing Groups
                </Heading>
                <GroupList />
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      
      <Button onClick={handleLogout} className="mt-8">
        Logout
      </Button>
    </Container>
  );
};

export default Admin;