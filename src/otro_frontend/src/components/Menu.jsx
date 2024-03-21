
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import Login from "./Bienvenida";
import Areas from "./Areas";
import Programas from "./Programas";
import Alumnos from "./Alumnos";

const Menu = () => {
  
  return (
        
    <BrowserRouter>
    
        <Link to='/' className="navbar-brand">ICP Credentials</Link>
        <Link to='/areas' className="dropdown-item" >areas</Link>
        <Link to='/programas' className="dropdown-item" >programas</Link>
        <Link to='/alumnos' className="dropdown-item" >alumnos</Link>

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/programas" element={<Programas />} />
            <Route path="/alumnos" element={<Alumnos />} />
        </Routes>
    </BrowserRouter>

  )
}



export default Menu

