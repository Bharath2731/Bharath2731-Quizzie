import axios from "axios";

export const createQuizFunction = async (quizInfo) =>{
    const jwtoken = localStorage.getItem('jwtoken')
    const url = `${process.env.REACT_APP_BACKEND_ROOT_URL}/quiz`;
    const headers = {jwtoken}

    try {
        const response =await axios.post(url,quizInfo,{headers})
        return response;
    } catch (error) {
        console.log(error)
        throw error
    }
}

// all quizes created by user
export const getQuizzesFunction = async ()=>{
    try {
        const url = `${process.env.REACT_APP_BACKEND_ROOT_URL}/quizes`;
        const jwtoken = localStorage.getItem('jwtoken')
        const headers={jwtoken}
        const response = await axios.get(url,{headers})
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

// for getting the quiz based on its id
export const getQuizFunction = async(id)=>{
    try {
        const url = `${process.env.REACT_APP_BACKEND_ROOT_URL}/quiz/${id}`;
        const jwtoken = localStorage.getItem('jwtoken')
        const headers ={jwtoken}
        const response = await axios.get(url,{headers})
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteQuizFunction = async (_id)=>{
    try {
        const url =`${process.env.REACT_APP_BACKEND_ROOT_URL}/quiz/${_id}`
        const jwtoken = localStorage.getItem('jwtoken')
        const headers = {jwtoken};
        const response = await axios.delete(url,{headers})
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const quizImpressionFunction = async (id)=>{
    try {
        const url =`${process.env.REACT_APP_BACKEND_ROOT_URL}/quiz/impressions/${id}`
        await axios.put(url)
        
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateAfterTakingQuizFunction = async (id,quizData)=>{
    try {
        const url = `${process.env.REACT_APP_BACKEND_ROOT_URL}/quiz/submit/${id}`
        const response=await axios.put(url,quizData)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}