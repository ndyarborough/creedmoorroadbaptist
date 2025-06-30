

import Container from "@mui/material/Container";
import PageLayout from "../shared/layouts/PageLayout";
import Heading from "../shared/semantic/Heading";
import Flex from "../shared/semantic/Flex";
import LocationPin from '@mui/icons-material/LocationPin';
import Email from '@mui/icons-material/Email';
import Facebook from '@mui/icons-material/Facebook';
import YouTube from '@mui/icons-material/YouTube';
import Phone from '@mui/icons-material/Phone';
import Text from "../shared/semantic/Text";
import Card from "../shared/semantic/Card";
import Input from "../shared/semantic/Input";
import Checkbox from "../shared/semantic/Checkbox";
import Button from "../shared/semantic/Button";
import IconContainer from "../shared/semantic/IconContainer";
import MapEmbed from "../shared/semantic/MapEmbed";
import Grid from "../shared/semantic/Grid";
import PrayerBanner from "../components/PrayerBanner";

const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3233.3090579250766!2d-78.68387582420404!3d35.865942372528224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf7b7b92fb509%3A0xb2474f985d9701a7!2sCreedmoor%20Road%20Baptist%20Church!5e0!3m2!1sen!2sus!4v1751168867424!5m2!1sen!2sus";


const Contact = () => {
    const ContactBanner = (
        <Container className="bg-bg-primary rounded max-w-[40%] shadow-lg py-6">
            <Flex direction="row" justify="between" items="center" gap={6}>
                <Flex direction="col" gap={4} className="max-w-[40%]">
                    <Heading as="h2" variant="banner">Upcoming Events</Heading>
                    <Text variant="body">We're here to answer any questions you may have</Text>
                </Flex>
                <Flex direction="row" gap={12} className="text-center">
                    <Flex direction="col" className="items-center space-y-3">
                        <Phone className="w-8 h-8 text-primary-dark" />
                        {/* CardHeader */}
                        <Heading as="h3" variant="section">Phone</Heading>
                        {/* Description */}
                        <Text as="p" variant="body">
                            (919) 787-3317
                        </Text>
                    </Flex>
                    <Flex direction="col" className="items-center space-y-3">

                        <Email className="w-8 h-8 text-primary-dark" />
                        {/* CardHeader */}
                        <Heading as="h3" variant="section">Email</Heading>
                        {/* Description */}
                        <Text as="p" variant="body">
                            CreedmoorRoadBaptist@gmail.com
                        </Text>
                    </Flex>
                    <Flex direction="col" className="items-center space-y-3">
                        <LocationPin className="w-8 h-8 text-primary-dark" />
                        {/* CardHeader */}
                        <Heading as="h3" variant="section">Address</Heading>
                        {/* Description */}
                        <Text as="p" variant="body">
                            6001 Creedmoor Rd, Raleigh, NC 27612
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Container>
    );

    return (
        <PageLayout pageId="contact" banner={ContactBanner}>
            <Flex gap={12} direction="row" className="max-w-[70%] mx-auto py-24">
                <Card className="col-span-5 px-0 py-0 min-w-[60%]">
                    <Flex direction="col" gap={4} className="bg-primary-dark p-8">
                        <Heading variant="banner" className="text-text-inverted" as="h2">Send Us a Message</Heading>
                        <Text variant="body" className="text-text-inverted">Fill out the form below and we'll get back to you as soon as possible.</Text>
                    </Flex>
                    <Flex direction="col" gap={4} className="p-6">
                        <Flex direction="row" gap={8}>
                            <Input label="First Name" type="text"></Input>
                            <Input label="Last Name" type="text"></Input>
                        </Flex>
                        <Input label="Phone Number" type="text"></Input>
                        <Input label="Subject" type="text"></Input>
                        <Input label="Email Address" type="text"></Input>
                        <Input label="Email Address" type="text"></Input>
                        <Checkbox label="Subscribe to our newsletter for updates on church events and activities" />
                        <Flex justify="end" className="mt-4">
                            <Button>Send Message</Button>
                        </Flex>
                    </Flex>
                </Card>
                <Flex direction="col" gap={8} className="col-span-3">
                    {/* Office Hours Card */}
                    <Card>
                        <Heading variant="section">Office Hours</Heading>
                        <Flex direction="row" justify="between">
                            <Text variant="body" className="text-text-muted">Monday-Thursday</Text>
                            <Text variant="body">9:00AM - 5:00PM</Text>
                        </Flex>
                        <Flex direction="row" justify="between">
                            <Text variant="body" className="text-text-muted">Friday</Text>
                            <Text variant="body">9:00AM - 1:00PM</Text>
                        </Flex>
                        <Flex direction="row" justify="between">
                            <Text variant="body" className="text-text-muted">Saturday</Text>
                            <Text variant="body">Closed</Text>
                        </Flex>
                        <Flex direction="row" justify="between">
                            <Text variant="body" className="text-text-muted">Sunday</Text>
                            <Text variant="body">8:00AM - 1:00PM</Text>
                        </Flex>
                    </Card>
                    {/* Meet The Pastor Card */}
                    <Card>
                        <Heading variant="section">Meet the Pastor</Heading>
                        <Flex direction="row" gap={4}>
                            <img
                                src="/pastor.png"
                                alt="Pastor"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <Flex direction="col">
                                <Text variant="body" className="font-bold">Pastor Danny Estave</Text>
                                <Text variant="link" className="text-text-muted">Lead Pastor</Text>
                            </Flex>
                        </Flex>
                        <Text as="p" variant="body">
                            Greetings,
                        </Text>
                        <Text variant="body" as="p">
                            At Creedmoor Road Baptist Church we seek to be a congegration that loves Jesus Christ.
                            My hope for CRBC is that we would be a family of different backgrounds, ethnicities, and socioeconomic statuses
                            who know and worship the one true God. In view of Christ’s redemption for us we want to walk in compassion, mercy, and grace.
                            We pray that our minds and hearts would be fully shaped by Christ.
                        </Text>
                        <Text as="p" variant="body" className="font-xs">
                            If you are looking for a church, or have questions about God we would love to have you come to one of our services.
                            We are not a perfect congregation, but we are a congregation that loves God and loves others. Whether you are
                            searching for a church home or trying to figure out your relationship with God then we want to welcome you.
                            We hope to see you soon.
                        </Text>
                    </Card>
                    {/* Connect With Us Card */}
                    <Card>
                        <Heading variant="section">Connect With Us</Heading>
                        <Flex direction="row" gap={4}>
                            <IconContainer variant="primary">
                                <Facebook className="text-bg-secondary"/>
                            </IconContainer>
                            <IconContainer variant="error">
                                <YouTube className="text-bg-secondary"/>
                            </IconContainer>
                        </Flex>
                    </Card>
                </Flex>
            </Flex>
             <Container className="text-center items-center bg-bg-section mt-8 py-8 space-y-8">
                <Heading variant="section">Find Us</Heading>
                <Text variant="body">Conveniently located on Creedmoor Road in Raleigh, NC (Hwy 50). We are a short distance from Interstates 540 and 440, and a little over a mile from Crabtree Valley Mall, making it easy to find and reach us.</Text>
                     <div className="max-w-4xl min-h-[500px] mx-auto">
               <Card className="px-0 py-0">
                 <Grid>
                    <MapEmbed embedUrl={mapEmbedUrl} title="Location of Creedmoor Road Baptist Church" />
                    <Flex direction="row" justify="between" className="bg-bg-secondary text-left p-4" >
                        <Flex direction="col" >
                            <Heading variant="section">Creemoor Road Baptist Church</Heading>
                            <Text variant="body">6001 Creedmoor Rd, Raleigh, NC 27612</Text>
                        </Flex>
                        <Button className="text-norwrap">Get Directions</Button>
                    </Flex>
                </Grid>
               </Card>
    </div>

             </Container>
             <PrayerBanner />
        </PageLayout>
    )
}

export default Contact
