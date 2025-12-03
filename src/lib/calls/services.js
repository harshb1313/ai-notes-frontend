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
export const getUserNotes = async () => {
    try {
        const response = await api.get(API_ENDPOINTS.getUserNotes)
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