

import AudioSermons from "../components/AudioSermons";
import VideoSermons from "../components/VideoSermons";
import PageLayout from "../shared/layouts/PageLayout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "../shared/semantic/Tabs";

const Messages = () => {
    return (
        <PageLayout pageId="messages">
            <Tabs>
                <TabList>
                    <Tab index={0}>Video Sermons</Tab>
                    <Tab index={1}>Audio Sermons</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel index={0}>
                        <VideoSermons />
                    </TabPanel>
                    <TabPanel index={1}>
                        <AudioSermons />
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </PageLayout>
    )
}

export default Messages
