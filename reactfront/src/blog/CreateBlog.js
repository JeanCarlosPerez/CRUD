import axios from "axios";
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const URI = 'http://localhost:8000/blogs'

const CompCreateBlog = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    //Guardar

    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, { title: title, content: content });
        window.location.reload();
    }

    const botonStyle = {
        marginBottom: '24px',
        marginTop: '12px'
    }

    return (
<div>
    <h1 style= {{marginTop:'-3px'}}>Crea tu Nota</h1>
    <form onSubmit={store}>
        <div class="bg-white shadow-md p-4">
            <label>Titulo</label>
            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '40ch'}, }} noValidate autoComplete="off">
            <TextField value={title} onChange={(e) => setTitle(e.target.value)} type="texto" label="Titulo" onKeyPress={(e) => { if (e.key === 'Enter') store(e) }} required />
            </Box>
        </div>
        <div>
            <label>Contenido</label>
            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '50ch' }, }} noValidate autoComplete="off">
            <TextField value={content} onChange={(e) => setContent(e.target.value)} type="texto" label="Comentario" onKeyPress={(e) => { if (e.key === 'Enter') store(e) }} required />
            </Box>
        </div>
        <Button type="submit" variant="contained" sx={botonStyle} >Enviar</Button>
    </form>
</div>

    )
}

export default CompCreateBlog