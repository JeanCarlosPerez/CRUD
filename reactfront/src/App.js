import './App.css';
import CompShowBlogs from './blog/Showblogs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompEditBlog from './blog/EditBlog';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<CompShowBlogs/>} />
            <Route path='/edit/:id' element={<CompEditBlog/>} /> 
          </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
