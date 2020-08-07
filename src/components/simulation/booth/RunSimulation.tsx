import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../../style/simulation.css';

import Spinner from './Spinner';
import JobSummary from './JobSummary';

import data from '../../../json/Simulation.json'; // Data related to jobs

const Wrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-columns: 25% 50% 25%;
  place-items: center;
  justify-items: center;
`;

const ScreenCenter = styled.div`
  grid-row: 1 / span 1;
  grid-column: 2 / span 1;
  text-align: center;
`;

interface career {
  position: String;
  monthlySalary: number;
  annualSalary: number;
  hourlyRate: number;
  federalTax: number;
  socialSecurity: number;
  medicare: number;
  stateTax: number;
  education: string;
}

const RunSimulation = (): JSX.Element => {
  const [simStage, setSimStage] = useState('Job-Selection'); //Used for switching between the stages of the simulation

  const [jobOptions, setJobOptions] = useState([]); // Job options available to players
  const [myCareer, setMyCareer] = useState<career | undefined>(undefined);

  /**
   * Extracts job options from Simulation.json and stores in "jobOptions"
   */
  const getJobOptions = () => {
    let tempJobs = new Array();
    for (let job of data.jobs) {
      for (let occupation of job.occupations) {
        tempJobs.push(occupation.position);
      }
    }

    setJobOptions(tempJobs);
  };

  useEffect(() => {
    getJobOptions();
  }, []);

  // Let sipnner set the career.
  useEffect(() => {}, []);

  return (
    <Wrapper>
      <ScreenCenter>
        {simStage === 'Job-Selection' && (
          <Spinner
            jobOptions={jobOptions}
            setMyCareer={setMyCareer}
            setSimStage={setSimStage}
          />
        )}
        {simStage === 'Job-selected' && (
          <>
            <JobSummary career={myCareer} />{' '}
            <button className="customButton" style={{ marginTop: '2%' }}>
              Continue
            </button>
          </>
        )}
      </ScreenCenter>
    </Wrapper>
  );
};

export default RunSimulation;
