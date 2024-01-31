import React, { useState ,useEffect} from "react";
import styles from "../styles/analytics.module.css";
import Navbar from "./Navbar";
import shareIcon from "../images/shareIcon.png";
import editIcon from "../images/editIcon.png";
import deleteIcon from "../images/deleteIcon.png";
import DeleteQuiz from "./DeleteQuiz";
import UpdateQandA from "./UpdateQandA";
import { getQuizzesForAnalyticsFunction } from "../apis/Quiz";
import { useNavigate } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QandAtemplate from "./QandAtemplate";
function Analytics({globalQuizes,setGlobalQuizes}) {
  const [clipBoardText,setClipBoardText]= useState('https://quizzie0724.vercel.app/takeQuiz/')
  //to show update popup on clicking edit icon
  const [showupdatePopup,setShowupdatePopup]=useState(false)
  const [updateQuiz,setUpdateQuiz] = useState();

  const navigate = useNavigate()
  
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const formattedDate = `${day} ${month}, ${year}`;
    return formattedDate;
  }
  const [deleteQuizId,setDeleteQuizId]=useState()
  const [showDeleteQuiz,setShowDeleteQuiz]=useState(false)
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getQuizzesForAnalyticsFunction();
          setGlobalQuizes(response.data.quizes)

        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
  }, [showDeleteQuiz]);
  function handleShowDeleteQuiz(quiz_id){
    setShowDeleteQuiz(!showDeleteQuiz)
    setDeleteQuizId(quiz_id)
    console.log(deleteQuizId)
  }
  
function goToAnalyticsQuiz(quiz){
    navigate(`qanda/${quiz._id}`)
  
}
function showCopyToast(){
  toast.success('Link copied to Clipboard', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    })
}

function handleEditPopup(quiz){
  setUpdateQuiz(quiz)
  setShowupdatePopup(true)
  console.log(quiz)
}
  return (
      <div className={styles.container}>
      <Navbar/>
      {showDeleteQuiz&&<DeleteQuiz handleShowDeleteQuiz={handleShowDeleteQuiz} deleteQuizId={deleteQuizId} />}
      <div className={styles.rightBox}>
        <h1>Quiz Analysis</h1>
        <div className={styles.cardsOuter}>
          <div className={styles.cardsTitleBar}>
            <span className={styles.sNo}>S.No</span>
            <span className={styles.quizName}>Quiz Name</span>
            <span className={styles.createdOn}>Created On</span>
            <span className={styles.impressions}>Impressions</span>
          </div>
          <div className={styles.cardsContainer}>
          {globalQuizes.map((quiz, idx) => (
            <div
              key={idx}
              className={`${
                idx % 2 == 0 ? styles.evenIdxCard : styles.oddIdxCard
              } `}
            >
              <span className={styles.sNo}>{idx + 1}</span>
              <span className={styles.quizName}>{quiz.quizname}</span>
              <span className={styles.createdOn}>{formatTimestamp(quiz.createdOn)}</span>
              <span className={styles.impressions}>{quiz.impressions}</span>
              <span className={styles.editDeleteShare}>
                <img src={editIcon} alt="" onClick={()=>handleEditPopup(quiz)}/>
                {(showupdatePopup)&&<UpdateQandA updateQuiz={updateQuiz} setShowupdatePopup={setShowupdatePopup} />}
                <img src={deleteIcon} alt="" onClick={()=>(handleShowDeleteQuiz(quiz._id))} />
                <CopyToClipboard text={`${clipBoardText}${quiz._id}`}>
                  <img src={shareIcon} alt="" onClick={showCopyToast}/>
                </CopyToClipboard>
              </span>
              <span className={styles.analysisLink} onClick={()=>{goToAnalyticsQuiz(quiz)}}>Question Wise Analysis</span>
            </div>
          ))}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Analytics;
