// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

// import { router } from "expo-router";
// import Constants from "expo-constants";
// import { errorHandler } from "@/hooks/utils/toast";

// const config = Constants.expoConfig;
const API_BASE_URI =
  process.env.NODE_ENV === "production"
    ? "https://api.vendesquare.com/admin/v1"
    : "https://api.staging.vendesquare.com/admin/v1";

const vendeSquareApi = axios.create({
  baseURL: API_BASE_URI,
});

export const bareAxios = axios.create({
  baseURL: API_BASE_URI,
});

export default vendeSquareApi;
