import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import styles from '../styles/dashboard.module.css'
import eyeicon from '../images/eyeicon.svg'
import { getQuizzesFunction, getTrendingQuizzesFunction } from '../apis/Quiz'
function Dashboard({setGlobalQuizes}) {
  const [quizesForDashboard,setQuizesForDashboard]= useState([]);
  const [impressionSorted,setImpressionSorted]= useState([]);
  const [totalQuestions,setTotalQuestions]= useState(0);
  const [impressions,setImpressions]= useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQuizzesFunction();
        setQuizesForDashboard(response.data.quizes)

        const allQuizes = await getTrendingQuizzesFunction();
        setImpressionSorted(allQuizes.data.quizes)

        const allquestions = response.data.quizes.reduce((total, quiz) => {
          return total + quiz.questions.length;
        }, 0);
        setTotalQuestions(allquestions)

        const totalImpressions = response.data.quizes.reduce((total, quiz) => total + quiz.impressions, 0);
        setImpressions(totalImpressions)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const formattedDate = `${day} ${month}, ${year}`;
    return formattedDate;
  }

  return (
    <div className={styles.container}>
      <Navbar/>
      <div className={styles.rightBox}>
        <div className={styles.rightboxinner}>
        <div className={styles.topinfo}>
            <div className={styles.quizcreated}>
                <span className={styles.bigfont}>{quizesForDashboard.length} </span><span className={styles.mediumfont}> Quiz</span>
                <p className={styles.mediumfont}>Created</p>
            </div>
            <div className={styles.questionscreated}>
                <span className={styles.bigfont}>{totalQuestions}</span><span className={styles.mediumfont}> Questions</span>
                <p className={styles.mediumfont}>Created</p>
            </div>
            <div className={styles.totalimpressions}>   
                <span className={styles.bigfont}>{impressions<1000?impressions:`${(impressions/100)}K`}</span><span className={styles.mediumfont}> Total</span>
                <p className={styles.mediumfont}>Impressions</p>
            </div>
        </div>

        <div className={styles.trendingquizzes}>
            <h1 >Trending Quizs</h1>
            <div className={styles.cardsContainer}>
                {impressionSorted.map((quiz,idx)=>(
                  <div key={idx} className={styles.trendingcards}>
                    <div className={styles.title}>
                        <span>{quiz.quizname}</span>
                        <div className={styles.views}><span>{quiz.impressions} </span><img src={eyeicon} style={{margin:'0 2px'}} /></div>
                    </div>
                    <p>created on : {formatTimestamp(quiz.createdOn)}</p>
                  </div>
                ))}
            </div>
            {quizesForDashboard.length===0&&<p style={{'fontSize':'2rem',padding:'2%',color:'red',fontWeight:'500',textAlign:'center'}}>No quizzes created , click on <b style={{fontSize:'2rem',color:'#474444'}}>'create quiz'</b> to create quiz</p>}
            {quizesForDashboard.length!=0&&impressionSorted.length===0&&<p style={{'fontSize':'2rem',padding:'2%',color:'#474444',fontWeight:'500',textAlign:'center'}}>No quiz is trending <b style={{fontSize:'2rem',color:'#474444'}}>'Share your quiz for trending'</b></p>}
        </div>
        
        </div>
      </div>
    </div>
  )
}

export default Dashboard
