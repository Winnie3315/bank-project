import axios from "axios"

const baseURL = "http://localhost:8080"


export const getData = async (path) => {
    try {
        const res = await axios.get(baseURL + path)

        return res
    } catch(e) {
        alert(e.message, 'error')
    }
}
export const postData = async (path, body) => {
    try {
        const res = await axios.post(baseURL + path, body)

        return res
    } catch(e) {
        alert(e.message , 'error')
    }
}
export const patchData = async (path, body) => {
    try {
       const res = await axios.patch(baseURL + path, body)

       return res
    } catch(e) {
       alert(e.message, 'error')
    }
}