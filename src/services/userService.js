import axios from "../axios";

export const getAllUserTest = () => {
  return axios.get(
    `https://test-pos.digibird.io/api/v1/front/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country`
  );
};

export const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};
//get all user from db
export const getAllUser = (id) => {
  return axios.get(`/api/get-all-users?id=${id}`);
};
//get details user
export const getDetailUser = (email) => {
  return axios.get(`/api/get-details-user`, {
    params: {
      email: email,
    },
  });
};
export const createNewUser = (data) => {
  return axios.post("/api/create-new-user", data);
};

export const deleteUser = (id) => {
  return axios.delete("/api/delete-user", {
    data: { id },
  });
};

export const editUserInfo = (data) => {
  return axios.put("/api/edit-user", data);
};

//get all code service
export const getAllCodes = (type) => {
  return axios.get(`/api/allcodes?type=${type}`);
};

//get top doctor home
export const getTopDoctorHome = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
//get all doctors
export const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};

//create details doctor
export const createDetailDoctor = (data) => {
  return axios.post(`/api/save-details-doctor`, data);
};
//edit details doctor
export const editDetailDoctor = (data) => {
  return axios.put(`/api/edit-details-doctor`, data);
};
//get doctor by id
export const getDetailDoctorByID = (id) => {
  return axios.get(`/api/get-details-doctor?id=${id}`);
};

//create schedule for doctor
export const saveScheduleDoctor = (data) => {
  return axios.post("/api/create-schedule", data);
};

//get schedule's doctor by date
export const getScheduleDoctorByDate = (id, date) => {
  return axios.get(`/api/get-schedule-by-date?doctorId=${id}&date=${date}`);
};

//DETAIL DOCTOR
export const getExtraInfoDoctor = (id) => {
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${id}`);
};

//get profile doctor
export const getProfileDoctor = (doctorId) => {
  return axios.get(`/api/get-profile-doctor?doctorId=${doctorId}`);
};

//create booking examination
export const createBookingExamination = (data) => {
  return axios.post(`/api/patient-booking`, data);
};
//verify booking appointment
export const verifyBookingAppointment = (data) => {
  return axios.post(`/api/verify-patient-booking`, data);
};

//create specialty
export const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};

//get specialtys
export const getSpecialty = () => {
  return axios.get(`/api/get-all-specialty`);
};

// get detail specialty by id
export const getDetailSpecialtyById = (data) => {
  return axios.get(`/api/get-detail-specialty?specialtyId=${data.specialtyId}&location=${data.location}`);
};
export const getDoctorBySpecialty = (data) => {
  return axios.get(`/api/get-doctor-by-specialty?specialtyId=${data.specialtyId}&location=${data.location}`);
};
//delete specialty by id
export const deleteSpecialtyById = (id) => {
  return axios.delete(`/api/delete-specialty?id=${id}`);
};

//edit specialty
export const editSpecialtyById = (data) => {
  return axios.put(`/api/edit-specialty`, data);
};

//create new clinic
export const createNewClinic = (data) => {
  return axios.post(`/api/clinic/create-new-clinic`, data);
};

//get all clinic
export const getAllClinic = () => {
  return axios.get(`/api/clinic/get-all-clinic`);
};

//edit clinic

export const editClinicById = (data) => {
  return axios.put(`/api/clinic/edit-clinic`, data);
};

//delete clinic

export const deleteClinicById = (id) => {
  return axios.delete(`/api/clinic/delete-clinic?id=${id}`);
};

//get clinic by id
export const getClinicById = (id) => {
  return axios.get(`/api/clinic/get-clinic-by-id?id=${id}`);
};
//get patient booking
export const getPatientBooking = (doctorId, date) => {
  return axios.get(`/api/doctor/get-list-patient-booking?doctorId=${doctorId}&date=${date}`);
};

//send remedy to email
export const sendRemedyToEmail = (data) => {
  return axios.post(`/api/send-remedy`, data);
};
