import axios from "axios"


const API_URL = "/api/applications/"

const submit = async (data) => {
    const res = await axios.post(API_URL + "submit", data);
    return res.data;
};

const updateStatus = async (applicationId, status) => {
    const res = await axios.put(API_URL + applicationId, { status });
    return res.data;
};

const review = async (applicationId, status) => {
    const res = await axios.put(API_URL + applicationId, { status });
    return res.data;
};

const uploadDocuments = async (formData) => {
    const res = await axios.post(API_URL + "upload-documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};

const getPendingApplications = async () => {
    const res = await axios.get(API_URL + "pending");
    return res.data;
};

const getMyStatus = async() => {
    const res= await axios.get(API_URL+"my-status");
    return res.data


}

export default { submit, getMyStatus, updateStatus, review, uploadDocuments, getPendingApplications };