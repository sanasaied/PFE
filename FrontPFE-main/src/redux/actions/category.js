import createRequest from "../../helpers/axiosRequest";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";

const request = createRequest()
export const getAllCategories = async (dispatch) => {
  return await request
    .get(`/category/`)
    .then(response => {
      return dispatch({
        type: GET_ALL_CATEGORIES,
        payload: response.data
      });
    })
    .catch(err => {
      console.log("Error: ", err);
    });
};
