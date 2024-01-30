import React, { useState, useEffect } from "react";
import styles from "../styles/updateqanda.module.css";
import _ from "lodash";
import { updateAfterEditQuizFunction } from "../apis/Quiz";
function UpdateQandA({ updateQuiz , setShowupdatePopup}) {
  const [editQuiz, setEditQuiz] = useState(null);
  const [currIdx, setCurrIdx] = useState(0);
  const [editQuestions, setEditQuestions] = useState([]);
  const [finalUpdatedQuiz,setFinalUpdatedQuiz] = useState()

  // useEffect to update editQuiz when updateQuiz changes
  useEffect(() => {
    setEditQuiz(_.cloneDeep(updateQuiz));
    setEditQuestions(_.cloneDeep(updateQuiz.questions));
  }, []);
  useEffect(()=>{
    async function finalupdate(){
        if(finalUpdatedQuiz){
            try {
                const response = await updateAfterEditQuizFunction(finalUpdatedQuiz)
                setShowupdatePopup(false);
                console.log(response)
              } catch (error) {
                console.log(error)
              }
          }
    }
    finalupdate()
  },[finalUpdatedQuiz])
  const handleInputChange = (e) => {
    const newQuestion = _.cloneDeep(editQuestions[currIdx]);
    newQuestion.question = e.target.value;
    setEditQuestions((prevEditQuestions) => {
      const updatedQuestions = [...prevEditQuestions];
      updatedQuestions[currIdx] = newQuestion;
      return updatedQuestions;
    });
  };

  const [forceRender, setForceRender] = useState(0);
  useEffect(() => {
    setForceRender((prev) => prev + 1);
  }, [editQuestions]);

  const handleOptionType = (e) => {
    const newQuestion = _.cloneDeep(editQuestions[currIdx]);
    newQuestion.optionType = e.target.id;

    setEditQuestions((prevEditQuestions) => {
      const updatedQuestions = [...prevEditQuestions];
      updatedQuestions[currIdx] = newQuestion;
      return updatedQuestions;
    });
    setForceRender((prev) => prev + 1);
  };
  function handleoptionsTextInput(e){
    const index=e.target.name
    const newQuestion = _.cloneDeep(editQuestions[currIdx]);
    newQuestion.options[index].optionText = e.target.value;
  
    setEditQuestions((prevEditQuestions) => {
      const updatedQuestions = [...prevEditQuestions];
      updatedQuestions[currIdx] = newQuestion;
      return updatedQuestions;
    });
    // setForceRender((prev) => prev + 1);
  }
  function handleoptionsImageUrlInput(e){
    const index=e.target.name
    const newQuestion = _.cloneDeep(editQuestions[currIdx]);
    newQuestion.options[index].optionUrl = e.target.value;
  
    setEditQuestions((prevEditQuestions) => {
      const updatedQuestions = [...prevEditQuestions];
      updatedQuestions[currIdx] = newQuestion;
      return updatedQuestions;
    });
    // setForceRender((prev) => prev + 1);
  }

  function handleOptionCorrect(index) {
    const newQuestion = _.cloneDeep(editQuestions[currIdx]);
  newQuestion.options[index].iscorrect = true;
  newQuestion.options.forEach((option, i) => {
    if (i !== index) {
      option.iscorrect = false;
    }
  });
  setEditQuestions((prevEditQuestions) => {
    const updatedQuestions = [...prevEditQuestions];
    updatedQuestions[currIdx] = newQuestion;
    return updatedQuestions;
  });
    // setForceRender((prev) => prev + 1);
  }
  function handleTimerChange(newTimer) {
    const updatedEditQuiz = _.cloneDeep(editQuiz);
    updatedEditQuiz.timer = newTimer;
  
    setEditQuiz(updatedEditQuiz);
  }
  async function handleUpdateQuiz(){
    const updatedEditQuiz = _.cloneDeep(editQuiz);
    setEditQuiz((prev) => {
        
        updatedEditQuiz.questions = [...editQuestions]
        updatedEditQuiz.impressions = 0;
        updatedEditQuiz.questions.forEach((question) => {
          question.options.forEach((option) => {
            option.optionSelectedBystudent = 0; 
          });
        });
        setFinalUpdatedQuiz(updatedEditQuiz)
        return updatedEditQuiz;
    });
    console.log(updatedEditQuiz)
    const isTextOptionType = editQuestions[currIdx]?.optionType === "text";
    const isImageUrlOptionType = editQuestions[currIdx]?.optionType === "imageUrl";
    const isTextAndImageUrlOptionType = editQuestions[currIdx]?.optionType === "textAndImageUrl";
    const allQuestionsNotEmpty = editQuestions.every((question) => question.question.trim() !== "");
    if (isTextOptionType) {
      const allTextOptionsFilled = editQuestions[currIdx]?.options.every(
        (option) => option.optionText.trim() !== ""
      );
      if (allQuestionsNotEmpty && allTextOptionsFilled) {
        console.log("Update Quiz:", editQuiz);
      } else {
        alert("Please fill in all questions and text options.");
      }
    } else if (isImageUrlOptionType) {
      const allUrlOptionsFilled = editQuestions[currIdx]?.options.every(
        (option) => option.optionUrl.trim() !== ""
      );
      if (!(allQuestionsNotEmpty && allUrlOptionsFilled)) {
        alert("Please fill in all questions and URL options.");
      }
    } else if (isTextAndImageUrlOptionType) {
      const allTextAndUrlOptionsFilled = editQuestions[currIdx]?.options.every(
        (option) => option.optionText.trim() !== "" && option.optionUrl.trim() !== ""
      );
      if (allQuestionsNotEmpty && allTextAndUrlOptionsFilled) {
        console.log("Update Quiz:", editQuiz);
      } else {
        alert("Please fill in all questions, text, and URL options.");
      }
    }
    
      
  }
  return (
    <div className={styles.blurWrapper}>
      <div className={styles.centerBox}>
        <div className={styles.questions}>
          <div className={styles.questionNumbers}>
            {editQuiz?.questions.map((question, idx) => (
              <div
                key={idx}
                className={idx == currIdx && styles.selectedQuestion}
                onClick={() => setCurrIdx(idx)}
              >
                <span>{idx + 1}</span>
                {/* {idx>0&&<span className={styles.cancel} onClick={handleCancel}>X</span>} */}
              </div>
            ))}
          </div>
          <span>Max 5 Questions</span>
        </div>
        <div className={styles.questionInput}>
          <input
            type="text"
            value={editQuestions[currIdx]?.question}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.optionTypeDiv}>
          <span>option Type</span>
          <div>
            <input
              type="radio"
              id="text"
              name="optiontype"
              value="text"
              onChange={handleOptionType}
              checked={editQuestions[currIdx]?.optionType == "text"}
            />
            <label htmlFor="text">Text</label>
          </div>
          <div>
            <input
              type="radio"
              id="imageUrl"
              name="optiontype"
              value="imageUrl"
              onChange={handleOptionType}
              checked={editQuestions[currIdx]?.optionType == "imageUrl"}
            />
            <label htmlFor="imageUrl">Image Url</label>
          </div>
          <div>
            <input
              type="radio"
              id="textAndImageUrl"
              name="optiontype"
              value="textAndImageUrl"
              onChange={handleOptionType}
              checked={editQuestions[currIdx]?.optionType == "textAndImageUrl"}
            />
            <label htmlFor="textAndImageUrl">Text & Image url</label>
          </div>
        </div>
        <div className={styles.optionsAndTimer}>
          <div className={styles.options}>
            {editQuestions[currIdx]?.options.map((option, index) => (
              <div className={styles.optionsBox} key={index}>
                {editQuiz?.quiztype=='QandA'&&<input type="radio" name="options" checked={option.iscorrect} onChange={() => handleOptionCorrect(index)} />}
                {(editQuestions[currIdx]?.optionType == "text" ||
                  editQuestions[currIdx]?.optionType == "textAndImageUrl") && (
                  <input
                    type="text"
                    name={index}
                    className={`${styles.optionsInput} ${
                        editQuestions[currIdx]?.options[index].iscorrect &&
                      styles.correctOptionStyle
                    }`}
                    placeholder="Text"
                    value={editQuestions[currIdx]?.options[index].optionText}
                    onChange={handleoptionsTextInput}
                  />
                )}
                {(editQuestions[currIdx]?.optionType == "imageUrl" ||
                  editQuestions[currIdx]?.optionType == "textAndImageUrl") && (
                  <input
                    type="url"
                    name={index}
                    className={`${styles.optionsInput} ${
                        editQuestions[currIdx]?.options[index].iscorrect &&
                      styles.correctOptionStyle
                    }`}
                    placeholder="Image Url"
                    value={editQuestions[currIdx]?.options[index].optionUrl}
                    onChange={handleoptionsImageUrlInput}
                  />
                )}
              </div>
            ))}
          </div>
          {editQuiz?.quiztype=='QandA'&&<div className={styles.timer}>
          <span style={{ color: "#9F9F9F" }}>Timer</span>
          <span
            id="off"
            className={`${styles.timings} ${
              editQuiz?.timer == "off" ? styles.selectedTimer : ""
            }`}
            onClick={() => handleTimerChange("off")}
          >
            off
          </span>
          <span
            id="5"
            className={`${styles.timings} ${
                editQuiz?.timer == "5" ? styles.selectedTimer : ""
            }`}
            onClick={() => handleTimerChange("5")}
          >
            5 sec
          </span>
          <span
            id="10"
            className={`${styles.timings} ${
                editQuiz?.timer == "10" ? styles.selectedTimer : ""
            }`}
            onClick={() => handleTimerChange("10")}
          >
            10 sec
          </span>
        </div>}
        </div>
        <div className={styles.cancelAndUpdateBtn}>
            <button className={styles.cancelBtn} onClick={()=>setShowupdatePopup(false)}>Cancel</button>
            <button className={styles.updateBtn} onClick={handleUpdateQuiz}>Update Quiz</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateQandA;
