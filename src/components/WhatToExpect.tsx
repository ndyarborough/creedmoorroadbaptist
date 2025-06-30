import type { FC } from "react";
import Text from "../shared/semantic/Text";
import Favorite from '@mui/icons-material/Favorite';
import Card from "../shared/semantic/Card";
import Flex from "../shared/semantic/Flex";
import Heading from "../shared/semantic/Heading";
import IconContainer from "../shared/semantic/IconContainer";
import Button from "../shared/semantic/Button";
import Grid from "../shared/semantic/Grid";

const WhatToExpect: FC = () => {
    return (
        <Flex direction="col" items="center" className="space-y-12 mx-auto py-12">
            <Heading variant="content">What to Expect</Heading>
            <Text variant="body" className="text-[20px] text-center">You are welcome here. We understand showing up at a new place for the first time can be nerve-wracking, so here's more information about CRBC.</Text>
            <Card className="bg-primary-dark text-center">
                <Heading variant="section" className="text-bg-primary">Sunday Worship Service</Heading>
                <Heading variant="section-subheader" className="text-bg-primary">We meet for worship every Sunday morning at 11am. The services are one hour long or less.</Heading>
            </Card>
            <Grid className="grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <Card accent="top" accentColor="error">
                    <IconContainer className="bg-status-error/20" size="lg" shape="circle">
                        <Favorite className="text-status-error" fontSize="large" />
                    </IconContainer>
                    {/* CardHeader */}
                    <Heading as="h3" variant="section">Friendly Atmosphere</Heading>
                    {/* Description */}
                    <Text variant="body">CRBC is a small, close community of believers where you will feel welcome. We never single out our guests, but people will notice you and greet you with warmth and care.</Text>
                </Card>
                <Card accent="top" accentColor="primary">
                    <IconContainer className="bg-primary-dark/20" size="lg" shape="circle">
                        <Favorite className="text-primary-dark" fontSize="large" />
                    </IconContainer>
                    {/* CardHeader */}
                    <Heading as="h3" variant="section">Engaging Worship</Heading>
                    {/* Description */}
                    <Text variant="body">Our Music Director, Mike Gregory, leads a joyful mix of traditional hymns, contemporary praise songs, nd event the occasional guitar solo.</Text>
                </Card>
                <Card accent="top" accentColor="success">
                    <IconContainer className="bg-status-success/20" size="lg" shape="circle">
                        <Favorite className="text-status-success" fontSize="large" />
                    </IconContainer>
                    {/* CardHeader */}
                    <Heading as="h3" variant="section">A Fresh Message</Heading>
                    {/* Description */}
                    <Text variant="body">Senior Pastor, Danny Estave, delivers insightful messages from God's word, not only explaining the meaning of the passages, but also applying their truths to our everyday lives. </Text>
                    <Text variant="body" className="text-text-muted">(25-30 minutes)</Text>
                </Card>
            </Grid>
            <Flex direction="col" items="center" className="bg-bg-section p-8 space-y-4">
                <Heading variant="section">Can't Make It In Person?</Heading>
                <Text variant="body" className="text-center">You can also catch the live broadcast or watch the recorded sermon on YouTube.</Text>
                <Flex direction="row" justify="center" className="gap-4">
                    <Button variant="danger">Watch Live Stream</Button>
                    <Button variant="white" className="border-2 border-primary-dark">Plan Your Visit</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default WhatToExpect;