import { useCanister, useConnect } from "@connect2ic/react";
import React, { useEffect, useState } from "react";
import Bienvenida from './Bienvenida'

const Areas = () => {
  
  const [areasICP] = useCanister("otro_backend");
  const {principal} = useConnect();
  
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState("");


  useEffect(() => {
      obtieneAreas();
  }, []);

 
  const obtieneAreas = async () => {
      setLoading("Loading...");
      try {
        var areasx = await areasICP.obtieneAreas();
          
        // setPosts(result.sort((a, b) => parseInt(a[0]) - parseInt(b[0])));  // Ordenar posts por ID
        // setAreas(areasx.sort((a, b) => parseInt(a[0]) - parseInt(b[0])));         
        setAreas(areasx);   
        areas.forEach((area, index) => {
          // <p>{area[0]}-{area[1].nombre}</p>
          console.log("id area " + area[0]);
          console.log("area" + area[1].nombre);
        });   
        setLoading("");

      } catch(e) {
          console.log(e);
          setLoading("Error happened fetching posts list");
      }

  }
  
  const eliminarArea = async (e) => {
    e.preventDefault();
   
    var id = e.target[0].value;
    console.log(id);

    setLoading("Loading...");

    await areasICP.eliminarArea(id);
    setLoading("");
    {
        document.getElementById('btnListaAreas').click();
    }
  }
  


  return(
    <>
    { principal 
      ? 
      <div className="row  mt-5">
        <div className="col">
          {loading != "" 
            ? 
              <div className="alert alert-primary">{loading}</div>
            :
              <div></div>
          }
        <div class="card">
          <div class="card-header">
          Lista de áreas
          </div>
          <div class="card-body">
          <table class="table">
              <thead>
              <tr>
                  <th>ID área</th>
                  <th>Nombre</th>
                  <th colspan="2">Opciones</th>
              </tr>
              </thead>
              <tbody id="tbody">
              {areas.map((area) => {
                return (
                  <tr>
                      <td>{area[0]}</td>
                      <td>{area[1].nombre}</td>
                      <td><button class="btn btn-primary btnEditarArea" data-id="{area[0]}">Editar</button></td>
                      <td>
                        <form onSubmit={eliminarArea} method="post">
                          <input type="hidden" value={area[0]} name="id" />
                          <button 
                              type="submit"
                              class="btn btn-danger btnEliminarModal" 
                            >
                              Eliminar
                          </button>
                          </form>
                      </td>
                  </tr>
                );
                })}
              </tbody>
          </table>         
          </div>
          </div>
        </div>
        <div class="modal fade" id="eliminarModal" tabindex="-1" aria-labelledby="eliminarModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
              <div class="modal-header">
                  <h1 class="modal-title fs-5" id="eliminarModalLabel">Confirmación</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div class="modal-body" id="modalBody"></div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="button" id="btnEliminarArea" class="btn btn-danger">Eliminar</button>
              </div>
              </div>
          </div>
        </div>
      </div>
    : 
      <Bienvenida />
    }
    </>
  )
}
  
  
export default Areas