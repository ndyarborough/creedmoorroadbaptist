import Flex from "../shared/semantic/Flex";
import Heading from "../shared/semantic/Heading";
import Text from "../shared/semantic/Text";
import PageLayout from "../shared/layouts/PageLayout";
import Grid from "../shared/semantic/Grid";
import Card from "../shared/semantic/Card";
import Container from "../shared/semantic/Container";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import FamilyRestroom from '@mui/icons-material/FamilyRestroom';
import Groups from '@mui/icons-material/Groups';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Person from '@mui/icons-material/Person';
import LocationOn from '@mui/icons-material/LocationOn';
import LocalPhone from '@mui/icons-material/LocalPhone';
import Email from '@mui/icons-material/Email';
import MusicNote from '@mui/icons-material/MusicNote';
import VolunteerActivism from '@mui/icons-material/VolunteerActivism';
import { Link } from "react-router-dom";
import Button from "../shared/semantic/Button";
import IconContainer from "../shared/semantic/IconContainer";
import MapEmbed from "../shared/semantic/MapEmbed";
import SubscriptionBanner from "../components/SubscriptionBanner";

const Home = () => {
    // This section renders the blue "Join Us This Sunday" bar.
    const SundayBanner = (
        <Container className="bg-bg-primary rounded w-[60%] shadow-lg py-6">
            <Flex justify="between" items="center" className="flex-col md:flex-row" gap={6}>
                <Flex direction="col" items="center" className="md:items-start text-center md:text-left">
                    <Heading as="h2" variant="section-subheader">
                        Join Us This Sunday
                    </Heading>
                    <Text as="span" variant="body" className="text-primary-light">
                        Experience worship, community, and growth.
                    </Text>
                </Flex>

                <Flex items="start" className="flex-col sm:flex-row text-center sm:text-left" gap={6}>
                    <Flex direction="col">
                        <Text as="span" variant="body" className="font-semibold">
                            Sunday Services
                        </Text>
                        <Text as="span" variant="body" className="text-primary-light">
                            9:00 AM & 11:00 AM
                        </Text>
                    </Flex>
                    <Flex direction="col">
                        <Text as="span" variant="body" className="font-semibold">
                            Wednesday Bible Study
                        </Text>
                        <Text as="span" variant="body" className="text-primary-light">
                            7:00 PM
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Container>
    );

    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3233.3090579250766!2d-78.68387582420404!3d35.865942372528224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf7b7b92fb509%3A0xb2474f985d9701a7!2sCreedmoor%20Road%20Baptist%20Church!5e0!3m2!1sen!2sus!4v1751168867424!5m2!1sen!2sus";

    return (
        <PageLayout pageId="home" banner={SundayBanner}>
            {/* Welcome Section */}
            <Grid gap={12} className="grid-cols-2 px-32">
                <Flex direction="col" className="text-left space-y-8">
                    <Heading as="h2" variant="content">
                        Welcome to Cornerstone Church
                    </Heading>
                    <Text as="p" variant="body">
                        We are a vibrant community of believers dedicated to sharing God’s love, growing in faith together, and serving our community. Whether you’re exploring faith for the first time or looking for a church home, you’ll find a warm welcome here.
                    </Text>
                    <Text as="p" variant="body">
                        Our mission is to help people know God, find freedom, discover purpose, and make a difference. We believe that church should be a place where everyone can encounter God’s presence and experience authentic community.
                    </Text>
                    <Link to="/about" className="flex">
                        <Text variant="link">Learn More About Us </Text>
                        <ArrowRightAltIcon className="text-primary-dark" />
                    </Link>
                </Flex>
                <img
                    src="https://online.campbellsville.edu/wp-content/uploads/2020/08/1200x628-202008-ComingTogether-article-CU.jpg"
                    alt="A diverse group of church members smiling"
                    className="rounded-lg shadow-xl w-full flex-grow object-cover"
                />
            </Grid>

            {/* Upcoming Events Section */}
            <Container className="text-center items-center bg-bg-section mt-8 py-8 space-y-8">
                {/* Event Section Header */}
                <Heading as="h2" variant="content">Upcoming Events</Heading>
                <Text as="p" variant="body" className="mt-4">
                    Join us for these special gatherings and opportunities to connect, serve, and grow together.
                </Text>
                {/* Event Grid */}
                <Grid className="grid-cols-1 md:grid-cols-3 gap-12 mt-12 text-left">
                    <Card>
                        <img src="https://placehold.co/400x250/ddd/333?text=Worship" alt="Worship night" className="w-full aspect-video object-cover" />
                        <div className="p-6">
                            <Heading as="h3" variant="section">Summer Worship Night</Heading>
                            <Text as="p" variant="body" className="mt-2">Join us for an evening of praise and worship.</Text>
                        </div>
                    </Card>
                    <Card>
                        <img src="https://placehold.co/400x250/ddd/333?text=Kids" alt="Children doing crafts" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <Heading as="h3" variant="section">Vacation Bible School</Heading>
                            <Text as="p" variant="body" className="mt-2">A fun-filled week of learning for kids ages 5-12.</Text>
                        </div>
                    </Card>
                    <Card>
                        <img src="https://placehold.co/400x250/ddd/333?text=Service" alt="Volunteers working on a project" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <Heading as="h3" variant="section">Community Service Day</Heading>
                            <Text as="p" variant="body" className="mt-2">Serve our local community through various projects.</Text>
                        </div>
                    </Card>
                </Grid>
                <Button>
                    <Link to='/events'>
                        View All Events     
                        <ArrowRightAltIcon />
                    </Link>
                </Button>
            </Container>

            {/* Our Ministries Section */}
            <Container className="text-center items-center bg-bg-section py-8 space-y-8">
                {/* Event Section Header */}
                <Heading as="h2" variant="content">Our Ministries</Heading>
                <Text as="p" variant="body" className="mt-4">
                    Discover the different ways you can connect, serve, and grow at Cornerstone Church.
                </Text>
                {/* Ministry Cards */}
                <Grid className="grid-cols-4" gap={4}>
                    <Card className="p-8 space-y-4">
                        {/* Icon */}
                        <IconContainer className="bg-primary-base/20" size="lg" shape="circle">
                            <FamilyRestroom className="w-8 h-8 text-primary-base" />
                        </IconContainer>
                        {/* CardHeader */}
                        <Heading as="h3" variant="section">Children's Ministry</Heading>
                        {/* Description */}
                        <Text as="p" variant="body">
                            Nurturing the spiritual growth of our children through engaging Bible lessons and activities.
                        </Text>
                    </Card>
                    <Card className="p-8 space-y-4">
                        {/* Icon */}
                        <IconContainer className="bg-category-purple/20" size="lg" shape="circle">
                            <Groups className="w-8 h-8 text-category-purple" />
                        </IconContainer>
                        {/* CardHeader */}
                        <Heading as="h3" variant="section">Youth Group</Heading>
                        {/* Description */}
                        <Text as="p" variant="body">
                            Creating a space for teens to build meaningful relationships and deepen their faith.
                        </Text>
                    </Card>
                    <Card className="p-8 space-y-4">
                        {/* Icon */}
                        <IconContainer className="bg-status-success/20" size="lg" shape="circle">
                            <VolunteerActivism className="w-8 h-8 text-status-success" />
                        </IconContainer>
                        {/* CardHeader */}
                        <Heading as="h3" variant="section">Community Outreach</Heading>
                        {/* Description */}
                        <Text as="p" variant="body">
                            Serving our neighbors through various compassion and support initiatives.
                        </Text>
                    </Card>
                    <Card className="p-8 space-y-4">
                        {/* Icon */}
                        <IconContainer className="bg-status-error/20" variant="primary" size="lg" shape="circle">
                            <MusicNote className="w-8 h-8 text-status-error" />
                        </IconContainer>
                        {/* CardHeader */}
                        <Heading as="h3" variant="section">Worship Ministry</Heading>
                        {/* Description */}
                        <Text as="p" variant="body">
                            Using musical gifts to lead the congregation in worship and praise.
                        </Text>
                    </Card>
                </Grid>
                <Link to="/events" className="flex justify-center">
                    <Text variant="link">View All Events </Text>
                    <ArrowRightAltIcon className="text-primary-dark" />
                </Link>
            </Container>
            {/* Latest Sermon Section */}
            <Container className="bg-bg-footer p-12">
                <Flex direction="row">
                    {/* Image */}
                    <img src='https://b496025.smushcdn.com/496025/wp-content/uploads/sites/37/2018/02/img_1161.jpg?lossy=0&strip=1&webp=1' alt='Video of last sermon' className="aspect-video object-cover w-[clamp(100px,60%,1000px)]"/>
                    {/* Content */}
                    <Flex direction="col" className="p-12 space-y-6">
                        <Text variant="body" className="text-status-error font-bold">LATEST SERMON</Text>
                        <Heading variant="content" className="text-bg-primary">Finding Peace in Troubled Times</Heading>
                        <Text variant="body" className="text-off-white max-w-[60%]">
                            In this powerful message, Pastor Johnson explores how we can find God's peace even in the midst of life's most challenging circumstances. Drawing from Scripture and personal experiences, he offers practical guidance for trusting God when everything seems uncertain.
                        </Text>
                        <Flex direction="row" gap={4}>
                            <Flex direction="row" className="gap-2">
                                <CalendarToday className="text-bg-primary" />
                                <Text variant="body" className="text-bg-primary">June 4, 2023</Text>
                            </Flex>
                            <Flex direction="row" className="gap-2">
                                <Person className="text-bg-primary" />
                                <Text variant="body" className="text-bg-primary">Pastor Danny Estave</Text>
                            </Flex>
                        </Flex>
                        <Flex direction="row" gap={4}>
                            <Button variant="white" >Watch Sermon</Button>
                            <Button variant="transparent">All Sermons</Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Container>

            {/* Stay Connected Banner */}
           <SubscriptionBanner />

            {/* Visit Us */}
            <Container >
                <Grid className="grid-cols-2 p-8 gap-12">
                    <Flex direction="col" className="px-20 space-y-4">
                        <Heading variant="content" >Visit Us</Heading>
                        <Text variant="body">We'd Love to see you this Sunday. Here's how you can find us:</Text>
                        <Card className="p-6 space-y-6">
                            {/* Location */}
                            <Flex direction="row" gap={4}>
                                {/* Icon */}
                                <LocationOn className="text-primary-dark" />
                                {/* text */}
                                <Flex direction="col">
                                    <Text variant="body" className="text-bg-footer font-bold">Creedmoor Road Baptist Church</Text>
                                    <Text variant="body">6001 Creedmoor Rd,<br></br>Raleigh, NC 27612</Text>
                                </Flex>
                            </Flex>
                            {/* Phone */}
                            <Flex direction="row" gap={4}>
                                {/* Icon */}
                                <LocalPhone className="text-primary-dark" />
                                {/* text */}
                                <Text variant="body">(919) 787-3317</Text>

                            </Flex>
                            <Flex direction="row" gap={4}>
                                {/* Icon */}
                                <Email className="text-primary-dark" />
                                {/* text */}
                                <Text variant="body">CreedmoorRoadBaptist@gmail.com</Text>

                            </Flex>
                        </Card>
                    </Flex>
                    {/* Map */}
                    <MapEmbed embedUrl={mapEmbedUrl} title="Location of Creedmoor Road Baptist Church" />
                </Grid>
            </Container>
        </PageLayout>
    );
};

export default Home;
