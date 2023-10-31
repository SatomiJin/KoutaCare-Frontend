import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  userDetail: {},
  doctorDetails: {},
  extraInfoDoctor: {},
  scheduleDoctor: [],
  profileDoctor: {},
  verify: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.GET_DETAIL_DOCTOR_BY_ID_SUCCESS:
      state.doctorDetails = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_DETAIL_DOCTOR_BY_ID_FAILED:
      state.doctorDetails = [];
      return {
        ...state,
      };
    case actionTypes.GET_SCHEDULE_DOCTOR_SUCCESS:
      state.scheduleDoctor = action.data;

      return {
        ...state,
      };
    case actionTypes.GET_SCHEDULE_DOCTOR_FAILED:
      state.scheduleDoctor = [];
      return {
        ...state,
      };
    //get detail user
    case actionTypes.GET_DETAIL_USER_SUCCESS:
      state.userDetail = action.data;

      return {
        ...state,
      };
    case actionTypes.GET_DETAIL_USER_FAILED:
      state.userDetail = {};
      return {
        ...state,
      };
    //get extra info doctor
    case actionTypes.GET_EXTRA_INFO_DOCTOR_SUCCESS:
      state.extraInfoDoctor = action.data;

      return {
        ...state,
      };
    case actionTypes.GET_EXTRA_INFO_DOCTOR_FAILED:
      state.extraInfoDoctor = [];
      return {
        ...state,
      };
    //get profile doctor
    case actionTypes.GET_PROFILE_DOCTOR_SUCCESS:
      state.profileDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_PROFILE_DOCTOR_FAILED:
      state.profileDoctor = [];
      return {
        ...state,
      };
    //verify appointment
    case actionTypes.VERIFY_BOOKING_APPOINTMENT_SUCCESS:
      return {
        ...state,
        verify: true,
      };
    case actionTypes.VERIFY_BOOKING_APPOINTMENT_FAILED:
      return {
        ...state,
        verify: false,
      };
    default:
      return state;
  }
};

export default appReducer;
