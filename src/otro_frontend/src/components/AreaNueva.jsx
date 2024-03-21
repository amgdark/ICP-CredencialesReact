import { useCanister } from "@connect2ic/react";
import React, { useEffect, useState } from "react";


const Alumnos = () => {
    const [areaICP] = useCanister("otro_backend");
    const [loading, setLoading] = useState("");


    const guardarArea = async (e) => {
        e.preventDefault();
        var area = e.target[0].value;
        console.log(area);

        setLoading("Loading...");

        await areaICP.crearArea(area);
        setLoading("");

        {
            document.getElementById('btnListaAreas').click();
        }

        
    }

    
    return (
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
                    Registrar área
                </div>
                <div class="card-body">
                    <form class="form"  onSubmit={guardarArea}>
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre área</label>
                        <input type="text" class="form-control" id="nombre" placeholder="Ingeniería Eléctrica" />
                    </div>
                
                    <input type="submit" class="btn btn-success" value="Agregar"/>  
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
  }
  
  
  export default Alumnos