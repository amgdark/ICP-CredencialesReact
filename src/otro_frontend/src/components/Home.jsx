
import { createClient } from "@connect2ic/core"
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity"
import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react"
import * as otro_backend from "declarations/otro_backend";
import {  useConnect } from "@connect2ic/react";
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import Login from "./Bienvenida";
import Areas from "./Areas";
import Programas from "./Programas";
import Alumnos from "./Alumnos";
import AreaNueva from "./AreaNueva";

const Home = () => {
  const {principal} = useConnect();

  function onElementAvailable(selector, callback) {
    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        callback();
      }
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  onElementAvailable(".ii-styles", () => {
    const btn2 = Array.from(document.getElementsByClassName('ii-styles'));

    const custom_style={
        "color": "red",
        "background-color": "blue",
        "padding": "3px",
        "margin-left": "4px"
    }
    

    Object.assign(btn2[0].style,custom_style);

    const texto = Array.from(document.getElementsByClassName('button-label'));
    if (texto[0])
        texto[0].remove();

    const img = Array.from(document.getElementsByClassName('img-styles'));
    img[0].style.height = "25px";

  });

  onElementAvailable(".connect-button", () => {
    const btn = Array.from(document.getElementsByClassName('connect-button'));
    const custom_style={
        "background-color": "blue",
        "font-size": "17px",
    }
    Object.assign(btn[0].style,custom_style);
    if ( btn[0].textContent == 'Connect' || btn[0].textContent == 'Conectar II')
        btn[0].textContent = 'Conectar II' ;
    else
        btn[0].textContent = 'Desconectar II' ;


  });

  
  return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        
        { principal ? ( 
            <div className="container-fluid">
                
                    <Link to='/' className="navbar-brand">ICP Credentials</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#"></a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Área
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link to='/area-nueva' className="dropdown-item" >Nuevo</Link></li>
                                <li><Link to='/areas' className="dropdown-item" id="btnListaAreas">Lista</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Programas
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link to='/programas' className="dropdown-item" >Nuevo</Link></li>
                                <li><Link to='/programas' className="dropdown-item" >Lista</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Alumnos
                            </a>
                            <ul className="dropdown-menu">
                                    <li><Link to='/alumnos' className="dropdown-item" >Nuevo</Link></li>
                                <li><Link to='/alumnos' className="dropdown-item" >Lista</Link></li>
                            </ul>
                        </li>
                    
                    </ul>
                    
                    {/* <span className="fs-6 text">{principal}</span> */}
                    <ConnectButton />
                    <ConnectDialog />
                </div>
                

            </div>
        )
        : ( 
            <div className="container-fluid">
            <a className="navbar-brand" href="#">ICP Credentials</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#"></a>
                    </li>
                </ul>
                <span className="fs-6 text" style={{ "color": "white", "margin-right": "5px"}}>Inicia sesión</span>
                <ConnectButton />
                <ConnectDialog />
            </div>
        </div>
        )}
       
    </nav>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/area-nueva" element={<AreaNueva />} />
        <Route path="/programas" element={<Programas />} />
        <Route path="/alumnos" element={<Alumnos />} />
    </Routes>

    </BrowserRouter>

  )
}


const client = createClient({
    canisters: {
      otro_backend,
    },
    providers: [
      new InternetIdentity({ providerUrl: "http://127.0.0.1:8000/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai" })
    ],
    globalProviderConfig: {
      /*
       * Disables dev mode in production
       * Should be enabled when using local canisters
       */
      dev: true,
    },
  });


export default () => (
  <Connect2ICProvider client={client}>
    <Home />
  </Connect2ICProvider>
)


