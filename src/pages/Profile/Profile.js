import "./Profile.css";

import { uploads } from "../../utils/config";

//components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

//hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//redux
import { getUserDetails } from "../../slices/userSlice";
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto, updatePhoto } from "../../slices/photoSlice";

const Profile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    //usuario que tera a sua pagina exibida
    const { user, loading } = useSelector((state) => state.user);

    //usuario autenticado
    const { user: userAuth } = useSelector((state) => state.auth)

    //fotos
    const { photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto } = useSelector((state) => state.photo);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    //edição
    const [editId, setEditId] = useState("");
    const [editImage, setEditImage] = useState("");
    const [editTitle, setEditTitle] = useState("");

    //novo form e editar referencias de form
    const newPhotoForm = useRef()
    const editPhotoForm = useRef()

    //carrega o usuario
    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id))
    }, [dispatch, id]);

    const handleFile = (e) => {
        //imagem
        const image = e.target.files[0];
        setImage(image);
    }

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    const submitHandle = (e) => {
        e.preventDefault();

        const photoData = {
            title,
            image
        };

        //contrução do form data
        const formData = new FormData();

        const photoFormData = Object.keys(photoData).forEach((key) =>
            formData.append(key, photoData[key]));

        formData.append("photo", photoFormData);

        dispatch(publishPhoto(formData));

        setTitle("");

        resetComponentMessage();


    };

    //deletar uma foto
    const handleDelete = (id) => {
        dispatch(deletePhoto(id))

        resetComponentMessage();

    }

    //mostrar ou esconder forms
    const hideOrShowForms = () => {
        newPhotoForm.current.classList.toggle("hide")
        editPhotoForm.current.classList.toggle("hide")
    }

    //atualizar uma foto
    const handleUpdate = (e) => {
        e.preventDefault()
        const photoData = {
            title: editTitle,
            id: editId
        }

        dispatch(updatePhoto(photoData));
        resetComponentMessage();
    }

    //abrir o form de edição
    const handleEdit = (photo) => {
        if (editPhotoForm.current.classList.contains("hide")) {
            hideOrShowForms();
        }

        setEditId(photo._id);
        setEditTitle(photo.title);
        setEditImage(photo.image);
    }

    const handleCancelEdit = (e) => {
        hideOrShowForms();
    }

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div id="profile">
            <div className="profile-header">
                {user.profileImage && (
                    <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                )}
                <div className="profile-description">
                    <h2>{user.name}</h2>
                    <p>{user.bio} </p>
                </div>

            </div>
            {id === userAuth._id && (
                <>
                    <div className="new-photo" ref={newPhotoForm}>
                        <h3>Compartilhe algum momento seu: </h3>
                        <form onSubmit={submitHandle}>
                            <label>
                                <span> Título para a foto:</span>
                                <input type="text" placeholder="Insira um titulo" onChange={(e) => setTitle(e.target.value)} value={title || ""} />
                            </label>
                            <label>
                                <span>Imagem</span>
                                <input type="file" onChange={handleFile} />
                            </label>
                            {!loadingPhoto && <input type="submit" value="Postar" />}
                            {loadingPhoto && <input type="submit" value="Aguarde..." disabled />}

                        </form>
                    </div>
                    <div className="edit-photo hide" ref={editPhotoForm}>
                        <p>Editando: </p>
                        {editImage && (
                            <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
                        )}

                        <form onSubmit={handleUpdate}>

                            <input type="text" onChange={(e) => setEditTitle(e.target.value)} value={editTitle || ""} />

                            {!loadingPhoto && <input type="submit" value="Atualizar" />}
                            {loadingPhoto && <input type="submit" value="Aguarde..." disabled />}
                            <button className="cancel-btn" onClick={handleCancelEdit}>Cancelar edição</button>

                        </form>
                    </div>

                    {errorPhoto && <Message msg={errorPhoto} type="error" />}
                    {messagePhoto && <Message msg={messagePhoto} type="success" />}
                </>
            )}

            <div className="user-photos">
                <h2>Fotos publicadas: </h2>
                <div className="photos-container">
                    {photos && photos.map((photo) => (
                        <div className="photo" key={photo._id}>
                            {photo.image && (
                                <Link to={`/photos/${photo._id}`}><img src={`${uploads}/photos/${photo.image}`} alt={photo.title} /></Link>

                            )}
                            <div className="actions">
                                {id === userAuth._id ? (
                                    <>
                                        <Link to={`/photos/${photo._id}`}>
                                            <BsFillEyeFill />
                                        </Link>
                                        <BsPencilFill onClick={() => handleEdit(photo)} />
                                        <BsXLg onClick={() => handleDelete(photo._id)} />
                                    </>
                                ) : (
                                    <>
                                        <Link className="btn" to={`/photos/${photo._id}`}>
                                            Ver
                                        </Link>
                                    </>

                                )}
                            </div>
                        </div>
                    ))}
                    {photos.length === 0 && <p> Ainda não há fotos publicadas</p>}
                </div>
            </div>
        </div>
    )
}

export default Profile