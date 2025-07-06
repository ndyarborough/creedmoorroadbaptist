import { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import EventCard from './EventCard';
import Button from '../shared/semantic/Button';
import Heading from '../shared/semantic/Heading';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  recurring: boolean;
  photoURLs: string[];
}

interface EventGroup {
  title: string;
  events: Event[];
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [groupedEvents, setGroupedEvents] = useState<EventGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as Event));
      
      // Sort events by date
      const sortedEvents = eventsData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setEvents(sortedEvents);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const grouped = groupEventsByTimeFrame(events);
      setGroupedEvents(grouped);
    } else {
      setGroupedEvents([]);
    }
  }, [events]);

  const groupEventsByTimeFrame = (events: Event[]): EventGroup[] => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Get start and end of current week (Sunday to Saturday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const nextWeekStart = new Date(endOfWeek);
    nextWeekStart.setDate(endOfWeek.getDate() + 1);

    const todayEvents: Event[] = [];
    const thisWeekEvents: Event[] = [];
    const nextWeekAndBeyondEvents: Event[] = [];

    events.forEach(event => {
      const eventDate = new Date(event.date);
      const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

      if (eventDateOnly.getTime() === today.getTime()) {
        todayEvents.push(event);
      } else if (eventDateOnly >= startOfWeek && eventDateOnly <= endOfWeek) {
        thisWeekEvents.push(event);
      } else if (eventDateOnly > endOfWeek) {
        nextWeekAndBeyondEvents.push(event);
      }
    });

    const groups: EventGroup[] = [];

    // Today's events
    if (todayEvents.length > 0) {
      const todayTitle = `Today - ${formatDateHeader(today)}`;
      groups.push({ title: todayTitle, events: todayEvents });
    }

    // This week's events (excluding today)
    if (thisWeekEvents.length > 0) {
      groups.push({ title: "This Week", events: thisWeekEvents });
    }

    // Next week and beyond
    if (nextWeekAndBeyondEvents.length > 0) {
      groups.push({ title: "Next Week & Beyond", events: nextWeekAndBeyondEvents });
    }

    return groups;
  };

  const formatDateHeader = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteDoc(doc(db, "events", eventId));
        // Events will auto-update due to onSnapshot listener
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="mt-8">
        <Heading as="h2" variant="section">
          Existing Events
        </Heading>
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-500">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <Heading as="h2" variant="section">
        Existing Events
      </Heading>
      
      {events.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-500 mb-4">No events found.</p>
          <p className="text-sm text-gray-400">Add your first event using the form above.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedEvents.map((group, index) => (
            <div key={index} className="space-y-4">
              {/* Group Header */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                </div>
                <Heading as="h3" variant="section-subheader" className="text-gray-700 font-semibold">
                  {group.title}
                </Heading>
              </div>
              
              {/* Group Events */}
              <div className="space-y-4 ml-1 lg:ml-7">
                {group.events.map(event => (
                  <div key={event.id} className="relative">
                    <EventCard event={event} />
                    {/* Delete button - only show in admin view */}
                    <Button
                      onClick={() => handleDeleteEvent(event.id)}
                      variant="danger"
                      className="absolute top-2 right-2 text-xs px-2 py-1"
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;