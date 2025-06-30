

import BibleStudies from "../components/BibleStudies";
import Ministries from "../components/Ministries";
import PageLayout from "../shared/layouts/PageLayout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "../shared/semantic/Tabs";

const SmallGroups = () => {
    return (
        <PageLayout pageId="smallGroups">
            <Tabs>
                <TabList>
                    <Tab index={0}>Bible Studies</Tab>
                    <Tab index={1}>Ministries</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel index={0}>
                        <BibleStudies />
                    </TabPanel>
                    <TabPanel index={1}>
                        <Ministries />
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </PageLayout>
    )
}

export default SmallGroups;
