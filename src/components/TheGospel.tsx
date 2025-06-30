import type { FC } from "react";
import Text from "../shared/semantic/Text";
import Spa from '@mui/icons-material/Spa';
import Card from "../shared/semantic/Card";
import Flex from "../shared/semantic/Flex";
import Heading from "../shared/semantic/Heading";
import IconContainer from "../shared/semantic/IconContainer";
import Button from "../shared/semantic/Button";

const TheGospel: FC = () => {
    return (
        <Flex direction="col" items="center" className="space-y-4 mx-autow py-12">
            <Heading variant="content">The Gospel</Heading>
            <Text variant="body" className="text-[20px] text-center">"For God so loved the world that he gave his one and only Son" - John 3:16</Text>
            <Card className="bg-gradient-primary text-center">
                <Heading variant="section" className="text-bg-primary">The Greatest Story Ever Told</Heading>
                <Heading variant="section-subheader" className="text-bg-primary">The Gospel is God's plan of salvation - a story of creation, fall, redemption, and restoration that spans all of history and offers hope to every person.</Heading>
            </Card>
            <Flex direction="col" className="py-8 space-y-8">
                <Flex direction="row" items="center" className="gap-24">
                    <Flex direction="col" items="center" gap={4} className="max-w-fit">
                        <IconContainer className="bg-status-success/20" size="xl" shape="circle">
                            <Spa className="text-status-success" fontSize="large" />
                        </IconContainer>
                        <Heading variant="section" className="text-text-primary">Creation</Heading>
                    </Flex>
                    <Card accent="left" accentColor="success">
                        <Text variant="body" className="text-text-primary">Then man rebelled against God and was deceived by Satan to disobey God's command. Sin has separated us from God. We have all fallen short of God's perfect standard and cannot earn our way to heaven.</Text>
                        <Text variant="body" className="text-text-muted">Genesis 3; Romans 3:10; Romans 3:23</Text>
                    </Card>
                </Flex>
                <Flex direction="row" items="center" className="gap-24 flex-row-reverse">
                    <Flex direction="col" items="center" gap={4} className="max-w-fit">
                        <IconContainer className="bg-status-error/20" size="xl" shape="circle">
                            <Spa className="text-status-error" fontSize="large" />
                        </IconContainer>
                        <Heading variant="section" className="text-text-primary">Creation</Heading>
                    </Flex>
                    <Card accent="left" accentColor="error">
                        <Text variant="body" className="text-text-primary">Someone has to pay the price for sin in our hearts. Jesus who is God, came to die and pay the price for your sin. He lived the life you couldn't, died the death that you deserved, and defeated sin and death in His resurrection. By faith alone in Jesus one can have their sins forgiven, and have eternal life with God.</Text>
                        <Text variant="body" className="text-text-muted">1 Peter 3:18; Galatians 1:4</Text>
                    </Card>
                </Flex>
                <Flex direction="row" items="center" className="gap-24">
                    <Flex direction="col" items="center" gap={4} className="max-w-fit">
                        <IconContainer className="bg-primary-dark/20" size="xl" shape="circle">
                            <Spa className="text-primary-dark" fontSize="large" />
                        </IconContainer>
                        <Heading variant="section" className="text-text-primary">Creation</Heading>

                    </Flex>
                    <Card accent="left" accentColor="primary">
                        <Text variant="body" className="text-text-primary">One day everything will be restored back to God's design, and those who trust Jesus by faith will enjoy eternity in the new heaven and earth.</Text>
                        <Text variant="body" className="text-text-muted">Revelation 21:1-4; Ephesians 2:8-9</Text>
                    </Card>
                </Flex>
                <Flex direction="row" items="center" className="gap-24 flex-row-reverse">
                    <IconContainer className="bg-text-tertiary/20" size="xl" shape="circle">
                        <Spa className="text-text-tertiary" fontSize="large" />
                    </IconContainer>
                    <Card accent="left" accentColor="tertiary">
                        <Text variant="body" className="text-text-primary">In the beginning God created everything and it was perfect. There was no sickness, no disease, no sadness, and no sin. Everything lived in harmony with God.</Text>
                        <Text variant="body" className="text-text-muted">Genesis 1:1; Psalm 90:2</Text>
                    </Card>
                </Flex>
            </Flex>
            <Flex direction="col" items="center" className="bg-bg-section p-8 space-y-4">
                <Heading variant="section">Your Response Matters</Heading>
                <Text variant="body" className="text-center">The Gospel isn't just a story - it's an invitation. God is calling you to respond to His love and grace through faith in Jesus Christ.</Text>
                <Flex direction="row" justify="center" className="gap-4">
                    <Button variant="primary">Accept Jesus Today</Button>
                    <Button variant="white" className="border-2 border-primary-dark">Learn More</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default TheGospel;