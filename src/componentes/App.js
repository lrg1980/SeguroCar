import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Resumen from './Resumen';
import Resultado from './Resultado';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper';

class App extends Component {
  state = {
      resultado: '',
      datos: {}
    }

  cotizarSeguro = (datosAuto) => {


    //console.log(datosAuto)
    const {marca, plan, year} = datosAuto;

    // agregar una base de 2000.
    let resultado = 2000;

    // Obtener la diferencia de años 
    const diferenciaAnual = obtenerDiferenciaAnio(year);

    console.log('La diferencia es' + diferenciaAnual);

    //Por cada año restar el 3% --> Valor por año
    resultado -= ((diferenciaAnual * 3) * resultado ) / 100;

    //console.log(resultado);

    // Americano 15% Argentino 10% Asiatico 5% y Europeo 30% de incremento al valor actual Valor por origen de Marca

    resultado = calcularMarca(marca) * resultado;

    // el plan del auto. el basico incrementa el valor el 20% y el completo 50%
    let incrementoPlan = obtenerPlan(plan)

    // dependiendo del plan se incrementa
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

    // crear objeto para el resumen
    const datosInfoAuto = {
      marca : marca,
      plan : plan,
      year : year
    }

    // ya tenemos el costo.
    this.setState({
        resultado : resultado,
        datos : datosInfoAuto
      })

  }

  render() {
    return (
      <div className=" contenedor">
        
        <Header titulo = 'Cotizador de Seguro de auto' />

        <div className="contenedor-formulario">
          
          <Formulario 
            cotizarSeguro={this.cotizarSeguro}/>

          <Resumen 
            datos = {this.state.datos}
            resultado = {this.state.resultado}/>

          <Resultado 
            resultado={this.state.resultado} />
        </div>
      </div>
    );
  }
}

export default App;
