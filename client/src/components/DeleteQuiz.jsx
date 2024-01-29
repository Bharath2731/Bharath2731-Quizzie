import React from 'react'
import styles from '../styles/deletequiz.module.css'
import { deleteQuizFunction } from '../apis/Quiz'
import toast from 'react-hot-toast';
function DeleteQuiz({handleShowDeleteQuiz,deleteQuizId}) {

  const successToastStyles= {
    position: "top-center",
    fontFamily: "poppins",
    duration: 2000,
    style: {
      fontFamily: "poppins",
      border: "1px solid green",
      letterSpacing: "1px",
    },
  }

  async function deleteQuiz(){
    const _id = deleteQuizId;
    try {
    await deleteQuizFunction(_id);
    handleShowDeleteQuiz()
    toast.success('deleted successfully',successToastStyles)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div>
      <div className={styles.blurWrapper}>
        <div className={styles.innerBox}>
            <h1>Are you confirm you <br />want to delete ?</h1>
            <div className={styles.button}>
                <button className={styles.cancelBtn} onClick={handleShowDeleteQuiz}>Cancel</button>
                <button className={styles.confirmBtn}onClick={deleteQuiz}>Confirm Delete</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteQuiz
