import React, { useState } from "react";
import styles from "../styles/createquiz.module.css";
import QandAtemplate from "./QandAtemplate";
import PollTypeTemplate from "./PollTypeTemplate";
import { createQuizFunction } from "../apis/Quiz";
import toast from "react-hot-toast";
import ShareLink from "./ShareLink";
function CreateQuiz({ handleShowcreatequiz }) {
  const [qnatype, setqnatype] = useState(false);
  const [polltype, setpolltype] = useState(false);
  const [quiztype, setQuiztype] = useState("");
  const [quizname, setQuizname] = useState("");
  const [questions, setquestions] = useState([
    {
      question: "",
      optionType:'text',
      options: [{ optionText: "", optionUrl: "", iscorrect: false },{ optionText: "", optionUrl: "", iscorrect: false }],
    },
  ]);
  const [timer, setTimer] = useState("off");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTemplate,setShowTemplate]=useState(false)
  const [showSharePopup,setShowSharePopup]=useState(false)

  //from backend getting quizid
  const [quizid,setQuizid]=useState()
  const handleqnatype = () => {
    setqnatype(true);
    setpolltype(false);
    setQuiztype("QandA");
  };
  const handlepolltype = () => {
    setpolltype(true);
    setqnatype(false);
    setQuiztype("Poll Type");
  };
  
  const handleShowTemplate=()=>{
    if(quizname.length==0){
      alert('Quiz name cannot be empty');
      return
    }
    if(quiztype==""){
      alert('Please select quiz type')
      return
    }
    setShowTemplate(true)
  }

  const handleCreateQuiz =async()=>{
    const userData = JSON.parse(localStorage.getItem('userData'));
    const quizInfo = {
      questions,
      quizname,
      timer,
      quiztype,
      impressions:0,
      createdBy:userData.email
    }
    try {
      const response = await createQuizFunction(quizInfo)
      // handleShowcreatequiz()  
      // this is for showing and hinding quiz popup
      setShowTemplate(false)
      setShowSharePopup(true)
      setQuizid(response.data.quizId)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <div>
      <div className={styles.blurwrapper}>
        <div className={styles.createpopup}>
          <div className={styles.inputdiv}>
            <input
              type="text"
              placeholder="Quiz name"
              value={quizname}
              onChange={(e) => setQuizname(e.target.value)}
            />
          </div>
          <div className={styles.quiztyeouter}>
            <div className={styles.quiztype}>
              <span>Quiz Type</span>
              <span
                className={`${styles.options} ${
                  qnatype && styles.optionselected
                }`}
                onClick={handleqnatype}
              >
                Q & A
              </span>
              <span
                className={`${styles.options} ${
                  polltype && styles.optionselected
                }`}
                onClick={handlepolltype}
              >
                Poll Type
              </span>
            </div>
          </div>
          <div className={styles.cancelandcontinuebox}>
            <div>
              <button
                className={styles.cancelbtn}
                onClick={handleShowcreatequiz}
              >
                Cancel
              </button>
              <button className={styles.continuebtn} onClick={handleShowTemplate}>Continue</button>
            </div>
          </div>
        </div>
        <div>
          {showSharePopup&&<ShareLink quizid={quizid} handleShowcreatequiz={handleShowcreatequiz}/>}
          {(quiztype == "QandA" )&&showTemplate? (
            <QandAtemplate
              questions={questions}
              setquestions={setquestions}
              timer={timer}
              setTimer={setTimer}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              handleShowcreatequiz={handleShowcreatequiz}
              handleCreateQuiz={handleCreateQuiz}
              setShowTemplate={setShowTemplate}
            />
          ) : (
            ""
          )}
          {(quiztype=="Poll Type")&&showTemplate&&
            <PollTypeTemplate
              questions={questions}
              setquestions={setquestions}
              timer={timer}
              setTimer={setTimer}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              handleShowcreatequiz={handleShowcreatequiz}
              handleCreateQuiz={handleCreateQuiz}
              setShowTemplate={setShowTemplate}
            />

          }
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;
