export const adminMenu = [
  {
    name: "menu.admin.custom",
    menus: [
      {
        name: "menu.admin.home",
        link: "/system/welcome",
      },
    ],
  },

  {
    //Quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud-redux",
        subMenus: [
          { name: "menu.admin.create-user-redux", link: "/system/user/user-redux" },
          { name: "menu.admin.view-all-user", link: "/system/user/view-all-user" },
        ],
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/doctor/manage-doctor",
      },
      {
        name: "menu.admin.manage-admin",
        link: "/system/user-admin",
      },
    ],
  },
  {
    //Quản lý chung
    name: "menu.admin.manage-general",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        subMenus: [
          { name: "menu.admin.add-new-clinic", link: "/system/clinic/add-clinic" },
          { name: "menu.admin.all-clinic", link: "/system/clinic/all-clinic" },
        ],
      },

      {
        name: "menu.admin.manage-specialty",

        subMenus: [
          { name: "menu.admin.add-specialty", link: "/system/specialty/add-specialty" },
          { name: "menu.admin.info-specialty", link: "/system/specialty/all-specialty" },
        ],
      },

      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
];

export const doctorMenu = [
  {
    //Quản lý kế hoạch khám bệnh
    name: "menu.doctor.manage-doctor-general",
    menus: [
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      {
        //quản lý lịch khám bệnh được đặt
        name: "menu.doctor.manage-patient-booking",
        link: "/doctor/manage-patient-booking",
      },
    ],
  },
];
