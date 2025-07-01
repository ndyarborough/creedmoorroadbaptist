import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Heading from '../shared/semantic/Heading';

interface Event {
  id: string;
  title: string;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
      setEvents(eventsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="mt-8">
      <Heading as="h2" variant="section">
        Existing Events
      </Heading>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id} className="py-2 border-b">
              {event.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
