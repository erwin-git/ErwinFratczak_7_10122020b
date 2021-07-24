import Api from "../services/Api";

export default {
  signup(data) {
    return Api().post("auth/signup", data);
  },
  login(data) {
    return Api().post("auth/login", data);
  },
  deleteAccount(id) {
    return Api().delete("auth/" + id);
  },

  updateAccount(id, data) {
    return Api.put("auth/edit/" + id, data);
  },
  getUsers() {
    return Api().get("auth/");
  },
  getUserById(id) {
    return Api().get("auth/" + id);
  },
};
