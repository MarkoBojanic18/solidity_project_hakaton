
import React, { useEffect, useState } from "react";

function ServicePanelAppointments() {

    const [datum, setDatum] = useState('');
    const [rola, setRola] = useState('');
    const [lekar, setLekar] = useState('');
    const [termin, setTermin] = useState('9:00');
    const [status, setStatus] = useState('');
    const [dostupniLekari, setDostupniLekari] = useState([]);
  
    const handleZakaziTermin = () => {

        if (!datum || !rola || !lekar) {
            setStatus("Niste izabrali sve potrebne informacije.");
            return;
          }
        const danas = new Date();
        const izabraniDatum = new Date(datum);
        
        if (izabraniDatum < danas) {
          setStatus("Nije moguće zakazati termin za prošli datum.");
          return;
        }
    
        setStatus(`Zakazan termin za ${datum} kod ${lekar} u ${termin}.`);
       
      };
  
    const handleRolaChange = (e) => {
      const selectedRole = e.target.value;
      setRola(selectedRole);
      // Ovde možete postaviti logiku za dohvatanje dostupnih lekara za izabranu rolu
      // Na primer, API poziv ili predefinisane liste lekara za određenu rolu
      if (selectedRole === 'endokrinolog') {
        setDostupniLekari(['Ana Lazarevic', 'Milica Tomic', 'Igor Knezevic']);
      } else if (selectedRole === 'specijalista') {
        setDostupniLekari(['Andrej Ilic', 'Uros Markovic', 'Lana Simic']);
      } else {
        setDostupniLekari([]);
      }
      setLekar('');
    };
  
    return (
      <div style={{
        width: '70vw',
        height: '80vh',
        backgroundColor: 'whitesmoke',
        border: '1px solid black',
        padding: '10px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <label htmlFor="calendar">Choose date:</label>
        <input type="date" id="calendar" value={datum} onChange={(e) => setDatum(e.target.value)} />
  
        <label htmlFor="role">Choose medicine field</label>
        <select id="role" value={rola} onChange={handleRolaChange}>
        <option value="">Odaberite rolu</option>
          <option value="endokrinolog">Endocrinologist</option>
          <option value="specijalista">General Practitioner</option>
        </select>
  
        {rola && (
          <div>
            <label htmlFor="doctor">Choose doctor:</label>
            <select id="doctor" value={lekar} onChange={(e) => setLekar(e.target.value)}>
              {dostupniLekari.map((doc, index) => (
                <option key={index} value={doc}>{doc}</option>
              ))}
            </select>
          </div>
        )}
  
        <label htmlFor="time">Choose hour:</label>
        <select id="time" value={termin} onChange={(e) => setTermin(e.target.value)}>
          <option value="9:00">9:00-9.30</option>
          <option value="10:00">10:00-10.30</option>
          <option value="11:00">11:00-11.30</option>
          <option value="12:00">12:00-12.30</option>
          <option value="13:00">13:-13.30</option>
          <option value="14:00">14:00-14.30</option>
          <option value="15:00">15:00-15.30</option>
          <option value="16:00">16:00-16.30</option>
        </select>
  
        <button onClick={handleZakaziTermin} style={{marginTop: '10px'}}>Zakaži termin</button>
        <p>{status}</p>
      </div>
    );
  }

export default ServicePanelAppointments
