import React, {  useState } from "react";
import styles from "../styles/qandatemplate.module.css";
import deleteIcon from "../images/deleteIcon.png";
function QandAtemplate({
  questions,
  setquestions,
  timer,
  setTimer,
  currentIndex,
  setCurrentIndex,
  handleShowcreatequiz,
  handleCreateQuiz
}) {
  const questionTemplate = {
    question: "",
    optionType: "text",
    options: [
      { optionText: "", optionUrl: "", iscorrect: false },
      { optionText: "", optionUrl: "", iscorrect: false },
    ],
  };

  function handleAddQuestion() {
    const currentQuestion = questions[currentIndex];//only checks the current question
    if (!currentQuestion.question.trim()) {
      alert("Please enter a question.");
      return;
    }
    if (
      currentQuestion.options.filter((option) => option.iscorrect).length === 0
    ) {
      alert("Please select at least one correct option.");
      return;
    }
    if (
      currentQuestion.options.some(
        (option) => !option.optionText.trim() && !option.optionUrl.trim()
      )
    ) {
      alert("Please fill in all options.");
      return;
    }
    if (questions.length < 5) console.log(questions);
    setquestions((prev) => [...prev, questionTemplate]);
    setCurrentIndex(questions.length); //not length-1 becausee it is not reflecting as soon as the state(questions) updates
  }

  function handleCancelQuestion(e) {
    e.stopPropagation(); //hamayya chala chala kastapadda deeni kosam last ki dorikindi edi important note,ee cancel nokkutunte event propagate  iyye handle add question call avtundi....finally :)
    setquestions(questions.filter((question, index) => index != e.target.id));
    if (e.target.id == questions.length - 1) {
      setCurrentIndex(questions.length - 2);
    }
    if (e.target.id < currentIndex) {
      setCurrentIndex(e.target.id);
    }
    if (e.targetid > currentIndex) {
      setCurrentIndex(e.target.id);
    }
  }

  function handleChangeQuestion(e) {
    const gettingUpdatedQuestions = [...questions];
    gettingUpdatedQuestions[currentIndex].question = e.target.value;
    setquestions(gettingUpdatedQuestions);
  }

  function handleOptionType(e) {
    const gettingUpdatedQuestions = [...questions];
    gettingUpdatedQuestions[currentIndex].optionType = e.target.id;
    setquestions(gettingUpdatedQuestions);
    console.log(questions);
  }

  function handleAddOption() {
    if (questions[currentIndex].options.length == 4) return;
    const gettingUpdatedQuestions = [...questions];
    gettingUpdatedQuestions[currentIndex].options.push({
      optionText: "",
      optionUrl: "",
      iscorrect: false,
    });
    setquestions(gettingUpdatedQuestions);
  }

  function handleoptionsTextInput(e) {
    const gettingUpdatedQuestions = [...questions];
    gettingUpdatedQuestions[currentIndex].options[e.target.name] = {
      ...gettingUpdatedQuestions[currentIndex].options[e.target.name],
      optionText: e.target.value,
    };
    setquestions(gettingUpdatedQuestions);
  }

  function handleoptionsImageUrlInput(e) {
    const gettingUpdatedQuestions = [...questions];
    gettingUpdatedQuestions[currentIndex].options[e.target.name] = {
      ...gettingUpdatedQuestions[currentIndex].options[e.target.name],
      optionUrl: e.target.value,
    };
    setquestions(gettingUpdatedQuestions);
  }

  function handleDeleteOption(e) {
    const updatedQuestions = [...questions];
    const currentOptions = updatedQuestions[currentIndex].options;

    // at least two options before attempting to delete
    if (currentOptions.length > 2) {
      // Removing the option at the specified index
      updatedQuestions[currentIndex].options = currentOptions.filter(
        (_, index) => index != e.target.id
      );

      setquestions(updatedQuestions);
    }
  }

  function handleIsCorrectOption(index) {
    const updatedQuestions = [...questions];
    const currentOptions = updatedQuestions[currentIndex].options;

    // Update iscorrect property for the clicked option
    currentOptions.forEach((option, i) => {
      option.iscorrect = i === index;
    });

    setquestions(updatedQuestions);
  }

  function createQuizFunction(){
    const currentQuestion = questions[currentIndex];
    if (!currentQuestion.question.trim()) {
      alert("Please enter a question.");
      return;
    }
    if (
      currentQuestion.options.filter((option) => option.iscorrect).length === 0
    ) {
      alert("Please select at least one correct option.");
      return;
    }
    if (
      currentQuestion.options.some(
        (option) => !option.optionText.trim() && !option.optionUrl.trim()
      )
    ) {
      alert("Please fill in all options.");
      return;
    }
    handleCreateQuiz()
  }

  return (
    <div className={styles.container}>
      <div className={styles.questionnumbersouter}>
        <div className={styles.questionnumbersplus}>
          {questions.map((question, idx) => (
            <div
              key={idx}
              className={`${styles.questionnumbers} ${
                currentIndex == idx && styles.currentQuestion
              }`}
              onClick={() => setCurrentIndex(idx)}
            >
              <span>{idx + 1}</span>
              {idx > 0 ? (
                <span
                  className={`${styles.cancelQuestion}`}
                  id={idx}
                  onClick={handleCancelQuestion}
                >
                  X
                </span>
              ) : (
                ""
              )}
            </div>
          ))}
          {/* if questions are less than 5 show add div else dont show */}
          {questions.length < 5 ? (
            <div
              className={`${styles.questionnumbers} ${styles.plus}`}
              onClick={handleAddQuestion}
            >
              <span>+</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <span className={styles.maxQuestionsSpan}>Max 5 questions</span>
      </div>
      <input
        type="text"
        placeholder="Poll Question"
        value={questions[currentIndex].question}
        className={styles.questionInput}
        onChange={handleChangeQuestion}
      />

      <div className={styles.optiontype}>
        <span>
          <b>Option Type :</b>
        </span>
        <div>
          <input
            type="radio"
            id="text"
            name="optiontype"
            value="text"
            onChange={handleOptionType}
            checked={questions[currentIndex].optionType == "text"}
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
            checked={questions[currentIndex].optionType == "imageUrl"}
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
            checked={questions[currentIndex].optionType == "textAndImageUrl"}
          />
          <label htmlFor="textAndImageUrl">Text & Image url</label>
        </div>
      </div>

      <div className={styles.optionsAndTimer}>
        <div className={styles.options}>
          {questions[currentIndex].options.map((option, index) => (
            <div className={styles.optionsBox} key={index}>
              <input
                type="radio"
                className={styles.optionsRadio}
                name="options"
                checked={questions[currentIndex].options[index].iscorrect}
                onChange={() => handleIsCorrectOption(index)}
              />
              {(questions[currentIndex].optionType == "text" ||
                questions[currentIndex].optionType == "textAndImageUrl") && (
                <input
                  type="text"
                  name={index}
                  className={`${styles.optionsInput} ${
                    questions[currentIndex].options[index].iscorrect &&
                    styles.correctOptionStyle
                  }`}
                  placeholder="Text"
                  value={questions[currentIndex].options[index].optionText}
                  onChange={handleoptionsTextInput}
                />
              )}
              {(questions[currentIndex].optionType == "imageUrl" ||
                questions[currentIndex].optionType == "textAndImageUrl") && (
                <input
                  type="url"
                  name={index}
                  className={`${styles.optionsInput} ${
                    questions[currentIndex].options[index].iscorrect &&
                    styles.correctOptionStyle
                  }`}
                  placeholder="Image Url"
                  value={questions[currentIndex].options[index].optionUrl}
                  onChange={handleoptionsImageUrlInput}
                />
              )}
              {index > 1 ? (
                <img
                  src={deleteIcon}
                  alt=""
                  id={index}
                  onClick={handleDeleteOption}
                />
              ) : (
                ""
              )}
            </div>
          ))}
          {questions[currentIndex].options.length < 4 && (
            <button className={styles.addOption} onClick={handleAddOption}>
              Add Option
            </button>
          )}
        </div>

        <div className={styles.timer}>
          <span style={{ color: "#9F9F9F" }}>Timer</span>
          <span
            id="off"
            className={`${styles.timings} ${
              timer == "off" ? styles.selectedTimer : ""
            }`}
            onClick={(e) => setTimer(e.target.id)}
          >
            off
          </span>
          <span
            id="5"
            className={`${styles.timings} ${
              timer == "5" ? styles.selectedTimer : ""
            }`}
            onClick={(e) => setTimer(e.target.id)}
          >
            5 sec
          </span>
          <span
            id="10"
            className={`${styles.timings} ${
              timer == "10" ? styles.selectedTimer : ""
            }`}
            onClick={(e) => setTimer(e.target.id)}
          >
            10 sec
          </span>
        </div>
      </div>

      <div className={styles.canelAndCreateQuiz}>
        <button className={styles.cancelBtn} onClick={handleShowcreatequiz}>
          Canel
        </button>
        <button className={styles.createQuizBtn} onClick={createQuizFunction}>Create Quiz</button>
      </div>
    </div>
  );
}

export default QandAtemplate;
