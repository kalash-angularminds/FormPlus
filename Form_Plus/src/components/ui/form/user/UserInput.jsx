import React from 'react'
import { Input } from '../../input'
import { useDispatch, useSelector } from 'react-redux'
import { setAnswer } from '@/features/ResponseSlice';

function UserInput({ type, required, id }) {
    const dispatch = useDispatch();
    const currentResponse = useSelector(state => {
        const answer = state.response.formResponse.find(item => item.questionId === id);
        return answer ? answer.answer : '';  
    });
    // console.log("current response", currentResponse);
    const handleChange = (e) => {
        const newAnswer = e.target.value;  
        dispatch(setAnswer({  id, answer: newAnswer }));  
    };
  return (
      <>
          <Input type={type} required={required} value={currentResponse} onChange={handleChange} />
      </>
  )
}

export default UserInput