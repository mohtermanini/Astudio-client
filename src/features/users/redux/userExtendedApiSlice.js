import { API_SERVICES } from "@/common/config/api-services";
import { DUMMY_JSON_ROUTES } from "@/common/config/routes/dummy-json-routes";
import { apiSlice } from "@/common/redux/slices/apiSlice";
import FormUtils from "@/common/utils/FormUtils";

/*********************** Slice ***********************/
const userExtendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (filters) => {
        const params = FormUtils.reshapeToParams(filters);
        const filterKeysCount = Object.keys(filters).filter((key) => key !== "limit" && key !== "skip").length;

        return {
          apiService: API_SERVICES.DummyJson,
          url: DUMMY_JSON_ROUTES.Users.index({ filtered: filterKeysCount > 0 }),
          params,
        };
      },
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result, error, arg) => [{ type: "User", id: "List" }, ...(result ? result?.users?.map((user) => ({ type: "User", id: user.id })) : [])],
    }),
  }),
});

/*********************** Exports ***********************/
export const { useGetUsersQuery } = userExtendedApiSlice;
