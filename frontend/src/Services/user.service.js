import http from "../http-common";

const get = () => {
    return http.get("/users");
};

const getById = (id) => {
    return http.get(`/users/${id}`);
};

const create = (data) => {
    return http.post("/users", data);
};

const update = (id, data) => {
    return http.put(`/users/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/users/${id}`);
};

const UserService = {
    get,
    getById,
    create,
    update,
    remove
};

export default UserService;