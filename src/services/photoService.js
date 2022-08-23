import { api, requestConfig } from "../utils/config";


//publicar uma foto de um usuario
const publishPhoto = async (data, token) => {

    const config = requestConfig("POST", data, token, true)

    try {

        const res = await fetch(api + "/photos", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
}

//buscar fotos do usuario
const getUserPhotos = async (id, token) => {

    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/photos/user/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

//excluir uma foto

const deletePhoto = async (id, token) => {
    const config = requestConfig("DELETE", null, token)

    try {
        const res = await fetch(api + "/photos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
}

// atualizar uma foto
const updatePhoto = async (data, id, token) => {
    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api + "/photos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
};

// trazer foto pelo id
const getPhoto = async (id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/photos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }

};

//trazer foto por titulo
const searchPhotos = async (query, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/photos/search?q=" + query, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }

}



//trazer todas as fotos
const getPhotos = async (token) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + "/photos", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)
    }
}

// função de like
const like = async (id, token) => {

    const config = requestConfig("PUT", null, token);

    try {
        const res = await fetch(api + "/photos/like/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

//adicionar comentario na foto
const comment = async (data, id, token) => {
    const config = requestConfig("PUT", data, token)

    try {
        const res = await fetch(api + "/photos/comment/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error)
    }
};

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    searchPhotos,
    getPhotos,
    like,
    comment,
};

export default photoService;
