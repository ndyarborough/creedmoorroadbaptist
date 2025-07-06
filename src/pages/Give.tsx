

import PageLayout from "../shared/layouts/PageLayout";
import Card from "../shared/semantic/Card";
import Grid from "../shared/semantic/Grid";
import Heading from "../shared/semantic/Heading";
import Text from "../shared/semantic/Text";
import Email from '@mui/icons-material/Email';
import Public from '@mui/icons-material/Public';
import Church from '@mui/icons-material/Church';
import Flex from "../shared/semantic/Flex";
import Button from "../shared/semantic/Button";
import IconContainer from "../shared/semantic/IconContainer";
import VerseBanner from "../components/VerseBanner";

const Give = () => {
    const realmTriggerUrl = 'https://onrealm.org/CreedmoorRoadBa/give/now'; // The trigger URL from the email
    return (
        <PageLayout pageId="give">
            <Flex direction="col" gap={8} className="py-8 lg:py-12 max-w-[90%] lg:max-w-[60%] mx-auto">
                {/* Supporting Our Ministries */}
                <Heading variant="content">Supporting Our Ministry</Heading>
                <Text variant="body">Your generous contributions make it possible for Cornerstone Church to continue its mission of spreading God's love, supporting our community, and growing disciples. We believe that giving is an act of worship and an expression of gratitude for God's blessings in our lives.</Text>
                <Text variant="body">Whether through tithes, offerings, or special gifts, your financial support enables us to maintain our facilities, fund our ministries, and reach out to those in need. We are committed to being good stewards of every dollar entrusted to us.</Text>
                {/* Ways to Give */}
                <Heading variant="banner">Ways to Give</Heading>
                <Grid className="grid-cols-1 lg:grid-cols-3 text-center" gap={8}>
                    <Card accent="top" accentColor="primary">
                        <IconContainer variant="muted">
                            <Public className="w-8 h-8 text-primary-dark" />
                        </IconContainer>
                        {/* CardHeader */}
                        <Heading as="h3" variant="section">Online Giving</Heading>
                        {/* Description */}
                        <Text as="p" variant="body">
                            Give securely online through our EasyTithe platform. Set up one-time or recurring donations.
                        </Text>
                        <Button
                            as="a"  // Render this as an anchor link
                            href={realmTriggerUrl}
                            target="_blank" // The component will handle the 'rel' attribute
                            variant="primary" // Assuming you want the primary blue style
                            size="lg" // Make it a large, prominent button
                        >
                            Give Online Now
                        </Button>
                    </Card>
                    <Card accent="top" accentColor="error">
                        <IconContainer className="bg-status-error/20">
                            <Church className="w-8 h-8 text-status-error" />
                        </IconContainer>
                        {/* CardHeader */}
                        <Heading as="h3" variant="section">In-Person</Heading>
                        {/* Description */}
                        <Text as="p" variant="body">
                            Place your gift in the offering plate during Sunday services or drop it off at the church office.
                        </Text>
                        <Text variant="body">Church Office Hours: Monday-Friday, 9am-5pm</Text>
                    </Card>
                    <Card accent="top" accentColor="success">
                        <IconContainer className="bg-status-success/20">
                            <Email className="w-8 h-8 text-status-success" />
                        </IconContainer>
                        {/* CardHeader */}
                        <Heading as="h3" variant="section">By Mail</Heading>
                        {/* Description */}
                        <Text as="p" variant="body">
                            Send your check or money order to our church address. Please inclue "Offering" in the memo line.
                        </Text>
                        <Text variant="body">6001 Creedmoor Rd, Raleigh, NC 27612</Text>
                    </Card>
                </Grid>
                <Heading variant="banner">Online Giving Portal</Heading>
                <Card className="text-center">
                    <Heading variant="section">New Giving Platform (Realm)</Heading>
                    <Text variant="body">
                        We are excited to introduce our new giving platform! Please click the button below to open the giving form.
                        We will be fully transitioning over the next couple of months.
                    </Text>
                    <Button
                        as="a"  // Render this as an anchor link
                        href={realmTriggerUrl}
                        target="_blank" // The component will handle the 'rel' attribute
                        variant="primary" // Assuming you want the primary blue style
                        size="lg" // Make it a large, prominent button
                    >
                        Give Now (New Platform)
                    </Button>

                </Card>
            </Flex>
            <VerseBanner />
        </PageLayout >
    )
}

export default Give
