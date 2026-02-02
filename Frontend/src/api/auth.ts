//signUp()
//signIn()

import axios from "axios";
import { BACKEND_URL } from "../config";

type  SignUpPayload={
    username: string,
    
}


export async function signUp(data:SignUpPayload){
  const response = await axios.post(`${BACKEND_URL}/api/v1/`,data)
}