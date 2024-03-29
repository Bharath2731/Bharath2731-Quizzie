import React, { useEffect, useRef, useState } from "react";
import { getQuizFunction, quizImpressionFunction, updateAfterTakingQuizFunction } from "../apis/Quiz";
import styles from "../styles/takequiz.module.css";
import trophy from '../images/trophy.png'
import axios from "axios";
function TakeQuiz({ id }) {
  const [quiz, setQuiz] = useState();
  const [quizUpdated, setQuizUpdated] = useState();
  const [currIdx, setCurrIdx] = useState(0);
  const [results, setResults] = useState([]);
  const [fScore, setFscore] = useState(0);
  const [selectedOption, setSelectedOption] = useState();
  const referenceQuiz=useRef(null);
  const [showResultDiv,setShowResultDiv] = useState(false)
  const[timer,setTimer] = useState();
  const [timeLeft,setTimeLeft]=useState();
  useEffect(() => {
    // console.log(id)
    async function impressionUpdate() {
      try {
        await quizImpressionFunction(id);
      } catch (error) {
        console.log(error);
      }
    }
    impressionUpdate();

    async function fetchQuiz() {
      try {
        const response = await getQuizFunction(id);
        setQuiz({...response.data.quiz});
        setQuizUpdated({...response.data.quiz});
        setTimer(response.data.quiz?.timer)
        setTimeLeft(response.data.quiz?.timer)
        referenceQuiz.current = JSON.parse(JSON.stringify(response.data.quiz));//by doing this it will create copy of that and not reference.
        const initialResults = [];
        for (let i = 0; i < quiz?.questions.length; i++) {
          initialResults[i] = 0;
        }
        setResults(initialResults)
      } catch (error) {
        console.log(error);
      }
    }
    fetchQuiz();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimer) => {
        if (prevTimer === 0) {
          if (currIdx < quiz?.questions.length - 1) {
            handleNext()
            return timer;
          } else {
            handleSubmit();
            clearInterval(interval);
            return prevTimer;
          }
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    // Cleanup interval on component unmount or when moving to the next question
    return () => clearInterval(interval);
  }, [timeLeft, currIdx]);


  function handleNext() {
    if (currIdx < quiz?.questions.length - 1) {
      setCurrIdx(currIdx + 1);
      setSelectedOption()
      setTimeLeft(timer)
    }
  }

  function handleOptionClick(option,idx) {
    setSelectedOption(idx);
    setResults((prev)=>{
        if(prev){
          const beforeselect = [...prev]
      if(option.iscorrect){
        beforeselect[currIdx]=1;
        
      }else{
        beforeselect[currIdx]=0;
      }
      
      setQuizUpdated((prev)=>{
        const gettingUpdated = { ...prev };
        // const originalOptionCount = referenceQuiz.current.questions[currIdx].options[idx].optionSelectedBystudent;
        // gettingUpdated.questions[currIdx].options[idx].optionSelectedBystudent = originalOptionCount + 1;

        //undoing the selected option and increasing the current selected option
        for(let i=0;i<gettingUpdated?.questions[currIdx].options.length;i++){
          if(i==idx){
            gettingUpdated.questions[currIdx].options[i].optionSelectedBystudent=referenceQuiz.current.questions[currIdx].options[i].optionSelectedBystudent +1;
          }
          else{
            gettingUpdated.questions[currIdx].options[i].optionSelectedBystudent=referenceQuiz.current.questions[currIdx].options[i].optionSelectedBystudent
          }
        }
        return gettingUpdated;
      })
      console.log(quizUpdated)
      // setResults(beforeselect)
      return beforeselect
        }
      })

  }

  function findScore(){
    let score =0;
    for(let i=0;i<results.length;i++){
      if(results[i]==1)score++;
    }
    return score;
  }
  async function handleSubmit(){
    console.log('final state:',quizUpdated)
    setShowResultDiv(true)
    setFscore(findScore())
    try {
      const response = await updateAfterTakingQuizFunction(id,quizUpdated)
      console.log(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }
  
  return (
    <div className={styles.container}>
      {!showResultDiv&&<div className={styles.innerBox}>
        <div className={styles.questonNumberAndTimer}>
          <span className={styles.questionNumber}>
            0{currIdx + 1}/0{quiz?.questions.length}
          </span>
          {((timer!='off')&&timer)&&<span className={styles.timer}>00:{timeLeft==10?`${timeLeft}s`:`0${timeLeft}s`}</span>}
        </div>
        <div className={styles.questionText}>
          {quiz?.questions[currIdx].question}
        </div>
        <div className={styles.options}>
          {quiz?.questions[currIdx].options.map((option, idx) => (
            <div
              className={`${styles.optionCard} ${
                selectedOption === idx ? styles.selectedOption : ""}`}
              key={idx}
              onClick={() => handleOptionClick(option,idx)}
            >
              {quiz?.questions[currIdx].optionType === "text" && (
                <div>
                  <span className={styles.optionText}>{option?.optionText}</span>
                </div>
              )}
              {quiz?.questions[currIdx].optionType === "imageUrl" && (
                <div className={styles.onlyImageBox}>
                  <img src={option.optionUrl} alt="" className={styles.optionImage} />
                </div>
              )}
              {quiz?.questions[currIdx].optionType === "textAndImageUrl" && (
                <div className={styles.imageandtextBox}>
                  <span className={styles.optionText}>{option?.optionText}</span>
                  <img src={option?.optionUrl} alt=""  className={styles.optionImage}/>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.nextAndSubmitBtn}>
          {currIdx < quiz?.questions.length - 1 && (
            <button onClick={handleNext}>NEXT</button>
          )}
          {currIdx == quiz?.questions.length - 1 && <button onClick={handleSubmit}>SUBMIT</button>}
        </div>
      </div>}

      {showResultDiv&&<div className={styles.innerBox}>
        {quiz?.quiztype=='QandA'&&
        <div className={styles.qandaResults}>
          <span>Congrats Quiz is Completed</span>
          <img src={trophy} alt="" /> 
          <span>your Score is  <span className={styles.score}>0{fScore}/0{quiz?.questions.length}</span></span>
        </div>
        }
        {quiz?.quiztype=='Poll Type' &&
        <div className={styles.pollResult}>
          <span>Thank you for participating in the Poll</span>
        </div>
        }
      </div>}
    </div>
  );
}

export default TakeQuiz;
