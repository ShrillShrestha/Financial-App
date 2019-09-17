import React, {useState, useEffect} from 'react';
import Wheel from './Wheel';
import styled from 'styled-components';
import data from './Simulation.json'; 
import BoothSelect from './BoothSelect'
import Booth from './Booth'
import { SelectInput } from '..';


const Wrapper = styled.div`
display: grid;
grid-template-rows: auto; 
min-height: 100vh;
grid-template-columns: 25% 50% 25%;
place-items: center;
justify-items: center;
`;

const WheelPlace = styled.div`
grid-row: 2 / span 1;
grid-column: 2 / span 1
`;

const Button = styled.div`
grid-row: 3 / span 1;
`;

const UserInfo = styled.div`
backgorund: grey;
grid-row: 2 / span 1;
grid-column: 1 / span 1;
`;

/**
 * SimulationStart.tsx
 * 
 * @author: Nicholas Salter
 * @desc: Called by [Simulation]. Switches between the different stages of the simulation
 * @param {string}   stage        The current stage of the entire simulation (preTest, simulation, postTest)
 * @param {Function} setStage     Sets the overal stage of the simulation (preTest, simulation, postTest)
 * @return TSX to be rendered.
 */
const SimulationStart = ({stage, setStage}:any) => {

    const [edlevel, setEd] = useState(null); //Sets the users education level (Used in Wheel.tsx)
    const [job, setJob] = useState(null); //Sets the users job (Used in Wheel.tsx)
    
    const [simStage, setSimStage] = useState(null) //Used for switching between the stages of the simulation
    const [currentBooth, setCurrentBooth] = useState(null)

    const { education} = data; //string array of the education options

    const [currentIncome, setIncome] = useState(null);

    const [jobOptions, setJobOptions] = useState(null);



    //Setting the simStage to education at the begging of the simuatlion 
    if(stage==="simulation" && simStage === null){ 
        
        
        
        
        
        setSimStage("boothSelect"); //CHANGED FOR DEBUGGING, SET TO {"education"} TO RUN PROPERLY




         
    }

    console.log("STAGE: " + simStage);

    const {jobs} = data
    let x  = new Array();
    let counter = 0;

    if( job == null || currentIncome == null){

        for(var i = 0; i < jobs.length; i++){
            for(var j = 0; j < jobs[i].occupations.length;j++)
            {
                
                if(job == null && currentIncome == null){

                    x[counter] = jobs[i].occupations[j].position;

                    counter++;

                }
                else if(job != null && currentIncome == null)
                {
                    if(jobs[i].occupations[j].position == job){
                        
                        setIncome(jobs[i].occupations[j].grossmonthly);
                        
                        console.log("SETINCOME");
                    }
                }
            }
        }
    }

    useEffect(() => { setJobOptions(x);}, []);




return(
        <Wrapper>

    

            {/**Displaying the spinner based on which stage the user is on */}
            <WheelPlace style={{top:'10vh'}}>
                {simStage === "education" && <Wheel input={education} stage={simStage} setChoice={setEd} setStage={setSimStage}/>}
                {simStage === "job" ?
                <>
                    <Wheel input={jobOptions} stage={simStage} setChoice={setJob} setStage={setSimStage}/>
                </>
                :
                    <></>
                }
                
                
                {simStage == "boothSelect" ?
                    <div>
                        <UserInfo>
                            Current Income: {currentIncome}
                        </UserInfo>
                        <BoothSelect setSimStage={setSimStage} setCurrentBooth={setCurrentBooth}/>
                    </div>
            
                :
                    <></>
                }
                
                
                {simStage == "booth" ?
                
                    <div>
                        <Booth setSimStage={setSimStage} currentBooth={currentBooth} data={data} 
                                currentIncome={currentIncome} setIncome={setIncome}/>
                                
                        <UserInfo>
                            Current Income: {currentIncome}
                        </UserInfo>

                    </div>
                :
                    <></>
                }

            </WheelPlace>
            
            {/**Display the button to take the PostTest when the user has reached the end of the simulation */}
            <Button>
                {simStage === "postTest" && <button className="btn" onClick={(e)=> setStage('posttest')}>TO POSTTEST</button>}
            </Button>
            
        </Wrapper>
    )

}

export default SimulationStart;