import React, { useState } from 'react'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import {BrowserRouter,NavLink,Routes,Route} from 'react-router-dom'
import styles from './styles/app.module.css'
import Analytics from './components/Analytics'
import toast, { Toaster } from 'react-hot-toast';
import AnalyticsQuizPage from './pages/AnalyticsQuizPage'
import TakeQuizPage from './pages/TakeQuizPage'

function App() {
  const [globalQuizes,setGlobalQuizes]=useState([])
  return (
    <BrowserRouter>
      <div>
        <Toaster/>
        <Routes>
          <Route exact path ='/' element={<RegisterPage/>}/>
          <Route exact path ='/dashboard' element={<DashboardPage setGlobalQuizes={setGlobalQuizes} />}/>
          <Route exact path ='/analytics' element={<Analytics globalQuizes={globalQuizes} setGlobalQuizes={setGlobalQuizes}/>}/>
          <Route exact path ='/createQuiz' element={<RegisterPage/>}/>
          <Route exact path ='/analytics/qanda/:id' element={<AnalyticsQuizPage />}/>
          <Route exact path ='/takeQuiz/:id' element={<TakeQuizPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

