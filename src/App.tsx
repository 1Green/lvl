import { Tab, Tabs } from '@mui/material'
import { ReactNode, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { data } from './data/acts'

type Steps = {
  label: string;
  description: string;
}

type TabPanelProps = {
  children: ReactNode
  index: number
  value: number
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const dataToSteps = (data: string[]) => {
  return data.reduce((acc, val, i) => {
    return [...acc, { label: '', description: val}]
  }, [] as Steps[])
}

export default function App() {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: SyntheticEvent<Element, Event>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Act I" {...a11yProps(0)} sx={{color: 'white'}}/>
          <Tab label="Act II" {...a11yProps(1)} sx={{color: 'white'}}/>
          <Tab label="Act III" {...a11yProps(2)} sx={{color: 'white'}}/>
          <Tab label="Act IV" {...a11yProps(3)} sx={{color: 'white'}}/>
          <Tab label="Act V" {...a11yProps(4)} sx={{color: 'white'}}/>
          <Tab label="Act VI" {...a11yProps(5)} sx={{color: 'white'}}/>
          <Tab label="Act VII" {...a11yProps(6)} sx={{color: 'white'}}/>
          <Tab label="Act VIII" {...a11yProps(7)} sx={{color: 'white'}}/>
          <Tab label="Act IX" {...a11yProps(8)} sx={{color: 'white'}}/>
          <Tab label="Act X" {...a11yProps(9)} sx={{color: 'white'}}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Act n={value}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Act n={value}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Act n={value}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Act n={value}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Act n={value}/>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Act n={value}/>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Act n={value}/>
      </TabPanel>
      <TabPanel value={value} index={7}>
        <Act n={value}/>
      </TabPanel>
      <TabPanel value={value} index={8}>
        <Act n={value}/>
      </TabPanel>
      <TabPanel value={value} index={9}>
        <Act n={value}/>
      </TabPanel>
    </Box>
  )
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Act = ({n}: { n: number})  => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = dataToSteps(data[n])
  const ref = useRef<HTMLDivElement>()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };


  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      ref.current?.scrollIntoView({behavior: 'smooth', block: 'center'})
        if (event.key === " " || event.key === 'Enter') {
          event.preventDefault()
          handleNext();
        }
        if (event.key === "Backspace") {
          handleBack();
        }
        if (event.key === "r") {
          handleReset();
          ref.current?.scrollIntoView({behavior: 'smooth'})
        }

    },
    [handleNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Box sx={{  maxWidth: '900px', margin: '0 auto', color: 'white', backgroundColor: '#333', maxHeight: '100vh', overflowY: 'auto', pr: 2}}>
      <Stepper activeStep={activeStep} orientation="vertical" sx={{ ml: 2}}>
        {steps.map((step, index) => (
          <Step key={step.label || index} ref={index === activeStep ? ref : null} >
            <StepLabel StepIconProps={{sx: { color: '#33A'}}}>
              {step.label}
            </StepLabel>
            <StepContent>
              <Card elevation={3} sx={{backgroundColor: '#444', padding: '16px', color: 'white'}}>
                <Typography>{step.description}</Typography>
              </Card>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 2, mr: 1, color: 'white' }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    sx={{ mt: 2, mr: 1, color: 'white' }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
