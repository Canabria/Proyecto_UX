import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

function App() {
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
  const Log = () => {
    setreg(false);
    setisnotlog(false);
    setEmail("");
    setPass("");
  };
  const Regs = () => {
    setreg(true);
    setEmail("");
    setPass("");
  };
  const RegsFinal = () => {
    setreg(false);
    setEmailR("");
    setPassR("");
  };
  const Alojamiento = () => {
    setFav(false);
    setFavT("");
    setRes(false);
  };
  const Favoritos = () => {
    setAloja(false);
    setFavT("");
    setFav(true);
    setRes(false)
  };
  const Reservados = () => {
    setAloja(false);
    setFavT("");
    setFav(false);
    setRes(true)
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
          <h1>Trivago logo<button className="btn-logout" onClick={RegsFinal}>Log out</button></h1>
          <section className='main_page'>
             /* aqui es donde va email de usuario*/
             <h2>Email del usuario</h2>
             <p><button className="btn-submit" onClick={Alojamiento}>Alojamiento</button>
             <button className="btn-submit" onClick={Favoritos}>Favoritos</button>
             <button className="btn-submit" onClick={Reservados}>Alojamientos reservados</button></p>
             {
              Aloja &&
                <segment className= 'Alojamiento'>
                  /* aqui va el map  el contiene un imagen el que se las proporciono la locacion del habitacion , el tipo y se esta resarvado o no*/
                </segment>
              
             }
             {
              Fav &&
              <segment className= 'Favoritos' >
                /* aqui tiene textboxes para que cual el usuario ingresar Alojamiento favorito y se buscar todos los alojamientos disponibles de ese tipo se proyecta por medio un map lo mismo que alojamientos pero ahora se les agrega un boton para hacer las reservas   */
                <p>Ingrese el tipo de alojamiento: <input type="text" className='form-input' placeholder='Ingrese de su tipo' value={FavT} onChange={handleInputChange4} /><button className="Search" >Favoritos</button></p>
              </segment>
             }
             {
              Res && 
              <segment className= 'Resarvados' >
                /*  lo mismo que alojamientos solo que tienes que proyectar un map el cual enseña los que sean reservados por el usuario  */
              </segment>
             }
          </section>

       </section> )
          
          
          } 
    </div>
  );
}

export default App;
