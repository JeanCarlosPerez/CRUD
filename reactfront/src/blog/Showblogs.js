import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CompCreateBlog from './CreateBlog';
import BasicModal from './ModalBlogUnico';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const URI = 'http://localhost:8000/blogs';

const CompShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3; // Número de blogs por página
  const [checkedList, setCheckedList] = useState({}); // Estado individual de selección para cada tarjeta

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const res = await axios.get(URI);
      setBlogs(res.data);
      // Inicializa el estado de selección para cada tarjeta con el estado actual
      const initialCheckedList = {};
      res.data.forEach(blog => {
        initialCheckedList[blog.id] = false;
      });
      setCheckedList(initialCheckedList);
    } catch (error) {
      console.error('Error al obtener los blogs:', error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`${URI}/${id}`);
      getBlogs(); // Vuelve a obtener los blogs después de eliminar uno
    } catch (error) {
      console.error('Error al eliminar el blog:', error);
    }
  };

  const handleOpenModal = (title, content) => {
    setSelectedBlog({ title, content });
  };

  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  // Maneja el cambio de estado de un checkbox en particular
  const handleChange = (id) => {
    setCheckedList(prevState => ({
      ...prevState,
      [id]: !prevState[id] // Cambia el estado del checkbox específico
    }));
  };

  return (
    <div>
      <CompCreateBlog />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2em' }}>
        {currentBlogs.map((blog) => (
          <Card key={blog.id} style={{ width: '300px', height: '170px', marginBottom: '30px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {blog.title}
              </Typography>
              <Typography variant="body2">
                {blog.content}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/edit/${blog.id}`}>
                <Button size="small" variant="contained">Editar</Button>
              </Link>
              <Button size="small" variant="contained" onClick={() => handleDeleteBlog(blog.id)}>Delete</Button>
              <Button size="small" variant="contained" onClick={() => handleOpenModal(blog.title, blog.content)}>Open Modal</Button>
            </CardActions>
            <Checkbox
              checked={checkedList[blog.id]} // Usa el estado del checkbox correspondiente
              onChange={() => handleChange(blog.id)} // Pasa el ID del blog a la función de cambio
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Card>
        ))}
      </div>
      <Pagination count={Math.ceil(blogs.length / blogsPerPage)} page={currentPage} onChange={paginate}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', }} color="primary" />
      <BasicModal title={selectedBlog?.title} content={selectedBlog?.content} onClose={handleCloseModal} />
    </div>
  );
};

export default CompShowBlogs;
