import { api, requestConfig } from '../utils/config'

//registra um usuario
const register = async (data) => {

    const config = requestConfig("POST", data)
    try {
        const res = await fetch(api + "/users/register", config)
            .then((res) => res.json())
            .catch((err) => err);

        if (res) {
            localStorage.setItem("user", JSON.stringify(res));
        }
        return res;


    } catch (error) {
        console.log(error)
    }
}
// login de um usuario
const login = async (data) => {
    const config = requestConfig("POST", data);

    try {

        const res = await fetch(api + "/users/login", config)
            .then((res) => res.json()).catch((err) => err);

        if (res) {
            if (res._id) {
                localStorage.setItem("user", JSON.stringify(res));
            }
        }
        return res;
    } catch (error) {
        console.log(error)
    }
};

//logout de um usuario
const logout = () => {
    localStorage.removeItem("user");
}



const authService = {
    register,
    login,
    logout,
}

export default authService;