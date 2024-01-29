import React from 'react'
import AnalyticsQuiz from '../components/AnalyticsQuiz'
import { useParams } from 'react-router-dom'
function AnalyticsQuizPage() {
  const {id}=useParams()
  return (
    <div>
      <AnalyticsQuiz id={id}/>
    </div>
  )
}

export default AnalyticsQuizPage
