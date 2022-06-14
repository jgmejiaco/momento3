import React, { useState, useEffect } from 'react';
//npm install react-hook-form
import { useForm } from 'react-hook-form';

export default function SimuladorCredito() {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [inputs, setInputs] = useState({
        email:'',
        valor:'',
        tipo_prestamo:'',
        cuotas:''
    });

    useEffect(() => {
        fetch('http://localhost:80/web2/momento3_db/InsertCredito.php')
        .then((response) => {
            return response.json()
        })
        .then((inputs) => {
            setInputs(inputs)
        })
    }, [])

    // let handleInputChange = (event)=>{
    //     setInputs({
    //         ...inputs,
    //         [event.target.name]:event.target.value
    //     })
    // }

 

    const valForm = (data, e) => {
        console.log(data);

        function Tvivienda() {
            let interes;
            if (data.tipo_prestamo === "vivienda") {
                interes = data.valor * 1 / 100;
                return parseInt(interes * data.cuotas);
            }
            if (data.tipo_prestamo === "educacion") {
                interes = data.valor * 0.5 / 100;
                return parseInt(interes * data.cuotas);

                
            }
            if (data.tipo_prestamo === "libre_inversion") {
                interes = data.valor * 1.5 / 100;
                return  parseInt( interes * data.cuotas);
            }
        }
        console.log(Tvivienda());

        //===============================================//

        function Tdeuda() {
            
            let intereses = Tvivienda();
            let valor = parseInt(data.valor);
            return intereses + valor;
        }

        console.log(Tdeuda());
        //===============================================//

        function valorCuota() {
            let deuda = Tdeuda();
            return  parseInt(deuda / data.cuotas);
        }
        console.log(valorCuota());function Tvivienda() {
            let interes;
            if (data.tipo_prestamo === "vivienda") {
                interes = data.valor * 1 / 100;
                return parseInt(interes * data.cuotas);
            }
            if (data.tipo_prestamo === "educacion") {
                interes = data.valor * 0.5 / 100;
                return parseInt(interes * data.cuotas);
            }
            if (data.tipo_prestamo === "libre_inversion") {
                interes = data.valor * 1.5 / 100;
                return  parseInt( interes * data.cuotas);
            }
        }
        console.log(Tvivienda());

        //===============================================//

        function Tdeuda() {
            
            let intereses = Tvivienda();
            let valor = parseInt(data.valor);
            return intereses + valor;
        }

        console.log(Tdeuda());
        //===============================================//

        function valorCuota() {
            let deuda = Tdeuda();
            return  parseInt(deuda / data.cuotas);
        }
        console.log(valorCuota());

        //===============================================//

        setInputs({
            ...inputs,
            data
        })
        alert("Datos correctos ...");
        // limpiar campos
        e.target.reset();
    }

       /*
    // FORMA 2
  const consultarAPI = async () => {
  const api = await fetch('http://breaking-bad-quotes.herokuapp.com/v1/quotes');
  const fraseAPI = await api.json();
  guardarFrase(fraseAPI[0]);
  }

  //  Cargar una frase
  useEffect(() => {
    consultarAPI()
  }, []);


  const [articulos, setArticulos] = useState([])

  useEffect(() => {
    fetch('http://scratchya.com.ar/react/datos.php')
      .then((response) => {
        return response.json()
      })
      .then((articulos) => {
        setArticulos(articulos)
      })
  }, [])

  useEffect (() => {
    const consultarAPI = async () => {

      if(consultar) {
        const appId = 'f6d94761f8d49aec1ce88183aea49fe8';
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);

        // Detecta si hubo resultados correctos en la consulta

        if(resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    }
    consultarAPI();
    // eslint-disable-next-line 
  }, [consultar]);
    */

    return (
        <div className="container">
            <h1>Simulador de crédito</h1>
            <form onSubmit={handleSubmit(valForm)}>
                
                <label>Correo Electrónico</label>
                <input
                    {...register('email', 
                            {
                                required:true,
                                maxLength:100,
                                minLength:10,
                                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
                    name="email"
                    className="form-control my-2"
                    placeholder="Ingrese Email"
                    // onChange={valForm}
                ></input>
                <span className="text-danger text-small d-block mb-2">
                    {errors.email?.type === 'required' && "Email es obligatorio"}
                    {errors.email?.type === 'maxLength' && "Debe ser inferior o igual a 100 chars"}
                    {errors.email?.type === 'minLength' && "Debe ser superior a 10 chars"}
                    {errors.email?.type === 'pattern' && "Email Inválido"}
                </span>

                {/* =================================== */}

                <label>Valor del Prestamo</label>
                <input
                    {...register('valor', 
                            {
                                required:true,
                                maxLength:9,
                                minLength:7,
                                
                                pattern: /^[0-9]+$/
                    })}
                    type="number"
                    name="valor"
                    className="form-control my-2"
                    placeholder="Ingrese Valor del Préstamo"
                    // onChange={valForm}
                ></input>
                <span className="text-danger text-small d-block mb-2">
                    {errors.valor?.type === 'required' && "Valor es obligatorio"}
                    {errors.valor?.type === 'maxLength' && "Debe ser inferior o igual a 100.000.000"}
                    {errors.valor?.type === 'minLength' && "Debe ser superior a 1.000.000"}
                    {errors.valor?.type === 'pattern' && "Solo números positivos"}
                </span>

                {/* =================================== */}
                
                <label>Tipo Préstamo</label>
                <select
                    {...register('tipo_prestamo', 
                        {
                            required:true,
                    })}
                    name="tipo_prestamo"
                    className="form-control my-2"
                    // onChange={valForm}
                >
                    <option value="">Seleccione Tipo Préstamo</option>
                    <option value="vivienda">Vivienda</option>
                    <option value="educacion">Educación</option>
                    <option value="libre_inversion">Libre Inversión</option>
                </select>
                
                <span className="text-danger text-small d-block mb-2">
                    {errors.tipo_prestamo?.type === 'required' && "Tipo de préstamo es obligatorio"}
                </span>

                {/* =================================== */}

                <label>Número de cuotas</label>
                <select
                    {...register('cuotas', 
                        {
                            required:true,
                    })}
                    name="cuotas"
                    id="cuotas"
                    className="form-control my-2"
                    // onChange={valForm}
                >
                    <option value="">Seleccione la cantidad de cuotas</option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                    <option value="48">48</option>
                    <option value="60">60</option>
                    <option value="72">72</option>
                </select>
                
                <span className="text-danger text-small d-block mb-2">
                    {errors.tipo_prestamo?.type === 'required' && "Número de cuotas es obligatorio"}
                </span>

                {/* =================================== */}
                
                <button 
                    type="submit" 
                    className="btn btn-primary my-2"
                    >
                        
                Agregar
                </button>
            </form>
            {/* <ul className="mt-2">
                {
                    inputs.map((item, index) =>
                        <li key={index}>
                            {item.name} - {item.lastname}
                        </li>
                    )
                }
            </ul> */}
            
        </div>
        
    );
}