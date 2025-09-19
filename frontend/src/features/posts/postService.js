import axios from 'axios';

const API_URL = "/api/posts/";

const getFeed = async () => {
    const res = await axios.get(API_URL + "feed");
    return res.data;
};

const create = async (postData) => {
    const res = await axios.post(API_URL, postData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
};

const like = async (postId) => {
    const res = await axios.post(`${API_URL}${postId}/likes`);
    return res.data;
};

const comment = async (postId, text) => {
    const res = await axios.post(`${API_URL}${postId}/comment`, { text });
    return res.data;
};

const remove = async (postId) => {
    const res = await axios.delete(`${API_URL}${postId}`);
    return res.data;
};

const update = async (postId, postData) => {
    const res = await axios.put(`${API_URL}${postId}`, postData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
};

export default { getFeed, create, like, comment, remove, update };