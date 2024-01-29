import axios from "axios";
import toast from "react-hot-toast";
const toastErrorStyles ={
  position: "top-center",
  fontFamily: "poppins",
  duration: 2000,
  style: {
    fontFamily: "poppins",
    border: "1px solid red",
    letterSpacing: "1px",
  },
}

export const signinFunction = async (userData) => {
  const url = `${process.env.REACT_APP_BACKEND_ROOT_URL}/signin`;
  try {
    const response = await axios.post(url, userData);
    console.log(response);
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with an error status
      console.log("Server responded with:", error.response.data);
      toast.error("email already exists", toastErrorStyles);
      console.log("Status code:", error.response.status);
    } else if (error.request) {
      // The request was made, but no response was received
      console.log("No response received");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error setting up the request:", error.message);
    }
    throw error;
  }
};

export const loginFunction = async (loginData) => {
  const url = `${process.env.REACT_APP_BACKEND_ROOT_URL}/login`;
  const { email, password } = loginData;
  
  
  try {
  const response = await axios.post(url,loginData)
//   console.log('res',response)
  return response
  } catch (error) {
    // console.log('error:' ,error)
    throw error;
  }
};
