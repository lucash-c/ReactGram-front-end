import "./EditProfile.css";

import { uploads } from "../../utils/config";

// hooks 
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux
import { profile, resetMessage, updateProfile } from '../../slices/userSlice';

//components
import Message from "../../components/Message";

const EditProfile = () => {
    const dispatch = useDispatch();
    const { user, message, error, loading } = useSelector((state) => state.user);

    //states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    //carregar dados  do usuario

    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    // preenche o formulario com os dados do usuario que que vem do banco
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // pega os states do usuario e coloca em um objeto 
        const userData = {
            name
        }

        if (profileImage) {
            userData.profileImage = profileImage;
        }

        if (bio) {
            userData.bio = bio;
        }

        if (password) {
            userData.password = password;
        }

        //cria form data
        const formData = new FormData();

        const userFormData = Object.keys(userData).forEach((key) =>
            formData.append(key, userData[key])
        );
        formData.append("user", userFormData);

        await dispatch(updateProfile(formData));


        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    const handleFile = (e) => {
        //imagem
        const image = e.target.files[0];
        setPreviewImage(image);

        //atualiza o state de imagem
        setProfileImage(image);
    }

    return (
        <div id="edit-profile">
            <h2>Edite seus dados</h2>
            <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
            {(user.profileImage || previewImage) && (
                <img className="profile-image" src={previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`} alt="img" />
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ''} />
                <input type="email" placeholder="E-mail" disabled value={email || ''} />
                <label>
                    <span> Imagem do Perfil</span>
                    <input type="file" onChange={handleFile} />
                </label>
                <label>
                    <span>Bio:</span>
                    <input type="text" placeholder="Descrição do perfil" onChange={(e) => setBio(e.target.value)} value={bio || ''} />
                </label>
                <label>
                    <span>Quer alterar sua senha?</span>
                    <input type="password" placeholder="Digite sua nova senha" onChange={(e) => setPassword(e.target.value)} value={password || ''} />
                </label>
                {!loading && <input type="submit" value="Atualizar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </form>
        </div>
    )
}

export default EditProfile