import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  DeleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorServices,
} from "../../services/userService";
import { toast } from "react-toastify";
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        console.log("check get state: ", getState);
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailded());
      }
    } catch (e) {
      dispatch(fetchGenderFailded());
      console.log("fetchGenderFailded error: ", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailded = () => ({
  type: actionTypes.FETCH_GENDER_FAILDED,
});
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({
      //   type: actionTypes.FETCH_GENDER_START,
      // });
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        console.log("check get state: ", getState);
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailded());
      }
    } catch (e) {
      dispatch(fetchPositionFailded());
      console.log("fetchPositionFailded error: ", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailded = () => ({
  type: actionTypes.FETCH_POSITION_FAILDED,
});
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({
      //   type: actionTypes.FETCH_GENDER_START,
      // });
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        console.log("check get state: ", getState);
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailded());
      }
    } catch (e) {
      dispatch(fetchRoleFailded());
      console.log("fetchRoleFailded error: ", e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailded = () => ({
  type: actionTypes.FETCH_ROLE_FAILDED,
});
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log("check create user redux: ", res);
      if (res && res.errCode === 0) {
        toast.success("Create a new user successed");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFailded());
      }
    } catch (e) {
      dispatch(saveUserFailded());
      console.log("saveUserFailded error: ", e);
    }
  };
};
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailded = () => ({
  type: actionTypes.CREATE_USER_FAILDED,
});
export const fetchAllUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      // dispatch({
      //   type: actionTypes.FETCH_GENDER_START,
      // });
      let res = await getAllUsers("ALL");
      let res1 = await getTopDoctorHomeService("");
      console.log("check get top doctor: ", res1);
      if (res && res.errCode === 0) {
        toast.success("fetch a user successed");

        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        toast.success("fetch a user error");
        dispatch(fetchAllUserFailded());
      }
    } catch (e) {
      toast.success("fetch a user error");
      dispatch(fetchAllUserFailded());
      console.log("fetchAllUserFailded error: ", e);
    }
  };
};
export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});
export const fetchAllUserFailded = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILDED,
});
export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await DeleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete the user success!");

        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Delete the user error!");

        dispatch(deleteUserFailded());
      }
    } catch (e) {
      toast.error("Delete the user error!");
      dispatch(deleteUserFailded());
      console.log("deleteUserFailded error: ", e);
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailded = () => ({
  type: actionTypes.DELETE_USER_FAILDED,
});
export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("update the user success!");

        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("update the user error!");

        dispatch(editUserFailded());
      }
    } catch (e) {
      toast.error("update the user error!");
      dispatch(editUserFailded());
      console.log("editUserFailded error: ", e);
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailded = () => ({
  type: actionTypes.EDIT_USER_FAILDED,
});
// let res1 = await getTopDoctorHomeService("")

export const fetchTopDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      console.log("check res: ", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_DOCTOR_FAILDED: ", e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
      });
    }
  };
};
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      console.log("check res: ", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAILDED,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_DOCTOR_FAILDED: ", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAILDED,
      });
    }
  };
};
export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorServices(data);
      console.log("check res: ", res);
      if (res && res.errCode === 0) {
        toast.success("Save infor Detail successed");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Error infor Detail error");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
        });
      }
    } catch (e) {
      console.log("SAVE_DETAIL_DOCTOR_FAILDED: ", e);
      toast.error("Error infor Detail error");
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
      });
    }
  };
};
