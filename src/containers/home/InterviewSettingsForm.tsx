import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; 

import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import { useData } from "./DataProvider"; 

const InterviewDetailsForm: React.FC<{  handlePreviousTab: () => void }> = ({ handlePreviousTab }) => {
  const { state, setState } = useData()!; 

  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
      initialValues: state.interviewSettings, 

    validationSchema: Yup.object({
      interviewMode: Yup.string().required("Interview mode is required"),
      interviewDuration: Yup.string().required("Interview duration is required"),
      interviewLanguage: Yup.string().required("Interview language is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      setState((prevState) => ({
        ...prevState,
        interviewSettings: values,
      }));
      console.log({ values });
      alert("Form successfully submitted");
    },
  });

  const handleSelectChange = (name: keyof IInterViewSettings, value: any) => {
    // Update Formik's state
    setFieldValue(name, value);
    console.log({ name, value });
    // Update the context with the new value
    setState((prevState) => ({
      ...prevState,
      interviewSettings: {
        ...prevState.interviewSettings,
        [name]: value,
      },
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={handleSelectChange}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={handleSelectChange} 
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Job Location"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={handleSelectChange} 
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
        <Button colorScheme="gray" type="button" onClick={handlePreviousTab}>
        Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
