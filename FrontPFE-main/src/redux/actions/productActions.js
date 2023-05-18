import createRequest from "../../helpers/axiosRequest";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
const request = createRequest()

export const fetchProducts = async (dispatch, addToast) => {
  return await request
    .get(`/product/all`)
    .then(response => {
      return dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      console.log("Error: ", err);
      addToast("An error has occured", {
        appearance: "error"
      })
      return dispatch({
        type: FETCH_PRODUCTS_ERROR,
      });
    });
};
