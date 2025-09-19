import axios from "axios"


const API_URL = "/api/connections/";

const getMyConnections = async () => {
    const res = await axios.get(API_URL + "my-network");
    return res.data;
};

const sendRequest = async(recipientId) => {
    const res = await axios.post(API_URL + "request", {recipientId});
    return res.data
};

const acceptRequest = async (connectionId) => {
    const res = await axios.put(API_URL + connectionId, { status: "ACCEPTED" });
    return res.data;
}

const getSuggestions = async () => {
    const res = await axios.get(API_URL + "suggestions");
    return res.data;
}

export default { getMyConnections, sendRequest, acceptRequest, getSuggestions };