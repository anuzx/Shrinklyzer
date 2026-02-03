//signUp()
//signIn()

import axios from "axios";
import { BACKEND_URL } from "../config";

type SignUpPayload = {
  name: string;
  email: string;
  password: string;
};

type SignInPayload = {
  email: string;
  password: string;
};

type SignInResponse = {
  token: string;
};

export async function signUp(data: SignUpPayload) {
  const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, data);
  return response.data;
}

export async function signIn(data: SignInPayload): Promise<SignInResponse> {
  const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, data, {
    withCredentials: true,
  });
  return response.data;
}
