import type { FC } from "react";
import Heading from "../shared/semantic/Heading";
import Flex from "../shared/semantic/Flex";
import Text from "../shared/semantic/Text";
import Card from "../shared/semantic/Card";
import Grid from "../shared/semantic/Grid";
import Button from "../shared/semantic/Button";

const VideoSermons: FC = () => {
    return (
        <Flex direction="col" items="center">
            <Flex direction="col" items="center" className="max-w-6xl mx-auto space-y-8 py-8">
                <Heading variant="section">Latest Message</Heading>
                <Flex direction="col" className="px-32">
                    <Card className="px-0 py-0">
                        {/* image */}
                        <img src={'/video_sermons.png'} className="mb-0" />
                        <Flex direction="col" className="space-y-4 p-4">
                            <Heading variant="section">Walking in Faith: Trusting God's Plan</Heading>
                            <Text variant="body" className="text-text-muted">Pastor Danny explores how we can trust God's plan even when we can't see the full picture. Join us as we dive into Scripture and discover practical ways to strengthen our faith journey.</Text>
                            <Flex direction="row" justify="between" className="py-2">
                                <Text variant="body" className="text-text-muted">December 1, 2024</Text>
                                <Text variant="body" className="text-text-muted">45 minutes</Text>
                                <Text variant="body" className="text-text-muted">1.2k views</Text>
                            </Flex>
                        </Flex>
                    </Card>
                </Flex>


            </Flex>
            {/* Recent Messages */}
            <Heading variant="section">Recent Messages</Heading>
            <Flex direction="col" items="center" className="px-32 space-y-8 py-8">
                <Grid gap={8} className="grid-cols-3 grid-row-2">
                    <Card className="px-0 py-0">
                        {/* image */}
                        <img src={'/video_sermons.png'} className="mb-0" />
                        <Flex direction="col" className="space-y-4 p-4">
                            <Heading variant="section">Walking in Faith: Trusting God's Plan</Heading>
                            <Text variant="body" className="text-link text-text-muted">Pastor Danny explores how we can trust God's plan even when we can't see the full picture. Join us as we dive into Scripture and discover practical ways to strengthen our faith journey.</Text>
                            <Flex direction="row" justify="between" className="py-2">
                                <Text variant="body" className="text-link text-text-muted">December 1, 2024</Text>
                                <Text variant="body" className="text-link text-text-muted">42 min</Text>
                            </Flex>
                        </Flex>
                    </Card>
                </Grid>
                <Button className="w-fit">Load More Videos</Button>
            </Flex>
        </Flex>
    )
}

export default VideoSermons;