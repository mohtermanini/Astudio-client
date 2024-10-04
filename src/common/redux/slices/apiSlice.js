import { createApi } from "@reduxjs/toolkit/query/react";

import { getAxiosClient } from "@/common/services/axios/axios-client";

const axiosBaseQuery = async ({ apiService, url, method, body, params, headers }) => {
  try {
    const result = await getAxiosClient(apiService).request({ url, method, data: body, params, headers });
    return { data: result.data };
  } catch (axiosError) {
    console.error("API Error:", axiosError);
    return {
      error: {
        status: axiosError.response?.status,
        data: axiosError.response?.data || axiosError.message,
      },
    };
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery,
  tagTypes: ["User", "Product", "Category"],
  endpoints: (builder) => ({}),
});

export const {} = apiSlice;
