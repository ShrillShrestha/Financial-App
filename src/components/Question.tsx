import React from 'react';
import { NumberStr, QuestionStr, OptionButton } from '../style/preposttest';
import {Card, Grid} from '../style/styled';
import api from '../api';

/**
 * Question.tsx
 *
 * @desc: Called by [Test]. Displays question to be answered + answer choices.
 * @param {string}   id           question number
 * @param {string}   question     question to be answered
 * @param {string[]} answers      array of answer options
 * @param {string}   value        answer for current question
 * @param {Function} nextQuestion loads next question
 * @return TSX to be rendered.
 */

type Props = {
  id: string,
  question: string,
  answers: string[],
  value: string,
  storeSelection: Function,
  total: Number
}

const Question = ({id, question, answers, value, storeSelection, total}: Props)=>{

  const SubmitAnswer = (answer : string, id: string)=>{
                  const obj = {answer: answer, typesType:"preTest", q_id: id};
                           console.log(obj);
                           api.answer(obj)
                           .then(res => {
                               if (res.success) {
                                  console.log("success")
                               } else {
                              //   alert(res.message);
                               }
                             })
                             .catch(err => console.log(err));

                       };

  return (
    <Card>
        <NumberStr>Question {parseInt(id, 10) + 1} of {total}</NumberStr> 
        <QuestionStr>{question}</QuestionStr>
        <Grid cols="1">
          <ul className="answer-options">
            {answers.map((answer: string, i: any) =>
              <li>
                <OptionButton 
                  className="option" 
                  onClick={(e: any) => storeSelection(e.target.name, e.target.value)} 
                  key={i} 
                  value={answer}
                  disabled={value === answer} >
                    {answer}
                </OptionButton>
              </li>
            )}
          </ul>
        </Grid>
    </Card>
  )
};

export default Question;
