import React, { useState } from "react";
import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Box,
  Grid,
} from "@chakra-ui/react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import PreviewCard from "./PreviewCard";

const CustomTab = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins">
      {children}
    </Tab>
  );
};

const HomeLayout = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleNextTab = () => {
    setActiveTab((prevTab) => Math.min(prevTab + 1, 2));
  };

  const handlePreviousTab = () => {
    setActiveTab((prevTab) => Math.max(prevTab - 1, 0));
  };

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs
          isLazy
          index={activeTab}
          onChange={() => {}}
        >
          <TabList>
            <CustomTab isDisabled={activeTab !== 0}>Requisition Details</CustomTab>
            <CustomTab isDisabled={activeTab !== 1}>Job Details</CustomTab>
            <CustomTab isDisabled={activeTab !== 2}>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm handleNextTab={handleNextTab} />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm
                  handleNextTab={handleNextTab}
                  handlePreviousTab={handlePreviousTab}
                />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm
                  handlePreviousTab={handlePreviousTab}
                />
              </TabPanel>
            </TabPanels>
            <PreviewCard />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;