import type { FC } from "react";
import Container from "../shared/semantic/Container";
import Flex from "../shared/semantic/Flex";
import Heading from "../shared/semantic/Heading";
import Text from "../shared/semantic/Text";
import Button from "../shared/semantic/Button";

const PrayerBanner: FC = () => {
    return (
            <Container className="bg-primary-dark py-12 text-center">
                <Flex direction="col" items="center" className='lg:max-w-[50%] mx-auto space-y-6'>
                    <Heading as="h2" variant="section" className="text-text-inverted">Need Prayer?</Heading>
                    <Text as="p" variant="body" className="text-text-inverted">Our prayer team would be honored to pray for you. Submit your prayer requests confidentially using our prayer form.</Text>
                    <Button as="button" variant="secondary">Submit Prayer Request</Button>
                </Flex>
            </Container>
    );
}

export default PrayerBanner;