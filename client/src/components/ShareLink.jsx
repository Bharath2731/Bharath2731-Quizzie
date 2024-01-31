import React from 'react'
import styles from '../styles/sharelink.module.css'
import cross from '../images/cross.png'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
function ShareLink({handleShowcreatequiz,quizid}) {
    const [clipBoardText,setClipBoardText]= useState('http://localhost:3000/takeQuiz/')
    function showCopyToast(){
        toast.success('Link copied to Clipboard', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
          //removing the popup also
      }
  return (
    <div className={styles.blurWrapper}>
      <div className={styles.inner}>
        <div className={styles.cross}><img src={cross} alt="" onClick={handleShowcreatequiz} /></div>
        <div className={styles.bigtext}><span>Congrats your Quiz is Published!</span></div>
        <div className={styles.linkdiv}><p>{quizid?`http://localhost:3000/takeQuiz/${quizid}`:'Generating Link....'}</p></div>
        <div >
            <CopyToClipboard text={`${clipBoardText}${quizid}`}>
                {quizid?
                <button className={styles.shareBtn} onClick={showCopyToast}>Share</button>:
                <button className={styles.shareBtn}>Wait..</button>}
            </CopyToClipboard>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default ShareLink
