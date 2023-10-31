import actionTypes from "./actionTypes";
import * as userService from "../../services/userService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      const res = await userService.getAllCodes("GENDER");

      if (res && res.status === "OK") {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("Error message:", e.toString());
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCES,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
//position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.getAllCodes("POSITION");
      if (res && res.status === "OK") {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("Error message:", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCES,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});
//role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.getAllCodes("ROLE");
      if (res && res.status === "OK") {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("Error message:", e.toString());
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

//CRUD user
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.createNewUser(data);
      if (res && res.status === "OK") {
        toast.success("Created user success!!!");
        dispatch(createUserSuccess(res.data));
      } else {
        toast.error("Create user failed");
        dispatch(createUserFailed());
      }
    } catch (e) {
      toast.error("Create user failed");
      dispatch(createUserFailed());
      console.log("Create user error:", e);
    }
  };
};

export const createUserSuccess = (data) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  data: data,
});

export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});
//Get all user
export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.getAllUser("ALL");

      if (res && res.status === "OK") {
        dispatch(fetchAllUserSuccess(res.users));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (e) {
      dispatch(fetchAllUserFailed());
      console.log("Create user error:", e);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  data: data,
});

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

//delete user
export const deleteUserStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.deleteUser(id);

      if (res && res.status === "OK") {
        toast.success("Deleted user success!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Delete user failed!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("Delete user failed!");
      dispatch(deleteUserFailed());
      console.log("Delete user error:", e);
    }
  };
};

export const deleteUserSuccess = (data) => ({
  type: actionTypes.FETCH_DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.FETCH_DELETE_USER_FAILED,
});

//update user
export const updateUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.editUserInfo(data);

      if (res && res.status === "OK") {
        toast.success("Updated user success!");
        dispatch(updateUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Updated user failed!");
        dispatch(updateUserFailed());
      }
    } catch (e) {
      toast.error("Updated user failed!");
      dispatch(updateUserFailed());
      console.log("Update user error:", e);
    }
  };
};

export const updateUserSuccess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
});

export const updateUserFailed = () => ({
  type: actionTypes.UPDATE_USER_FAILED,
});
//load top doctor
export const fetchTopDoctors = () => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.getTopDoctorHome(10);

      if (res && res.status === "OK") {
        dispatch(fetchTopDoctorsSuccess(res.list));
      } else {
        dispatch(fetchTopDoctorsFailed());
      }
    } catch (e) {
      console.log("FETCH_LOAD_TOP_DOCTOR_FAILED", e);
      dispatch(fetchTopDoctorsFailed());
    }
  };
};

export const fetchTopDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_LOAD_TOP_DOCTOR_SUCCESS,
  data: data,
});

export const fetchTopDoctorsFailed = () => ({
  type: actionTypes.FETCH_LOAD_TOP_DOCTOR_FAILED,
});

//get all doctors
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.getAllDoctors();

      if (res && res.status === "OK") {
        dispatch(fetchAllDoctorsSuccess(res.data));
      } else {
        dispatch(fetchAllDoctorsFailed());
      }
    } catch (e) {
      console.log("FETCH_LOAD_ALL_DOCTOR_FAILED", e);
      dispatch(fetchAllDoctorsFailed());
    }
  };
};

const fetchAllDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_LOAD_ALL_DOCTOR_SUCCESS,
  data: data,
});
const fetchAllDoctorsFailed = () => ({
  type: actionTypes.FETCH_LOAD_ALL_DOCTOR_FAILED,
});

//save details doctor
export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.createDetailDoctor(data);

      if (res && res.status === "OK") {
        toast.success("Save details success!");
        dispatch({
          type: actionTypes.SAVE_DETAILS_DOCTOR_SUCCESS,
        });
      } else {
        toast.error(res.message);

        dispatch({
          type: actionTypes.SAVE_DETAILS_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      console.log("SAVE_DETAILS_DOCTOR_FAILED", e);
      toast.error("Save details failed!");
      dispatch({
        type: actionTypes.SAVE_DETAILS_DOCTOR_FAILED,
      });
    }
  };
};
//edit details doctor
export const editDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.editDetailDoctor(data);

      if (res && res.status === "OK") {
        toast.success("Edit details success!");
        dispatch({
          type: actionTypes.EDIT_DETAILS_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Edit details failed!");

        dispatch({
          type: actionTypes.EDIT_DETAILS_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      console.log("EDIT_DETAILS_DOCTOR_FAILED", e);
      toast.error("Edit details failed!");
      dispatch({
        type: actionTypes.EDIT_DETAILS_DOCTOR_FAILED,
      });
    }
  };
};

//GET ALL HOURS SCHEDULE medical
export const getAllTimesSchedule = (type) => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.getAllCodes(type || "TIME");

      if (res && res.status === "OK") {
        dispatch({
          type: actionTypes.GET_ALL_HOURS_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_ALL_HOURS_FAILED,
        });
      }
    } catch (e) {
      console.log("GET_ALL_HOURS_FAILED", e);

      dispatch({
        type: actionTypes.GET_ALL_HOURS_FAILED,
      });
    }
  };
};

