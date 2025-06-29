import type { FC } from "react";
import Text from "../shared/semantic/Text";
import Groups from '@mui/icons-material/Groups';
import Home from '@mui/icons-material/Home';
import Forum from '@mui/icons-material/Forum';
import CardGiftcard from '@mui/icons-material/CardGiftcard';
import Campaign from '@mui/icons-material/Campaign';
import Church from '@mui/icons-material/Church';
import Public from '@mui/icons-material/Public';
import School from '@mui/icons-material/School';
import Search from '@mui/icons-material/Search';
import VolunteerActivism from '@mui/icons-material/VolunteerActivism';
import SelfImprovement from '@mui/icons-material/SelfImprovement';
import MenuBook from '@mui/icons-material/MenuBook';
import Book from '@mui/icons-material/Book';
import Favorite from '@mui/icons-material/Favorite';
import IconContainer from "../shared/semantic/IconContainer";
import Card from "../shared/semantic/Card";
import Flex from "../shared/semantic/Flex";
import Grid from "../shared/semantic/Grid";
import Heading from "../shared/semantic/Heading";

const MissionsAndValues: FC = () => {
    return(
        <Flex direction="col" items="center" className="space-y-4 mx-auto ">
                            <Heading variant="content">Missions & Values</Heading>
                            <Text variant="body" className="text-[20px] text-center">One day everything will be restored back to God's design, and those who trust Jesus by faith will enjoy eternity in the new heaven and earth.</Text>
                            <Card className="bg-primary-dark">
                                <Heading variant="section" className="text-bg-primary">Our Mission</Heading>
                                <Heading variant="section-subheader" className="text-bg-primary">At Creedmoor Road Baptist Church we exist to be disciples who make disciples of all nations.</Heading>
                            </Card>
                            <Flex direction="row" className="gap-8">
                                <Card>
                                    <Heading variant="section">Our Vision</Heading>
                                    <Text variant="body">To be a church where everyone can find their place, grow in their faith, and make a difference in their community and beyond.</Text>
                                </Card>
                                <Card>
                                    <Heading variant="section">Our Vision</Heading>
                                    <Text variant="body">To be a church where everyone can find their place, grow in their faith, and make a difference in their community and beyond.</Text>
                                </Card>
                            </Flex>
                            <Heading variant="section" className="py-4">Core Values</Heading>
                            <Grid className="grid-cols-2 grid-rows-3 gap-4">
                                <Card accent="left" accentColor="primary">
                                    <Flex direction="row" gap={2}>
                                        <MenuBook className="text-primary-dark" />
                                        <Heading variant="section-subheader">Biblical Authority</Heading>
                                    </Flex>
                                    <Text variant="body">The Bible is our sole authority.</Text>
                                </Card>
                                <Card accent="left" accentColor="primary">
                                    <Flex direction="row" gap={2}>
                                        <Favorite className="text-primary-dark" />
                                        <Heading variant="section-subheader">Biblical Authority</Heading>
                                    </Flex>
                                    <Text variant="body">The Bible is our sole authority.</Text>
                                </Card>
                                <Card accent="left" accentColor="primary">
                                    <Flex direction="row" gap={2}>
                                        <Book className="text-primary-dark" />
                                        <Heading variant="section-subheader">Biblical Authority</Heading>
                                    </Flex>
                                    <Text variant="body">The Bible is our sole authority.</Text>
                                </Card>
                                <Card accent="left" accentColor="primary">
                                    <Flex direction="row" gap={2}>
                                        <Groups className="text-primary-dark" />
                                        <Heading variant="section-subheader">Biblical Authority</Heading>
                                    </Flex>
                                    <Text variant="body">The Bible is our sole authority.</Text>
                                </Card>
                                <Card accent="left" accentColor="primary">
                                    <Flex direction="row" gap={2}>
                                        <VolunteerActivism className="text-primary-dark" />
                                        <Heading variant="section-subheader">Biblical Authority</Heading>
                                    </Flex>
                                    <Text variant="body">The Bible is our sole authority.</Text>
                                </Card>
                                <Card accent="left" accentColor="primary">
                                    <Flex direction="row">
                                        <SelfImprovement className="text-primary-dark" />
                                        <Heading variant="section-subheader">Biblical Authority</Heading>
                                    </Flex>
                                    <Text variant="body">The Bible is our sole authority.</Text>
                                </Card>
                            </Grid>
                            {/* Life Marks */}
                            <Heading variant="section" className="py-4">Our Seven Life Marks</Heading>
                            <Grid className="grid-cols-3 grid-rows-3 gap-x-4 gap-y-12">
                                <Flex direction="col" className="items-center space-y-3">
                                    <IconContainer className="bg-status-error/20" size="lg" shape="circle">
                                        <Church className="w-8 h-8 text-status-error" />
                                    </IconContainer>
                                    {/* CardHeader */}
                                    <Heading as="h3" variant="section">Christlikeness</Heading>
                                    {/* Description */}
                                    <Text as="p" variant="body">
                                        Am I becoming more like Jesus?
                                    </Text>
                                </Flex>
                                <Flex direction="col" className="items-center space-y-3">
                                    <IconContainer className="bg-status-error/20" size="lg" shape="circle">
                                        <Campaign className="w-8 h-8 text-status-error" />
                                    </IconContainer>
                                    {/* CardHeader */}
                                    <Heading as="h3" variant="section">Evangelism</Heading>
                                    {/* Description */}
                                    <Text as="p" variant="body">
                                        Am I close to someone far from God?
                                    </Text>
                                </Flex>
                                <Flex direction="col" className="items-center space-y-3">
                                    <IconContainer className="bg-status-error/20" size="lg" shape="circle">
                                        <VolunteerActivism className="w-8 h-8 text-status-error" />
                                    </IconContainer>
                                    {/* CardHeader */}
                                    <Heading as="h3" variant="section">Service</Heading>
                                    {/* Description */}
                                    <Text as="p" variant="body">
                                        Where am I serving?
                                    </Text>
                                </Flex>
                                <Flex direction="col" className="items-center space-y-3">
                                    <IconContainer className="bg-status-error/20" size="lg" shape="circle">
                                        <CardGiftcard className="w-8 h-8 text-status-error" />
                                    </IconContainer>
                                    {/* CardHeader */}
                                    <Heading as="h3" variant="section">Giving</Heading>
                                    {/* Description */}
                                    <Text as="p" variant="body">
                                        Am I growing in generosity?
                                    </Text>
                                </Flex>
                                <Flex direction="col" className="items-center space-y-3">
                                    <IconContainer className="bg-status-error/20" size="lg" shape="circle">
                                        <Groups className="w-8 h-8 text-status-error" />
                                    </IconContainer>
                                    {/* CardHeader */}
                                    <Heading as="h3" variant="section">Influence</Heading>
                                    {/* Description */}
                                    <Text as="p" variant="body">
                                        Who am I invested in?
                                    </Text>
                                </Flex>
                                <Flex direction="col" className="items-center space-y-3">
                                    <IconContainer className="bg-status-error/20" size="lg" shape="circle">
                                        <Home className="w-8 h-8 text-status-error" />
                                    </IconContainer>
                                    {/* CardHeader */}
                                    <Heading as="h3" variant="section">Family</Heading>
                                    {/* Description */}
                                    <Text as="p" variant="body">
                                        How am I improving my family relationships?
                                    </Text>
                                </Flex>
                                <Flex direction="col" className="items-center space-y-3">
                                    <IconContainer className="bg-status-error/20" size="lg" shape="circle">
                                        <Forum className="w-8 h-8 text-status-error" />
                                    </IconContainer>
                                    {/* CardHeader */}
                                    <Heading as="h3" variant="section">Accountability</Heading>
                                    {/* Description */}
                                    <Text as="p" variant="body">
                                        Who is asking me the tough questions?
                                    </Text>
                                </Flex>
                            </Grid>
                            {/* The Pathway */}
                            <Heading variant="section" className="py-4">The Pathway</Heading>
                            <Text variant="body" className="text-center">Since we are a church that seeks to be disciples who make disciples then this is the pathway for us to be disciples. We expect our members to be involved in each of these four areas:</Text>
                            <Grid className="grid-cols-4 gap-4">
                                <Card accent="top" accentColor="primary" className="text-center">
                                    <IconContainer className="bg-primary-dark/20" size="lg" shape="circle">
                                        <Search className="w-8 h-8 text-primary-dark" />
                                    </IconContainer>
                                    {/* CardHeader */}
                                    <Heading as="h3" variant="section">Know God</Heading>
                                    {/* Description */}
                                    <Text as="p" variant="body">
                                        Attend our worship service each Sunday s Pastor Danny teaches the Bible.
                                    </Text>
                                </Card>
                                <Card accent="top" accentColor="primary" className="text-center">
                                    <IconContainer className="bg-primary-dark/20" size="lg" shape="circle">
                                        <School className="w-8 h-8 text-primary-dark" />
                                    </IconContainer>
                                    {/* CardHeader */}
                                    <Heading as="h3" variant="section">Be Discipled</Heading>
                                    {/* Description */}
                                    <Text as="p" variant="body">
                                        Find Discipleship in one of our Bible Study classes each Sunday Morning.
                                    </Text>
                                </Card>
                                <Card accent="top" accentColor="primary" className="text-center">
                                    <IconContainer className="bg-primary-dark/20" size="lg" shape="circle">
                                        <Groups className="w-8 h-8 text-primary-dark" />
                                    </IconContainer>
                                    {/* CardHeader */}
                                    <Heading as="h3" variant="section">Live in Community</Heading>
                                    {/* Description */}
                                    <Text as="p" variant="body">
                                        Find community in our mid-week gatherings as you navigate life, guided by God's Word.
                                    </Text>
                                </Card>
                                <Card accent="top" accentColor="primary" className="text-center">
                                    <IconContainer className="bg-primary-dark/20" size="lg" shape="circle">
                                        <Public className="w-8 h-8 text-primary-dark" />
                                    </IconContainer>
                                    {/* CardHeader */}
                                    <Heading as="h3" variant="section">Change the World</Heading>
                                    {/* Description */}
                                    <Text as="p" variant="body">
                                        Join God's work in changing the world through missions, evangelism, and volunteering.
                                    </Text>
                                </Card>
                            </Grid>
                            <Flex direction="col" items="center" className="bg-bg-section p-8 space-y-4">
                                <Heading variant="section">Our Focus</Heading>
                                <Text variant="body" className="text-center">"Sometimes we say 'no so we can say 'yes'."</Text>
                                <Text variant="body" className="text-center">We believe that God has a specific mission for Creedmoor Road Baptist Church, and we are most effective when we are focused on where He is leading us.</Text>

                            </Flex>
                        </Flex>
    )
}

export default MissionsAndValues;