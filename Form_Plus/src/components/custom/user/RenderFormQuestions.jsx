import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'
import RenderFieldType from './RenderFieldType'
import { useSelector } from 'react-redux'

function RenderFormQuestions() {
  const questions = useSelector(state => state.response.questions)
  return (
    <>
        <Card className="p-2">
      {questions?.map((question,i) => (
        <CardContent key={i}>
          <h3> {question.title} <span className='text-red-700'> {question.required && "*"}</span></h3>
            <RenderFieldType question={question}  />
          </CardContent>
      ))}
      </Card>
    </>
  )
}

export default RenderFormQuestions