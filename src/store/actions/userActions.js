import actionTypes from "./actionTypes";
import * as userService from "../../services/userService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});
export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

//get detail doctor by id
export const getDetailDoctorById = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.getDetailDoctorByID(id);
      if (res && res.status === "OK") {
        dispatch({
          type: actionTypes.GET_DETAIL_DOCTOR_BY_ID_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_DETAIL_DOCTOR_BY_ID_FAILED,
        });
      }
    } catch (e) {
      console.log("GET_DETAIL_DOCTOR_BY_ID_FAILED", e);
      dispatch({
        type: actionTypes.GET_DETAIL_DOCTOR_BY_ID_FAILED,
      });
    }
  };
};

//get schedule doctor by date
export const getScheduleDoctorByDate = (doctorId, date) => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.getScheduleDoctorByDate(doctorId, date);

      if (res && res.status === "OK") {
        dispatch({
          type: actionTypes.GET_SCHEDULE_DOCTOR_SUCCESS,
          data: res.schedules,
        });
      } else {
        dispatch({
          type: actionTypes.GET_SCHEDULE_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      console.log("GET_SCHEDULE_DOCTOR_FAILED", e);
      dispatch({
        type: actionTypes.GET_SCHEDULE_DOCTOR_FAILED,
      });
    }
  };
};

//get detail user
export const getDetailUser = (email) => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.getDetailUser(email);

      if (res && res.status === "OK") {
        dispatch({
          type: actionTypes.GET_DETAIL_USER_SUCCESS,
          data: res.userData,
        });
      } else {
        dispatch({
          type: actionTypes.GET_DETAIL_USER_FAILED,
        });
      }
    } catch (e) {
      console.log("GET_DETAIL_USER_FAILED", e);
      dispatch({
        type: actionTypes.GET_DETAIL_USER_FAILED,
      });
    }
  };
};

//get extra information doctor
export const getExtraInfoDoctor = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.getExtraInfoDoctor(doctorId);

      if (res && res.status === "OK") {
        dispatch({
          type: actionTypes.GET_EXTRA_INFO_DOCTOR_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_EXTRA_INFO_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      console.log("GET_EXTRA_INFO_DOCTOR_FAILED", e);
      dispatch({
        type: actionTypes.GET_EXTRA_INFO_DOCTOR_FAILED,
      });
    }
  };
};

// GET PROFILE DOCTOR BY id
export const getProfileDoctorById = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.getProfileDoctor(doctorId);

      if (res && res.status === "OK") {
        dispatch({
          type: actionTypes.GET_PROFILE_DOCTOR_SUCCESS,
          data: res.profile,
        });
      } else {
        dispatch({
          type: actionTypes.GET_PROFILE_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      console.log("GET_PROFILE_DOCTOR_FAILED", e);
      dispatch({
        type: actionTypes.GET_PROFILE_DOCTOR_FAILED,
      });
    }
  };
};

//create booking examination
export const createBookingExamination = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.createBookingExamination(data);

      if (res && res.status === "OK") {
        toast.success(<FormattedMessage id="doctor-detail.booking-success" />);
        dispatch({
          type: actionTypes.CREATE_BOOKING_EXAMINATION_SUCCESS,
        });
      } else {
        toast.error(<FormattedMessage id="doctor-detail.booking-failed" />);

        dispatch({
          type: actionTypes.CREATE_BOOKING_EXAMINATION_FAILED,
        });
      }
    } catch (e) {
      console.log("CREATE_BOOKING_EXAMINATION_FAILED", e);
      toast.error(<FormattedMessage id="doctor-detail.booking-failed" />);

      dispatch({
        type: actionTypes.CREATE_BOOKING_EXAMINATION_FAILED,
      });
    }
  };
};

//verify booking appointment
export const verifyBookingAppointment = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.verifyBookingAppointment(data);

      if (res && res.status === "OK") {
        dispatch({
          type: actionTypes.VERIFY_BOOKING_APPOINTMENT_SUCCESS,
        });
      } else {
        dispatch({
          type: actionTypes.VERIFY_BOOKING_APPOINTMENT_FAILED,
        });
      }
    } catch (e) {
      console.log("VERIFY_BOOKING_APPOINTMENT_FAILED", e);
      dispatch({
        type: actionTypes.VERIFY_BOOKING_APPOINTMENT_FAILED,
      });
    }
  };
};
