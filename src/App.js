import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
const App = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [resultadosFavoritos, setResultadosFavoritos] = useState([]);
  const [isnotlog, setisnotlog] = useState(true);
  const [reg, setreg] = useState(false);
  const [Email, setEmail] = useState('');
  const [Pass, setPass] = useState('');
  const [EmailR, setEmailR] = useState('');
  const [PassR, setPassR] = useState('');
  const [Aloja, setAloja] = useState(true);
  const [Fav, setFav] = useState(false);
  const [Res, setRes] = useState(false);
  const [FavT, setFavT] = useState('');
  console.log(axios.isCancel('something'));
  
  const Logoff =() => {
    setisnotlog(true);
    setEmail("");
    setPass("");
  }

  useEffect(() => {
    // Hacer la solicitud al servidor para obtener datos de alojamiento
    axios.get('http://localhost:3001/getAirbnb')
      .then(response => {
        setAlojamientos(response.data.documentos);
        console.log(response.data.documentos);
      })
      .catch(error => console.error('Error al obtener alojamientos:', error));
  }, []);
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };
  const handleInputChange1 = (e) => {
    setPass(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setEmailR(e.target.value);
  };
  const handleInputChange3 = (e) => {
    setPassR(e.target.value);
  };
  const handleInputChange4 = (e) => {
    setFavT(e.target.value);
  };
  const Log = async () => {
    
    setreg(false);
    try {
      const response = await axios.post(
        'http://localhost:3001/signInWithEmailAndPassword',
        `email=${encodeURIComponent(Email)}&password=${encodeURIComponent(Pass)}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      const data = response.data;
      console.log(data);
  
      if (data.msg === 'Sesion iniciada') {
        setisnotlog(false);
      } else {
        alert('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
  
      // Imprime el objeto de error en la consola
      console.error(error);
  
      // Revisa el tipo de error y muestra un mensaje más específico
      if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        alert(`Error del servidor: ${error.response.status}`);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió una respuesta
        alert('No se recibió respuesta del servidor.');
      } else {
        // Otros errores
        alert('Error desconocido al iniciar sesión.');
      }
    }
  };
    
  const Regs = () => {
    setreg(true);
    setEmail("");
    setPass("");
  };
  const RegsFinal = async () => {
    setEmailR("");
    setPassR("");
    try {
      const response = await axios.post(
        'http://localhost:3001/createUserWithEmailAndPassword',
        `email=${encodeURIComponent(EmailR)}&password=${encodeURIComponent(PassR)}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      const data = response.data;
      console.log(data);
  
      if (data.msg === 'Usuario creado exitosamente') {
        alert('Registro exitoso');
      } else {
        alert('Error al registrar usuario.');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      console.error(error);
      if (error.response) {
        alert(`Error del servidor: ${error.response.status}`);
      } else if (error.request) {
        alert('No se recibió respuesta del servidor.');
      } else {
        alert('Error desconocido al registrar usuario.');
      }
    }
  };

  const Alojamiento = () => {
    setAloja(true);
    setFav(false);
    setFavT("");
    setRes(false);
  };
  const buscarAlojamientosFavoritos = () => {
    const resultados = alojamientos.filter(
      (alojamiento) => alojamiento.tipo.toLowerCase() === FavT.toLowerCase()
    );
    setResultadosFavoritos(resultados);
  };
  const Favoritos = () => {
    setAloja(false);
    setFavT("");
    setFav(true);
    setRes(false)
  };
  const handleItemClick = (alojamiento) => {
    console.log('Alojamiento clickeado:', alojamiento);
  }
  const Reservados = () => {
    setRes(true);
    setFavT("");
    setFav(false);
    setAloja(false);
  };
  
  const Reservados2 = async (calle, numero) => {
    try {
      // Hacer la reserva
      const response = await axios.put(
        'http://localhost:3001/updateAirbnb',
        {
          calle: calle,
          numero: numero,
          currentOwner: Email,
        }
      );
  
      const data = response.data;
      console.log(data);
  
      if (data.msg === 'Se actualizó la información correctamente') {
        alert('Reserva realizada con éxito.');
        // actualizar la lista de alojamientos aquí si es necesario
      } else {
        alert('Error al realizar la reserva.');
      }
    } catch (error) {
      console.error('Error al hacer la reserva:', error);
      alert('Error al realizar la reserva.');
    }
  };

  return (
    <div className="App">
       {
          isnotlog ? (
            <section className= 'Login'>
             <h1>Login</h1>
             <br></br>
             <section className='container'>
              <h2>Ingresa tu Email:<input type="text" className='form-input'placeholder='Email' value={Email} onChange={handleInputChange} /></h2>
              <br></br>
              <h2>Ingresa tu Contraseña:<input type="text" className='form-input' placeholder='' value={Pass} onChange={handleInputChange1} /></h2> 
             </section>
             <p><button className="btn-submit" onClick={Log}>Log In</button><br></br><button className="btn-submit" onClick={Regs}>No tienes cuenta registrate</button></p>
             <br></br>
             <br></br>
             {
                reg && <section className= 'Registro'>
                  <h1>Registro</h1>
                  <br></br>
                  <br></br>
                  <section className='container'>
                    <h2>Ingresa tu Email:<input type="text" className='form-input' placeholder='Email' value={EmailR} onChange={handleInputChange2} /></h2>
                    <br></br>
                    <h2>Ingresa tu Contraseña:<input type="text" className='form-input' placeholder='' value={PassR} onChange={handleInputChange3} /></h2>
                  </section>
                  <p><button className="btn-submit" onClick={RegsFinal}>registrate</button></p>
                </section>
             }
          </section> 
          ): (<section className='APP'>
          <h1><img src="./images/trivago.jpg" alt='' className='imga'></img><button className="btn-logout" onClick={Logoff}>Log out</button></h1>
          <section className='main_page'>

             <h2>{Email}</h2>
             <p><button className="btn-submit" onClick={Alojamiento}>Alojamiento</button>
             <button className="btn-submit" onClick={Favoritos}>Favoritos</button>
             <button className="btn-submit" onClick={Reservados}>Alojamientos reservados</button></p>
             {
              Aloja &&
              <div className='Alojamiento'>

                <h3>Alojamientos Disponibles</h3>
                {alojamientos.map((alojamiento) => (
                  <div key={alojamiento.id} className='alojamiento-item'>
                    <p><img src= {alojamiento.imagen} alt='' className='imga'></img></p>
                    <p>Ubicación: {alojamiento.ciudad}</p>
                    <p>Tipo: {alojamiento.tipo}</p>
                    <p>Calle: {alojamiento.calle}</p>
                    <p>Numero de calle: {alojamiento.numero}</p>
                    <p>Actual Dueño: {alojamiento.currentOwner}</p>
                    <p>Reservado: {alojamiento.reservado ? 'Sí' : 'No'}</p>
                    
                  </div>
                ))}
              </div>    
             }
             {
              Fav && (
                <section className='Favoritos'>
                  <p>
                    Ingrese el tipo de alojamiento:{' '}
                    <input
                      type='text'
                      className='form-input'
                      placeholder='Ingrese de su tipo'
                      value={FavT}
                      onChange={(e) => setFavT(e.target.value)}
                    />
                    <button className='Search' onClick={buscarAlojamientosFavoritos}>
                      Favoritos
                    </button>
                  </p>
                  {resultadosFavoritos.map((alojamiento) => (
                    <div key={alojamiento.id} className='alojamiento-item'>
                      <p><img src= {alojamiento.imagen} alt=''  className='imga'></img></p>
                      <p>Ubicación: {alojamiento.ciudad}</p>
                      <p>Tipo: {alojamiento.tipo}</p>
                      <p>Calle: {alojamiento.calle}</p>
                      <p>Numero de calle: {alojamiento.numero}</p>
                      <p>Actual Dueño: {alojamiento.currentOwner}</p>
                      <p>Reservado: {alojamiento.reservado ? 'Sí' : 'No'}</p>
                      <p><button className="btn-submit" onClick={() => Reservados2(alojamiento.calle, alojamiento.numero)}>Hacer reserva</button></p>
                    </div>
                  ))}
                </section>
              )
  
            }
            {
              Res && (
                <section className='Resarvados'>
                  <h3>Alojamientos Reservados</h3>
                  {alojamientos
                    .filter((alojamiento) => alojamiento.currentOwner !== '')
                    .map((alojamiento) => (
                      <div key={alojamiento.id} className='alojamiento-item'>
                        <p><img src={alojamiento.imagen} alt='' className='imga'></img></p>
                        <p>Ubicación: {alojamiento.ciudad}</p>
                        <p>Tipo: {alojamiento.tipo}</p>
                        <p>Calle: {alojamiento.calle}</p>
                        <p>Numero de calle: {alojamiento.numero}</p>
                        <p>Actual Dueño: {alojamiento.currentOwner}</p>
                        <p>Reservado: {alojamiento.reservado ? 'Sí' : 'No'}</p>
                      </div>
                    ))}
                </section>
              )
            }
          </section>

       </section> )
          
          
          } 
    </div>
  );
}

export default App;
