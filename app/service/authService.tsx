import axios from "axios";
import qs from "qs";
import vendeSquareApi from "./axios";
import { bareAxios } from "./axios";
import {
  BANK_ACCOUNTS,
  CATEGORIES,
  FORGOT_PASSWORD,
  GET_STAFF,
  RESET_PASSWORD,
  SEND_EMAIL_OTP,
  SEND_SMS_OTP,
  SIGN_IN,
  SIGN_UP,
  STORE,
  VERIFY_EMAIL,
  VERIFY_PHONE,
  VERIFY_RESET_OTP,
  WALLETS,
  VENDORS,
} from "./urls";

const cleanFilters = (filters: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  );
};

export const signUp = async (data: any) => {
  try {
    const response = await vendeSquareApi.post(`${SIGN_UP}`, data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error?.response;
  }
};

export const verifyPhone = async (data: any) => {
  try {
    const response = await vendeSquareApi.post(`${VERIFY_PHONE}`, data);
    return response.data;
  } catch (error: any) {
    throw error?.response;
    // throw new Error()
  }
};

export const verifyEmail = async (data: any) => {
  try {
    const response = await vendeSquareApi.post(`${VERIFY_EMAIL}`, data);
    return response.data;
  } catch (error: any) {
    throw error?.response;
    // throw new Error()
  }
};

export const signIn = async (data: any) => {
  try {
    const response = await vendeSquareApi.post(`${SIGN_IN}`, data);
    console.log(response?.data);

    return response.data;
  } catch (error: any) {
    throw error?.response;
    // throw new Error()
  }
};

export const getStaff = async () => {
  try {
    const response = await vendeSquareApi.get(`${GET_STAFF}`);
    return response.data;
  } catch (error: any) {
    throw error?.response;
  }
};

export const createStore = async (data: any) => {
  try {
    const response = await vendeSquareApi.post(`${STORE}`, data);
    return response.data;
  } catch (error: any) {
    throw error?.response;
    // throw new Error()
  }
};

export const createCategory = async (data: any) => {
  try {
    const response = await vendeSquareApi.post(`${CATEGORIES}`, data);
    return response.data;
  } catch (error: any) {
    throw error?.response;
    // throw new Error()
  }
};

export const updateCategory = async (data: any) => {
  try {
    const response = await vendeSquareApi.patch(
      `${CATEGORIES}/${data?.id}`,
      data?.update
    );
    return response.data;
  } catch (error: any) {
    throw error?.response;
    // throw new Error()
  }
};

// export const getVendors = async () => {
//   try {
//     const response = await vendeSquareApi.get(`${CATEGORIES}`);
//     return response.data;
//   } catch (error: any) {
//     throw error?.response;
//   }
// };

export const getVendors = async (filters: any = {}) => {
  try {
    const isExcel = filters?.format === "excel"; // Example flag
    const cleanedFilters = cleanFilters(filters);
    const queryString = qs.stringify(cleanedFilters, {
      skipNulls: true,
      addQueryPrefix: true,
    });

    const response = await vendeSquareApi.get(`${VENDORS}${queryString}`, {
      responseType: isExcel ? "blob" : "json",
    });

    return response?.data?.data;
  } catch (error: any) {
    throw error?.response || error;
  }
};

export const getAVendor = async (id: any) => {
  try {
    const response = await vendeSquareApi.get(`${VENDORS}/${id}`);
    return response?.data?.data;
  } catch (error: any) {
    throw error?.response;
  }
};

export const getCategories = async (id: any) => {
  try {
    const response = await vendeSquareApi.get(`${VENDORS}/${id}/categories`);
    return response?.data?.data;
  } catch (error: any) {
    throw error?.response;
  }
};

// export const getCategories = async (data: any = {}) => {
//   try {
//     // const isExcel = filters?.format === "excel"; // Example flag
//     const cleanedFilters = cleanFilters(data?.filters);
//     const queryString = qs.stringify(cleanedFilters, {
//       skipNulls: true,
//       addQueryPrefix: true,
//     });

//     const response = await vendeSquareApi.get(`${VENDORS}/${data?.id}/categories${queryString}`);

//     return response?.data?.data;
//   } catch (error: any) {
//     throw error?.response || error;
//   }
// };

export const getProdsByCategories = async (data: any = {}) => {
  try {
    // const isExcel = filters?.format === "excel"; // Example flag
    const cleanedFilters = cleanFilters(data?.filters);
    const queryString = qs.stringify(cleanedFilters, {
      skipNulls: true,
      addQueryPrefix: true,
    });

    const response = await vendeSquareApi.get(
      `/categories/${data?.id}/products${queryString}`
    );

    return response?.data?.data;
  } catch (error: any) {
    throw error?.response || error;
  }
};

export const approveStore = async (id: any) => {
  try {
    const response = await vendeSquareApi.put(`${STORE}/${id}/approve`);
    return response?.data?.data;
  } catch (error: any) {
    throw error?.response;
  }
};

export const rejectStore = async (data: any) => {
  try {
    const response = await vendeSquareApi.put(
      `${STORE}/${data?.id}/reject`,
      data?.update
    );
    return response?.data?.data;
  } catch (error: any) {
    throw error?.response;
  }
};

export const storeOperations = async (data: any) => {
  try {
    const response = await vendeSquareApi.post(
      `${STORE}/${data?.id}/operations`,
      data?.update
    );
    return response.data;
  } catch (error: any) {
    throw error?.response;
  }
};

export const updateStore = async (data: any) => {
  try {
    const response = await vendeSquareApi.patch(
      `${STORE}/${data?.id}`,
      data?.update
    );
    return response.data;
  } catch (error: any) {
    throw error?.response;
    // throw new Error()
  }
};

export const updateStoreOperations = async (data: any) => {
  try {
    const response = await vendeSquareApi.put(
      `${STORE}/${data?.id}/operations`,
      data?.update
    );
    return response.data;
  } catch (error: any) {
    throw error?.response;
  }
};

export const forgotPassword = async (data: any) => {
  try {
    const response = await vendeSquareApi.post(`${FORGOT_PASSWORD}`, data);
    return response.data;
  } catch (error: any) {
    throw error?.response;
  }
};

export const verifyResetPassOtp = async (data: any) => {
  try {
    const response = await vendeSquareApi.post(`${VERIFY_RESET_OTP}`, data);
    return response.data;
  } catch (error: any) {
    throw error?.response;
  }
};

export const resetPassword = async (data: any) => {
  try {
    const response = await vendeSquareApi.post(`${RESET_PASSWORD}`, data);
    return response.data;
  } catch (error: any) {
    throw error?.response;
  }
};

export const sendSmsOtp = async (data: any) => {
  try {
    const response = await vendeSquareApi.post(`${SEND_SMS_OTP}`, data);
    return response.data;
  } catch (error: any) {
    throw error?.response;
  }
};

export const sendEmailOtp = async (data: any) => {
  try {
    const response = await vendeSquareApi.post(`${SEND_EMAIL_OTP}`, data);
    return response.data;
  } catch (error: any) {
    throw error?.response;
  }
};

export const createProducts = async (data: any) => {
  try {
    const response = await vendeSquareApi.post(
      `${STORE}/${data?.id}/products`,
      data?.update
    );
    return response.data;
  } catch (error: any) {
    throw error?.response;
  }
};

export const getProductsbyStore = async (data: any) => {
  try {
    const response = await vendeSquareApi.get(
      `${STORE}/${data?.id}/products?${data?.filters}`
    );
    // console.log(data);

    return response.data;
  } catch (error: any) {
    // console.log(error);

    throw error?.response;
  }
};

export const updateProduct = async (data: any) => {
  try {
    const response = await vendeSquareApi.patch(
      `products/${data?.id}`,
      data?.update
    );
    return response.data;
  } catch (error: any) {
    throw error?.response;
    // throw new Error()
  }
};

export const getWallets = async () => {
  try {
    const response = await vendeSquareApi.get(`${WALLETS}`);
    return response.data?.data;
  } catch (error: any) {
    throw error?.response;
  }
};

export const getBankAccounts = async () => {
  try {
    const response = await vendeSquareApi.get(`${BANK_ACCOUNTS}`);
    return response.data?.data;
  } catch (error: any) {
    throw error?.response;
  }
};

export const getBankList = async () => {
  try {
    const response = await vendeSquareApi.get(`banks/ng`);
    return response.data?.data;
  } catch (error: any) {
    throw error?.response;
  }
};

export const getStoreTypes = async () => {
  try {
    const response = await vendeSquareApi.get(`${STORE}/types`);
    return response.data?.data;
  } catch (error: any) {
    throw error?.response;
  }
};

// export const transactionStats = async () => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.get(`${TRANSACTION_STATS}`, {
//             headers: {
//                 Authorization: `Bearer ${token || ""}`
//             }
//         });

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const getPartnerBal = async () => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.get(`${PARTNERS_BAL}`, {
//             headers: {
//                 Authorization: `Bearer ${token || ""}`
//             }
//         });

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const koraBal = async () => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.get(`${KORA_BAL}`, {
//             headers: {
//                 Authorization: `Bearer ${token || ""}`
//             }
//         });

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const auditLogs = async (filters: any) => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.get(`${AUDIT_LOGS}${filters}`, {
//             headers: {
//                 Authorization: `Bearer ${token || ""}`
//             },
//             responseType: `${filters?.includes("excel") ? "blob" : "json"}`

//         });

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const getAllUsers = async (filters: any) => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.get(`${GET_ALL_USERS}${filters}`, {
//             headers: {
//                 Authorization: `Bearer ${token || ""}`
//             },
//             responseType: `${filters?.includes("excel") ? "blob" : "json"}`

//         });

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const getTransactionSwaps = async (filters: any) => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.get(`${TRANSACTIONS_SWAPS}${filters}`, {
//             headers: {
//                 Authorization: `Bearer ${token || ""}`
//             },
//             responseType: `${filters?.includes("excel") ? "blob" : "json"}`
//         });

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };
// export const getUserCount = async (filters: any) => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.get(`${GET_USER_COUNT}${filters}`, {
//             headers: {
//                 Authorization: `Bearer ${token || ""}`
//             }
//         });

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const getUserDetails = async (id: any) => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.get(`${GET_USER}/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${token || ""}`
//             }
//         });

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const updateUser = async (data: any) => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.patch(`${UPDATE_USER}/${data?.id}`, data?.update, {
//             headers: {
//                 Authorization: `Bearer ${token || ""}`
//             }
//         });

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const getTransactionDetails = async (id: any) => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.get(`${TRANSACTIONS_SWAPS_DETAILS}/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${token || ""}`
//             }
//         });

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const sendPushNotification = async (data: any) => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.post(`${PUSH_NOTIFICATION}/${data?.id}`, data?.update, {
//             headers: {
//                 Authorization: `Bearer ${token || ""}`
//             }
//         });

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const sendBulkNotification = async (data: any) => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.post(`${BULK_NOTIFICATION}`, data, {
//             headers: {
//                 Authorization: `Bearer ${token || ""}`
//             }
//         });

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const requeueTransactions = async (id: any) => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.patch(
//             `${REQUEUE_TRANSACTIONS}/${id}`,
//             {},
//             {
//                 headers: {
//                     Authorization: `Bearer ${token || ""}`
//                 }
//             }
//         );

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const confirm2Fa = async (data: any) => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.post(`${TWO_FA}`, data, {
//             headers: {
//                 Authorization: `Bearer ${token || ""}`
//             }
//         });

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const updateRates = async (data:any) => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.patch(
//             `${UPDATE_RATES}`,
//             data,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token || ""}`
//                 }
//             }
//         );

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const setTransAsSuccess = async (data: any) => {
//     let token = store.getState().user.token;
//     try {
//         const response = await webApi.patch(
//             `${SET_TRANS_SUCCESS}/${data?.ref}`,
//             data?.update,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token || ""}`
//                 }
//             }
//         );

//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// };