// create schedule doctor
export const saveScheduleDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.saveScheduleDoctor(data);

      if (res && res.status === "OK") {
        toast.success(<FormattedMessage id="manage-schedule.save-schedule-success" />);
        dispatch({
          type: actionTypes.SAVE_SCHEDULE_DOCTOR_SUCCESS,
          data: res.data,
        });
      } else {
        toast.error(<FormattedMessage id="manage-schedule.save-schedule-failed" />);

        dispatch({
          type: actionTypes.SAVE_SCHEDULE_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      console.log("SAVE_SCHEDULE_DOCTOR_FAILED", e);
      toast.error(<FormattedMessage id="manage-schedule.save-schedule-failed" />);
      dispatch({
        type: actionTypes.SAVE_SCHEDULE_DOCTOR_FAILED,
      });
    }
  };
};

//DETAIL DOCTOR

export const getRequiredDoctorDetails = () => {
  return async (dispatch, getState) => {
    try {
      const resPrice = await userService.getAllCodes("PRICE");
      const resPayment = await userService.getAllCodes("PAYMENT");
      const resProvince = await userService.getAllCodes("PROVINCE");
      const resSpecialty = await userService.getSpecialty();
      const resClinic = await userService.getAllClinic();

      if (
        resPrice &&
        resPrice.status === "OK" &&
        resPayment &&
        resPayment.status === "OK" &&
        resProvince &&
        resProvince.status === "OK" &&
        resSpecialty.status === "OK" &&
        resClinic &&
        resClinic.status === "OK"
      ) {
        let data = {
          dataPrice: resPrice.data,
          dataPayment: resPayment.data,
          dataProvince: resProvince.data,
          dataSpecialty: resSpecialty.data,
          dataClinic: resClinic.data,
        };
        dispatch({
          type: actionTypes.FETCH_REQUIRED_DOCTOR_DETAIL_SUCCESS,
          data: data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_REQUIRED_DOCTOR_DETAIL_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_REQUIRED_DOCTOR_DETAIL_FAILED", e);
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_DETAIL_FAILED,
      });
    }
  };
};

//get all specialty
export const getAllSpecialty = () => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.getSpecialty();

      if (res && res.status === "OK") {
        dispatch({
          type: actionTypes.GET_ALL_SPECIALTY_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_ALL_SPECIALTY_FAILED,
        });
      }
    } catch (e) {
      console.log("GET_ALL_SPECIALTY_FAILED", e);
      dispatch({
        type: actionTypes.GET_ALL_SPECIALTY_FAILED,
      });
    }
  };
};

//DELETE specialty by id
export const deleteSpecialtyById = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.deleteSpecialtyById(id);

      if (res && res.status === "OK") {
        toast.success("Delete specialty is success!!!");
        dispatch({
          type: actionTypes.DELETE_SPECIALTY_BY_ID_SUCCESS,
        });
      } else {
        toast.error("delete specialty is failed!!!");
        dispatch({
          type: actionTypes.DELETE_SPECIALTY_BY_ID_FAILED,
        });
      }
    } catch (e) {
      toast.error("delete specialty is failed!!!");
      console.log("DELETE_SPECIALTY_BY_ID_FAILED", e.toString());
      dispatch({
        type: actionTypes.DELETE_SPECIALTY_BY_ID_FAILED,
      });
    }
  };
};

//GET ALL clinic
export const getAllClinic = () => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.getAllClinic();

      if (res && res.status === "OK") {
        dispatch({
          type: actionTypes.GET_ALL_CLINIC_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_ALL_CLINIC_FAILED,
        });
      }
    } catch (e) {
      console.log("GET_ALL_CLINIC_FAILED", e);
      dispatch({
        type: actionTypes.GET_ALL_CLINIC_FAILED,
      });
    }
  };
};

//delete clinic
export const deleteClinicById = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.deleteClinicById(id);

      if (res && res.status === "OK") {
        toast.success("Delete clinic is success!!!");
        dispatch({
          type: actionTypes.DELETE_CLINIC_SUCCESS,
        });
      } else {
        toast.error("delete clinic is failed!!!");
        dispatch({
          type: actionTypes.DELETE_CLINIC_FAILED,
        });
      }
    } catch (e) {
      toast.error("delete clinic is failed!!!");
      console.log("DELETE_CLINIC_FAILED", e);
      dispatch({
        type: actionTypes.DELETE_CLINIC_FAILED,
      });
    }
  };
};
