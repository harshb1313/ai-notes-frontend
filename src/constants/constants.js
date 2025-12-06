const constants = {
    API_ENDPOINTS: {
        userLogin: `/auth/token/`,
        userRegister: `/auth/register/`,
        getUserNotes: `/notes/`,
        getSingleNote: (id) => `/notes/${id}/`,
        aiSummarizer: (id) => `/notes/${id}/summarize/`,
        aiKeywords: `/notes/ai/keywords/`,
        aiTitleGen: `/notes/ai/titlegen/`,
        aiRewrite: `/notes/ai/paraphrase/`
    }
};

export default constants;
