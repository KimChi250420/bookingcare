import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  isLoadingGender: false,
  users: [],
  topDoctors: [],
  allDoctors: [],
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
    case actionTypes.FETCH_POSITION_SUCCESS:
      copyState.positions = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_POSITION_FAILDED:
      copyState.positions = [];

      return {
        ...copyState,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      copyState.roles = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ROLE_FAILDED:
      copyState.roles = [];
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      copyState.users = action.users;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_USER_FAILDED:
      copyState.users = [];
      return {
        ...copyState,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      copyState.topDoctors = action.dataDoctor;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILDED:
      copyState.topDoctors = [];
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      copyState.allDoctors = action.dataDr;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAILDED:
      copyState.allDoctors = [];
      return {
        ...copyState,
      };
    default:
      return state;
  }
};

export default adminReducer;
