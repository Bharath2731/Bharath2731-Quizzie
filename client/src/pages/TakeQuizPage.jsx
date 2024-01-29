import React from 'react'
import { useParams } from 'react-router-dom'
import TakeQuiz from '../components/TakeQuiz'

function TakeQuizPage() {
    const {id}= useParams()
  return (
    <div>
        <TakeQuiz id = {id}/>
    </div>
  )
}

export default TakeQuizPage
