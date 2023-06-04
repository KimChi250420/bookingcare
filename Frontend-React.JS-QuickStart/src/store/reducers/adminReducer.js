import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  isLoadingGender: false,
};

const adminReducer = (state = initialState, action) => {
  let copyState = { ...state };
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      copyState.isLoadingGender = true;
      console.log("fetch gender start: ", action);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      copyState.genders = action.data;
      copyState.isLoadingGender = false;
      console.log("fetch gender success: ", action);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAILDED:
      copyState.isLoadingGender = false;
      copyState.genders = [];
      console.log("fetch gender failded: ", action);

      return {
        ...copyState,
      };
    default:
      return state;
  }
};

export default adminReducer;
