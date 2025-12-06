import constants from '../../constants/constants'
import api from '../api'

const API_ENDPOINTS = constants.API_ENDPOINTS

export const LogIn = async (formdata) => {
    try {
        const response = await api.post(API_ENDPOINTS.userLogin, formdata)
        return response.data
    } catch (error) {
        console.error("Error during LogIn:", error);
        throw error
    }
}

export const Register = async (formdata) => {
    try {
        const response = await api.post(API_ENDPOINTS.userRegister, formdata)
        return response.data
    } catch (error) {
        console.error("Error during Register:", error);
        throw error
    }
}

//get User Notes
export const getUserNotes = async (filters = {}) => {
    try {
        const response = await api.get(API_ENDPOINTS.getUserNotes, { params: filters })
        return response.data
    } catch (error) {
        console.log("error while fetching user notes", error);
        throw error
    }
}

//create Notes

export const CreateNotes = async (formdata) => {
    try {
        const response = await api.post(API_ENDPOINTS.getUserNotes, formdata)
        return response
    } catch (error) {
        console.log("error while creating notes", error)
        throw error
    }
}

//get Single Note
export const getSingleNote = async (id) => {
    try {
        const response = await api.get(API_ENDPOINTS.getSingleNote(id))
        return response.data
    } catch (error) {
        console.log("error while fetching single note", error)
        throw error
    }
}

//edit Note
export const editNote = async (id, formdata) => {
    try {
        const response = await api.patch(API_ENDPOINTS.getSingleNote(id), formdata)
        return response.data
    } catch (error) {
        console.log("error while editing note", error)
        throw error
    }
}

//delete Note
export const deleteNote = async (id) => {
    try {
        const response = await api.delete(API_ENDPOINTS.getSingleNote(id))
        return response.data
    } catch (error) {
        console.log("error while deleting note", error)
        throw error
    }
}

// AI Summarizer
export const aiSummarizer = async (id) => {
    try {
        const response = await api.post(API_ENDPOINTS.aiSummarizer(id))
        return response.data
    } catch (error) {
        console.log("error while summarizing note", error)
        throw error
    }
}

// AI Keywords
export const aiKeywords = async (text) => {
    try {
        const response = await api.post(API_ENDPOINTS.aiKeywords, { text })
        return response.data
    } catch (error) {
        console.log("error while extracting keywords", error)
        throw error
    }
}

//AI Title Generation
export const aiTitleGen = async (text) => {
    try {
        const response = await api.post(API_ENDPOINTS.aiTitleGen, { text })
        return response.data
    } catch (error) {
        console.log("error while generating title", error)
        throw error
    }
}

//AI Rewrite
export const aiRewrite = async (text) => {
    try {
        const response = await api.post(API_ENDPOINTS.aiRewrite, { text })
        return response.data
    } catch (error) {
        console.log("error while rewriting text", error)
        throw error
    }
}