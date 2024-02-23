import BaseApi from "./BaseApi";
import { LoginData, RegistrationData, User } from '@/types';

export async function login(credentials: LoginData): Promise<User> {
  try {
    const response = await BaseApi.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export async function register(userData: RegistrationData) {
  try {
    const response = await BaseApi.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export async function logout(): Promise<unknown> {
  const response = await BaseApi.post("/auth/logout");

  return response.data.data;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await BaseApi.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error('fetch user data failed:', error);
    return null;
  }

}