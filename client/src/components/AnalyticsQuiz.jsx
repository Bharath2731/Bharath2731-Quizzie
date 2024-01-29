import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import styles from '../styles/analyticsqanda.module.css'
import { getQuizFunction } from '../apis/Quiz';
function AnalyticsQuiz({id}) {
    const [quiz,setQuiz]= useState();
    useEffect(()=>{
        const fetchData = async () => {
            try {
              console.log(id)
              const response = await getQuizFunction(id)
              setQuiz(response.data.quiz)
              console.log(quiz)
      
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchData();
    },[])
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getUTCDate();
        const month = monthNames[date.getUTCMonth()];
        const year = date.getUTCFullYear();
        const formattedDate = `${day} ${month}, ${year}`;
        return formattedDate;
      }

    function peopleAttempted(question){
        let count =0;
        for(let i=0;i<question.options.length;i++){
          count =count+question.options[i].optionSelectedBystudent;
        }
        return count;
    }

    function correctlyAnswered(question){
      let count=0;
      for(let i=0;i<question.options.length;i++){
        if(question.options[i].iscorrect){
          count=count+question.options[i].optionSelectedBystudent;
        }
      }
      return count;
    }

  return (
    <div className={styles.container}>
      <Navbar/>
      <div className={styles.rightBox}>
        <div className={styles.headingBox}>
            <h1 className={styles.h1}>{quiz?.quizname} Question Analysis</h1>
            <div>
                <p className={styles.orangeText}>Created On : {formatTimestamp(quiz?.createdOn)} </p>
                <p className={styles.orangeText}>Impressions : {quiz?.impressions} </p>
            </div>
        </div>
        <div className={styles.questionBox}>
            {quiz?.questions.map((questionObj,idx)=>(
                    <div key={idx}>
                        <h2 className={styles.h2}>Q.{idx+1} {questionObj.question}</h2>
                        {quiz?.quiztype==='QandA'&&
                          <div className={styles.cardsBox}>
                          <div className={styles.cards}>
                              <p  className={`${styles.span} ${styles.bigDigits}`}>{peopleAttempted(questionObj)}</p>
                              <p className={styles.span}>People attempted the question</p>
                          </div>
                          <div className={styles.cards}>
                              <p  className={`${styles.span} ${styles.bigDigits}`}>{correctlyAnswered(questionObj)}</p>
                              <p  className={styles.span}>People answered Correctly</p>
                          </div>
                          <div className={styles.cards}>
                              <p  className={`${styles.span} ${styles.bigDigits}`}>{peopleAttempted(questionObj)-correctlyAnswered(questionObj)}</p>
                              <p  className={styles.span}>People answerd Incorrectly</p>
                          </div>
                          </div>
                        }

                        {quiz?.quiztype==='Poll Type' &&
                          <div className={styles.pollCardsBox}>
                            {
                              questionObj?.options.map((option,idx)=>(
                                <div className={styles.pollCards} key={idx}>
                                  <span className={styles.bigDigits}>{option.optionSelectedBystudent}</span>
                                  <span className={styles.pollSpan}>Option {idx+1}</span>
                                </div>
                              ))
                            }
                            {/* <div className={styles.pollCards}>
                              <span className={styles.bigDigits}>0</span>
                              <span className={styles.pollSpan}>Option 3</span>
                            </div>
                            <div className={styles.pollCards}>
                              <span className={styles.bigDigits}>0</span>
                              <span className={styles.pollSpan}>Option 2</span>
                            </div>
                            <div className={styles.pollCards}>
                              <span className={styles.bigDigits}>0</span>
                              <span className={styles.pollSpan}>Option 4</span>
                            </div> */}
                          </div>

                        }
                        <div className={styles.line}>
                          {/* separation between question line */}
                        </div>
                    </div>
             ))}

        </div>
      </div>
    </div>
  )
}

export default AnalyticsQuiz
