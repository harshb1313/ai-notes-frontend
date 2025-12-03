const constants = {
    API_ENDPOINTS: {
        userLogin: `/auth/token/`,
        userRegister: `/auth/register/`,
        getUserNotes: `/notes/`,
        getSingleNote: (id) => `/notes/${id}/`,
    }
};

export default constants;
