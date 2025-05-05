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
  headers: {
    "X-Api-Key":
      process.env.NODE_ENV === "production"
        ? "vsq_admin_IQImd7wwDVLxV2qzOEBgdqqADminqlL80mK3ElfKeRM"
        : "vsq_admin_3k2X0a1r7g4i5j8v6x9bqz0c2f1d3e4e5f6g7h8i9j0",
  },
});

export const bareAxios = axios.create({
  baseURL: API_BASE_URI,
});

export default vendeSquareApi;
