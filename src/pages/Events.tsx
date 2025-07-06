import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import EventCard from "../components/EventCard";
import SubscriptionBanner from "../components/SubscriptionBanner";
import PageLayout from "../shared/layouts/PageLayout";
import Button from "../shared/semantic/Button";
import Card from "../shared/semantic/Card";
import Container from "../shared/semantic/Container";
import Dropdown from "../shared/semantic/Dropdown";
import Flex from "../shared/semantic/Flex";
import Heading from "../shared/semantic/Heading";
import Input from "../shared/semantic/Input";

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

const Events = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [groupedEvents, setGroupedEvents] = useState<EventGroup[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsCollection = await getDocs(collection(db, "events"));
            const eventsData = eventsCollection.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Event[];
            
            // Sort events by date
            const sortedEvents = eventsData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setEvents(sortedEvents);
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        if (events.length > 0) {
            const grouped = groupEventsByTimeFrame(events);
            setGroupedEvents(grouped);
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

    const EventsBanner = (
        <Container className="bg-bg-primary rounded max-w-[90%] lg:w-[60%] shadow-lg p-6">
            <Flex direction="row" justify="between" gap={6}>
                <Heading as="h2" variant="section">Upcoming Events</Heading>
                <Flex direction="row" gap={4} className="max-w-fit">
                    <Button>Calendar View</Button>
                    <Button variant="gray" className="">List View</Button>
                </Flex>
            </Flex>
        </Container>
    );

    const options = [
        { label: 'Event Type', value: '' },
        { label: 'Worship Service', value: 'worship' },
        { label: 'Bible Study', value: 'study' },
    ];

    return (
        <PageLayout pageId="events" banner={EventsBanner}>
            {/* Filters Section */}
            <Flex direction="col" className="p-8 space-y-8">
                <Card>
                    <Flex direction="col" gap={8} items="center" className="md:flex-row">
                        {/* Category dropdown */}
                        <Dropdown label="Filter by Category" options={options} />

                        {/* Date Range input */}
                        <Flex direction="col" className="md:flex-row " items="center" gap={4}>
                            <Input
                                type="date"
                                label="Start Date"
                                aria-label="Start Date"
                            />
                            <Input
                                type="date"
                                label="End Date"
                                aria-label="End Date"
                            />
                        </Flex>
                        {/* Search Events input */}
                        <Input label="Search Events" type="text" placeholder="Search events" />

                        {/* Apply Filters Button */}
                        <Button className="min-w-fit max-h-fit">Apply Filters</Button>
                    </Flex>
                </Card>
                
                {/* Grouped Event List */}
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
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Flex>
            {/* Stay Connected Banner */}
            <SubscriptionBanner />
        </PageLayout>
    );
}

export default Events