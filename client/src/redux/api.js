import axios from 'axios'

const API=axios.create({baseURL:"http://localhost:5000"});

export const signIn = (formData) => API.post("/users/login",formData);
export const signUp = (formData) => API.post("/users/register",formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn",result);

export const createTour=(tourData)=>API.post("/tour",tourData)