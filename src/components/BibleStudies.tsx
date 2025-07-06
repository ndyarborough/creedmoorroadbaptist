import type { FC } from "react";
import Container from "../shared/semantic/Container";
import Heading from "../shared/semantic/Heading";
import Text from "../shared/semantic/Text";
import Card from "../shared/semantic/Card";
import Grid from "../shared/semantic/Grid";
import Tag from "../shared/semantic/Tag";
import Flex from "../shared/semantic/Flex";
import Button from "../shared/semantic/Button";

const BibleStudies: FC = () => {
    return (
        <Container className="space-y-4 text-center">
            <Flex direction="col" className="max-w-[90%] lg:max-w-[70%] mx-auto">

                <Flex direction="col" className="space-y-2 pt-8">
                    <Heading variant="content">Current Bible Study Groups</Heading>
                    <Text variant="body">Browse our current groups and their schedules.</Text>
                </Flex>
                <Grid gap={8} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-row-3 lg:py-12">
                    <Card className="px-0 py-0">
                        {/* image */}
                        <img src={'/creed_kids.png'} className="m-0"></img>
                        <Flex direction="col" className="p-6 space-y-4  text-left">
                            {/* category and date row */}
                            <Flex direction="row" justify="between">
                                <Tag className="bg-yellow-500 text-black">Children's Ministry</Tag>
                                <Text variant="body">Ages 2-12</Text>
                            </Flex>
                            {/* card header */}
                            <Heading variant="section">Gospel of John</Heading>
                            {/* description */}
                            <Text variant="body">Equipping parents to shepherd tehir child's heart and teaching children what it means to love and live for Jesus.</Text>
                            {/* time & location row */}
                            <Flex direction="row">
                                {/* time icon */}
                                <Text variant="body">Sunday School at 9:45am</Text>
                            </Flex>
                            {/* group leader row */}
                        </Flex>
                    </Card>
                    <Card className="px-0 py-0">
                        {/* image */}
                        <img src={'/creed_kids.png'} className="m-0"></img>
                        <Flex direction="col" className="p-6 space-y-4  text-left">
                            {/* category and date row */}
                            <Flex direction="row" justify="between">
                                <Tag className="bg-yellow-500 text-black">Children's Ministry</Tag>
                                <Text variant="body">Ages 2-12</Text>
                            </Flex>
                            {/* card header */}
                            <Heading variant="section">Gospel of John Study</Heading>
                            {/* description */}
                            <Text variant="body">Equipping parents to shepherd tehir child's heart and teaching children what it means to love and live for Jesus.</Text>
                            {/* time & location row */}
                            <Flex direction="row">
                                {/* time icon */}
                                <Text variant="body">Sunday School at 9:45am</Text>
                            </Flex>
                            {/* group leader row */}
                        </Flex>
                    </Card>
                    <Card className="px-0 py-0">
                        {/* image */}
                        <img src={'/creed_kids.png'} className="m-0"></img>
                        <Flex direction="col" className="p-6 space-y-4  text-left">
                            {/* category and date row */}
                            <Flex direction="row" justify="between">
                                <Tag className="bg-yellow-500 text-black">Children's Ministry</Tag>
                                <Text variant="body">Ages 2-12</Text>
                            </Flex>
                            {/* card header */}
                            <Heading variant="section">Gospel of John Study</Heading>
                            {/* description */}
                            <Text variant="body">Equipping parents to shepherd tehir child's heart and teaching children what it means to love and live for Jesus.</Text>
                            {/* time & location row */}
                            <Flex direction="row">
                                {/* time icon */}
                                <Text variant="body">Sunday School at 9:45am</Text>
                            </Flex>
                            {/* group leader row */}
                        </Flex>
                    </Card>
                    
                </Grid>
            </Flex>
            <Container className="bg-primary-dark py-12">
                <Flex direction="col" items="center" className='max-w-[90%] lg:max-w-[50%] mx-auto space-y-6'>
                    <Heading as="h2" variant="section" className="text-text-inverted">Get Involved in Ministry</Heading>
                    <Text as="p" variant="body" className="text-text-inverted">Find your place to serve and make a difference in our community. Every member has unique gifts to contribute to God's kingdom.</Text>
                    <Flex direction="col" gap={4} className="w-full">
                        <Flex direction="row" gap={4} items="center" justify='center' >
                            <Button as="button" variant="white" className="text-primary-dark">Contact Us to Serve</Button>
                            <Button as="button" variant="transparent">Learn More</Button>
                        </Flex>
                        <Text as="p" variant="footer-link" className="text-primary-light mx-auto">We respect your privacy. Unsubscribe at any time.</Text>
                    </Flex>
                </Flex>
            </Container>
        </Container>
    );
}
export default BibleStudies;