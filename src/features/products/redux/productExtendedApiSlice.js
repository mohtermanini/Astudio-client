import { API_SERVICES } from "@/common/config/api-services";
import { DUMMY_JSON_ROUTES } from "@/common/config/routes/dummy-json-routes";
import { apiSlice } from "@/common/redux/slices/apiSlice";
import FormUtils from "@/common/utils/FormUtils";

/*********************** Slice ***********************/
const productExtendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (filters) => {
        const params = FormUtils.reshapeToParams(filters);

        return {
          apiService: API_SERVICES.DummyJson,
          url: DUMMY_JSON_ROUTES.Products.index({
            categoryFiltered: params.has("category"),
            fieldFilters: params.has("q"),
            value: params.get("category") || params.has("q"),
          }),
          params,
        };
      },
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result, error, arg) => [
        { type: "Product", id: "List" },
        ...(result ? result?.products?.map((product) => ({ type: "Product", id: product.id })) : []),
      ],
    }),
  }),
});

/*********************** Exports ***********************/
export const { useGetProductsQuery } = productExtendedApiSlice;
