import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  allTimes: [],
  allRequiredDetailDoctor: [],
  allSpecialty: [],
  allClinic: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyStateS = { ...state };
      copyStateS.isLoadingGender = true;
      return {
        ...copyStateS,
      };

    case actionTypes.FETCH_GENDER_SUCCES:
      const copyState = { ...state };
      copyState.isLoadingGender = false;
      copyState.genders = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      const copyStateSS = { ...state };
      copyStateSS.isLoadingGender = false;
      copyStateSS.genders = [];
      return {
        ...copyStateSS,
      };
    //position
    case actionTypes.FETCH_POSITION_SUCCES:
      const positionState = { ...state };
      positionState.positions = action.data;
      return {
        ...positionState,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      const positionState1 = [];

      return {
        ...positionState1,
      };
    //role
    case actionTypes.FETCH_ROLE_SUCCESS:
      const roleState = { ...state };
      roleState.roles = action.data;
      return {
        ...roleState,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      const roleState1 = [];

      return {
        ...roleState1,
      };
    //get all user
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };
    //loading top doctors
    case actionTypes.FETCH_LOAD_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.data;

      return {
        ...state,
      };

    case actionTypes.FETCH_LOAD_TOP_DOCTOR_FAILED:
      state.topDoctor = [];
      return {
        ...state,
      };
    //get all doctors
    case actionTypes.FETCH_LOAD_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_LOAD_ALL_DOCTOR_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };
    //get all time schedule medical
    case actionTypes.GET_ALL_HOURS_SUCCESS:
      state.allTimes = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_HOURS_FAILED:
      state.allTimes = [];
      return {
        ...state,
      };
    //all required doctor details
    case actionTypes.FETCH_REQUIRED_DOCTOR_DETAIL_SUCCESS:
      state.allRequiredDetailDoctor = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_DETAIL_FAILED:
      state.allRequiredDetailDoctor = [];

      return {
        ...state,
      };
    //get all specialty
    case actionTypes.GET_ALL_SPECIALTY_SUCCESS:
      state.allSpecialty = action.data;

      return {
        ...state,
      };
    case actionTypes.GET_ALL_SPECIALTY_FAILED:
      state.allSpecialty = [];

      return {
        ...state,
      };
    case actionTypes.GET_ALL_CLINIC_SUCCESS:
      state.allClinic = action.data;

      return {
        ...state,
      };
    case actionTypes.GET_ALL_CLINIC_FAILED:
      state.allClinic = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
