import type { FC } from "react";
import Container from "../shared/semantic/Container";
import Flex from "../shared/semantic/Flex";
import Heading from "../shared/semantic/Heading";
import Text from "../shared/semantic/Text";
import Input from "../shared/semantic/Input";
import Button from "../shared/semantic/Button";

const ContactBanner: FC = () => {
    return (
            <Container className="bg-primary-dark py-12">
                <Flex direction="col" items="center" className='max-w-[50%] mx-auto space-y-6'>
                    <Heading as="h2" variant="section" className="text-text-inverted">Stay Connected</Heading>
                    <Text as="p" variant="body" className="text-text-inverted">Subscribe to our weekly newsletter to receive updates on events, sermons, and church announcements.</Text>
                    <Flex direction="col" gap={4} className="w-full">
                        <Flex direction="row" gap={4} items="center" justify='center' >
                            <Input type="text" placeholder="Your email address" />
                            <Button as="button" variant="secondary">Subscribe</Button>
                        </Flex>
                        <Text as="p" variant="footer-link" className="text-primary-light mx-auto">We respect your privacy. Unsubscribe at any time.</Text>
                    </Flex>
                </Flex>
            </Container>
    );
}

export default ContactBanner;