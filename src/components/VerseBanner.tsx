import type { FC } from "react";
import Container from "../shared/semantic/Container";
import Flex from "../shared/semantic/Flex";
import Heading from "../shared/semantic/Heading";
import Text from "../shared/semantic/Text";

const VerseBanner: FC = () => {
    return (
            <Container className="bg-primary-dark py-12 text-center">
                <Flex direction="col" items="center" className='max-w-[90%] lg:max-w-[50%] mx-auto space-y-6'>
                    <Heading as="h2" variant="section" className="text-text-inverted">"Bring the whole tithe into the storehouse, that there may be food in my house."</Heading>
                    <Text as="p" variant="body" className="text-text-inverted">Malachi 3:10</Text>
                </Flex>
            </Container>
    );
}

export default VerseBanner;