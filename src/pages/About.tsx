

import MissionsAndValues from "../components/MissionsAndValues";
import TheGospel from "../components/TheGospel";
import WhatToExpect from "../components/WhatToExpect";
import PageLayout from "../shared/layouts/PageLayout";
import Flex from "../shared/semantic/Flex";

import { Tab, TabList, TabPanel, TabPanels, Tabs } from "../shared/semantic/Tabs";


const About = () => {
    return (
        <PageLayout pageId="about">
            <Flex direction="col" className="max-w-[70%] mx-auto">
                <Tabs>
                    <TabList>
                        <Tab index={0}>Missions & Values</Tab>
                        <Tab index={1}>The Gospel</Tab>
                        <Tab index={2}>What to Expect</Tab>
                    </TabList>

                    <TabPanels className="max-w-[80%] mx-auto">
                        <TabPanel index={0}>
                            <MissionsAndValues />
                        </TabPanel>
                        <TabPanel index={1}>
                            <TheGospel />
                        </TabPanel>
                        <TabPanel index={2}>
                            <WhatToExpect />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </PageLayout>
    )
}

export default About
