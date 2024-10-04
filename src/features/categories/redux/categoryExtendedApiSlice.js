import { API_SERVICES } from "@/common/config/api-services";
import { DUMMY_JSON_ROUTES } from "@/common/config/routes/dummy-json-routes";
import { apiSlice } from "@/common/redux/slices/apiSlice";

/*********************** Slice ***********************/
const categoryExtendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => {
        return {
          apiService: API_SERVICES.DummyJson,
          url: DUMMY_JSON_ROUTES.Categories.index(),
        };
      },
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result, error, arg) => [{ type: "Category", id: "List" }],
    }),
  }),
});

/*********************** Exports ***********************/
export const { useGetCategoriesQuery } = categoryExtendedApiSlice;
