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
          <h1>Bienvenido al APP</h1>
       </section> )
          
          
          } 
    </div>
  );
}

export default App;
