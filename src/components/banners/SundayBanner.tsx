import Container from "../../shared/semantic/Container";
import Flex from "../../shared/semantic/Flex";
import Heading from "../../shared/semantic/Heading";
import Text from "../../shared/semantic/Text";

const SundayBanner = (
        <Container className="bg-bg-primary rounded w-[90%] lg:w-[60%] shadow-lg p-6">
            <Flex direction="row" justify="between" items="center">
                <Flex direction="col" items="center" className="md:items-start text-center md:text-left">
                    <Heading as="h2" variant="section-subheader">
                        Join Us This Sunday
                    </Heading>
                    <Text as="span" variant="body" className="text-primary font-light">
                        Experience worship, community, and growth.
                    </Text>
                </Flex>

                <Flex direction="col" items="start" className="text-center sm:text-left gap-2 lg:gap-6" >
                    <Flex direction="col">
                        <Text as="p" variant="body" className="font-bold">
                            Sunday Services
                        </Text>
                        <Text as="p" variant="body" className="text-primary font-light">
                            9:00 AM & 11:00 AM
                        </Text>
                    </Flex>
                    <Flex direction="col">
                        <Text as="span" variant="body" className="font-bold">
                            Wednesday Bible Study
                        </Text>
                        <Text as="span" variant="body" className="text-primary font-light">
                            7:00 PM
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Container>
    );

export default SundayBanner;