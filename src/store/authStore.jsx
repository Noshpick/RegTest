import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:9090/api/v1/auth";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,

  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials, {
        headers: { "Content-Type": "application/json" }
      });
      const { accessToken, refreshToken } = response.data;
      set({ user: credentials.email, token: accessToken, refreshToken });
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify({ email: credentials.email }));
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  },

  refreshAccessToken: async () => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (!storedRefreshToken) return;
      
      const response = await axios.post(`${API_URL}/refresh-token`, { token: storedRefreshToken }, {
        headers: { "Content-Type": "application/json" }
      });
      
      const { accessToken, refreshToken } = response.data;
      set({ token: accessToken, refreshToken });
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.error("Failed to refresh token.");
      set({ user: null, token: null, refreshToken: null });
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  },

  register: async (userData) => {
    try {
      await axios.post(`${API_URL}/register`, userData, {
        headers: { "Content-Type": "application/json" }
      });
      alert("Registration successful! Now log in.");
    } catch (error) {
      alert("Registration failed. Email may already be in use.");
    }
  },

  logout: () => {
    set({ user: null, token: null, refreshToken: null });
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  checkSession: async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      set({ user, token });
    } else if (localStorage.getItem("refreshToken")) {
      await useAuthStore.getState().refreshAccessToken();
    }
  }
}));

export default useAuthStore;
