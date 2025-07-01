

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

const Events = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsCollection = await getDocs(collection(db, "events"));
            const eventsData = eventsCollection.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Event[];
            setEvents(eventsData);
        };

        fetchEvents();
    }, []);

    const EventsBanner = (
        <Container className="bg-bg-primary rounded w-[60%] shadow-lg p-6">
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
            <Card>
                <Flex direction="row" gap={8} items="center">
                    {/* Category dropdown */}
                    <Dropdown label="Filter by Category" options={options} />

                    {/* Date Range input */}
                    <Flex direction="row" items="center" gap={4}>
                        <Input
                            type="date"
                            label="Start Date"
                            aria-label="Start Date" // Accessible label for the start date
                        />
                        <Input
                            type="date"
                            label="End Date"
                            aria-label="End Date" // Accessible label for the end date
                        />
                    </Flex>
                    {/* Search Events input */}
                    <Input label="Search Events" type="text" placeholder="Search events" />

                    {/* Apply Filters Button */}
                    <Button className="min-w-fit max-h-fit">Apply Filters</Button>
                </Flex>
            </Card>
            {/* Event List */}
            <div className="space-y-8">
                {events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
            {/* Stay Connected Banner */}
            <SubscriptionBanner />
        </PageLayout>
    );
}

export default Events
