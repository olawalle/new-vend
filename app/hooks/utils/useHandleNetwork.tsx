import * as React from "react";
import { useNavigate } from "react-router-dom"; // corrected import
import vendeSquareApi from "~/service/axios";

export function useHandleNetworkError() {
  const navigate = useNavigate();

  const lastServerErrorTimeRef = React.useRef(0);
  const lastLoginErrorRef = React.useRef(0);
  const SERVER_ERROR_COOLDOWN = 10 * 1000; // 10 seconds
  const LOGIN_ERROR_COOLDOWN = 10 * 1000;

  React.useEffect(() => {
    const requestInterceptor = vendeSquareApi.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = vendeSquareApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const now = Date.now();

        if (error.response?.status === 500) {
          if (now - lastServerErrorTimeRef.current < SERVER_ERROR_COOLDOWN) {
            return Promise.reject(error);
          }
          lastServerErrorTimeRef.current = now;
          return Promise.reject(error);
        }

        const message = error?.response?.data?.message || "";

        if (
          message.includes("session has expired") ||
          message.includes("not logged in")
        ) {
          if (now - lastLoginErrorRef.current < LOGIN_ERROR_COOLDOWN) {
            return Promise.reject(error);
          }

          lastLoginErrorRef.current = now;
          await localStorage.removeItem("token");
          navigate("/login");
          return Promise.reject(error);
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      vendeSquareApi.interceptors.request.eject(requestInterceptor);
      vendeSquareApi.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);
}
