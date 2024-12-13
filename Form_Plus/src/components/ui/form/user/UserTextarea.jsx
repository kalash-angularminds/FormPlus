import React from 'react'
import { Input } from '../../input'
import { useDispatch, useSelector } from 'react-redux'
import { setAnswer } from '@/features/ResponseSlice';
import { Textarea } from '../../textarea';

function UserTextarea({ type, required, id }) {
    const dispatch = useDispatch();
    const currentResponse = useSelector(state => {
        const answer = state.response.formResponse.find(item => item.questionId === id);
        return answer ? answer.answer : '';
    });
    // console.log("current response", currentResponse);
    const handleChange = (e) => {
        const newAnswer = e.target.value;
        dispatch(setAnswer({ id, answer: newAnswer }));
    };
    return (
        <>
            <Textarea row={2} type={type} required={required} value={currentResponse} onChange={handleChange} />
        </>
    )
}

export default UserTextarea