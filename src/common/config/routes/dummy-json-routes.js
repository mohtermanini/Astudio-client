export const DUMMY_JSON_ROUTES = {
  Users: {
    index: ({ filtered = false }) => (filtered ? `/users/filter` : `/users`),
  },
  Products: {
    index: ({ categoryFiltered, fieldFilters, value }) => {
      if (categoryFiltered) {
        return `/products/category/${value}`;
      }
      else if(fieldFilters) {
        return `/products/search`
      }
      return `/products`;
    },
  },
  Categories: {
    index: () => `/products/category-list`,
  },
};
