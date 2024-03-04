import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const URI = 'http://localhost:8000/blogs';

const CompEditBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    // Procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${URI}/${id}`, {
                title: title,
                content: content
            });
            navigate('/');
        } catch (error) {
            console.error('Error al actualizar el blog:', error);
        }
    };

    useEffect(() => {
        getBlogById();
    }, [id]);

    const getBlogById = async () => {
        try {
            const res = await axios.get(`${URI}/${id}`);
            setTitle(res.data.title);
            setContent(res.data.content);
        } catch (error) {
            console.error('Error al obtener el blog por ID:', error);
        }
    };

    return (
        <div>
            <h1>Edita tu Nota</h1>
            <form onSubmit={update}>
                <div className="bg-white shadow-md p-4">
                    <label>Titulo</label>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '40ch' }, }} noValidate autoComplete="off">
                    <TextField value={title} onChange={(e) => setTitle(e.target.value)} type="text" label="Título" />
                    </Box>
                </div>
                <div>
                    <label>Contenido</label>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '50ch' }, }} noValidate autoComplete="off">
                    <TextField value={content} onChange={(e) => setContent(e.target.value)} type="text" label="Contenido" />
                    </Box>
                </div>
                <Button type="submit" variant="contained">Enviar</Button>
            </form>
        </div>
    );
};

export default CompEditBlog;
