import React, { useState, useEffect } from "react";
import PatientABI from "../../contracts/Patient.json";
import MedicalPersonFactoryABI from "../../contracts/MedicalPersonFactory.json";

function ServicePanelDoctor({ web3, patient_account, RecordFactoryAddress }) {

    const MedicalPersonFactoryAddress= sessionStorage.getItem("MedicalPersonFactoryAddress");
    const [mainDoctor, setMainDoctor] = useState('');

    const [practitioners, setPractitioners] = useState([]);
    const [selectedPractitionerAdress, setSelectedPractitionerAdress] = useState(null);
    const [showMainDoctorLabel, setShowMainDoctorLabel] = useState(false);
    ///
    const [allMedicalPersons, setAllMedicalPersons] = useState([]);
    const [selectedMedicalPerson, setselectedMedicalPerson] = useState(null);



    const patient = sessionStorage.getItem("patient");
    
    
/// vraca glavnog doktora iz baze i uspisuje u labelu
    const getMainDoctor = async () => {
      try {
        //iz pacijenta dovlacimo adresu njegovog doktora opste prakse
        const patientContract= new web3.eth.Contract(PatientABI.abi, patient);
       
        await patientContract.methods
          .getMainDoctor()
          .call();
        const fetchedMainDoctorAddress = await patientContract.methods
        .getMainDoctor()
        .call();
        console.log(fetchedMainDoctorAddress);
       
        /// izvlacimo objekat doktor na osovu adrese
        const medicalPersonFactory = new web3.eth.Contract(MedicalPersonFactoryABI.abi, MedicalPersonFactoryAddress);
        const fetchedMainDoctor = await medicalPersonFactory.methods.
        getMedicalPersonsAsObject(fetchedMainDoctorAddress).
        call();
        
        console.log(fetchedMainDoctor);
        setMainDoctor(fetchedMainDoctor);
        setShowMainDoctorLabel(true);  //Prikaži labelu nakon što se dobije glavni doktor
      } catch (error) {
        console.error("Error while loading general practitioner:", error);
      }
    };
  
    /// vraca sve medical persons sa dozvolom za pristup rekordima u jednu tabelu 
    const getAllMedicalPersonsWithAccess= async () => {
      
        
          const patientContract= new web3.eth.Contract(PatientABI.abi, patient);
         
    
      };


    //////// vraca sve doktore opste prakse u opadajuci meni
    const getPractitioners = async () => {
      try {
        const medicalPersonFactory = new web3.eth.Contract(MedicalPersonFactoryABI.abi, MedicalPersonFactoryAddress);
        const fetchedPractitioners = await medicalPersonFactory.methods.getAllMedicalPersonsAsArray().call();
        console.log(fetchedPractitioners);
 
    // Filtrirajte doktore koji imaju ulogu  general practicioner
    const GeneralPractitioners = fetchedPractitioners.filter(practitioner => practitioner.roleName == "general practitioner");
    setPractitioners(GeneralPractitioners);
      } catch (error) {
        console.error("Error while loading general practitioners:", error);
      }
    };
  
    //// da se promeni glavni doktor i sacuva u bazi
    const handleChangeMainDoctor  = async () => {
        console.log(selectedPractitionerAdress);
        if(selectedPractitionerAdress == null){
            alert("Choose practicioner");
            return;
        }
    
          try {
            const patientContract= new web3.eth.Contract(PatientABI.abi, patient);
      
            const transactionParameters = {
              to: patient,
              from: patient_account, // must match user's active address
              data: patientContract.methods
                .setMainDoctor(
                 selectedPractitionerAdress
                )
                .encodeABI({ from: patient_account }),
            }; // call to contract method
      
            // txHash is a hex string
            const txHash = await window.ethereum.request({
              method: "eth_sendTransaction",
              params: [transactionParameters],
            });
      
            console.log("Transaction Hash:", txHash);
            
            alert('Promenjen glavni doktor!');
            getMainDoctor();
      
          } catch (error) {
            console.error("Error during changing medical record", error);
          }
        };

        // da se u listu doda jos jedan doktor with access
      
        const AddMedicalPersonWithAccess  = async () => {
            if(selectedMedicalPerson == null){
                alert("Choose medical person who u want to give access to your record");
                return;
            }
        
              try {
                const patientContract= new web3.eth.Contract(PatientABI.abi, patient);
          
                const transactionParameters = {
                  to: patient,
                  from: patient_account, // must match user's active address
                  data: patientContract.methods
                    .addMedicalPersonWithAccess(
                     selectedMedicalPerson
                    )
                    .encodeABI({ from: patient_account }),
                }; // call to contract method
          
                // txHash is a hex string
                const txHash = await window.ethereum.request({
                  method: "eth_sendTransaction",
                  params: [transactionParameters],
                });
          
                console.log("Transaction Hash:", txHash);
                
                alert('Medical person added!');
          
              } catch (error) {
                console.error("Error during changing medical record", error);
              }
            };
  
        //da se promeni vrednost adrese  izabranog lekara iz opadajuce liste
        const handleSelectChange = (event) => {
            setSelectedPractitionerAdress(event.target.value);
          };
          //da se promeni vrednost adrese  medical persona iz opadajuce liste
        const handleSelectChangeMedicalPerson = (event) => {
            setselectedMedicalPerson(event.target.value);
          };
   

          ///get all mecine persons
          
    const getMedicalPersons= async () => {
        try {
          const medicalPersonFactory = new web3.eth.Contract(MedicalPersonFactoryABI.abi, MedicalPersonFactoryAddress);
          const allMedicalPersons = await medicalPersonFactory.methods.getAllMedicalPersonsAsArray().call();
          setAllMedicalPersons(allMedicalPersons);
        
        } catch (error) {
          console.error("Error while loading general practitioners:", error);
        }
      };
    

    useEffect(() => {
      getMainDoctor();
      getPractitioners();
      getMedicalPersons();
    }, []);
  
    return (
      <div>
        {  setShowMainDoctorLabel && <p>Main Doctor: {mainDoctor.last_name}/{mainDoctor.first_name} /{mainDoctor.medicalPersonAddress }/</p> }
        <label>Select General practitioner:</label>
        <select medicalPersonAddress ={selectedPractitionerAdress} onChange={handleSelectChange}>
          {practitioners.map((doctor, index) => (
            <option key={index} value={doctor.medicalPersonAddress}> {doctor.last_name}/{doctor.first_name} /{doctor.medicalPersonAddress }</option>
          ))}
        </select>
        <button onClick={handleChangeMainDoctor}>Save main doctor</button>
        <br></br>
        <br></br>
        <br></br>
        <select medicalPersonAddress ={selectedMedicalPerson} onChange={handleSelectChangeMedicalPerson}>
          {allMedicalPersons.map((medicalPerson, index) => (
            <option key={index} value={medicalPerson.medicalPersonAddress}>{medicalPerson.roleName} {medicalPerson.last_name}/{medicalPerson.first_name} /{medicalPerson.medicalPersonAddress }</option>
          ))}
        </select>
        <button onClick={AddMedicalPersonWithAccess}>Share data with medical person</button>



      </div>
    );
  }
  
  export default ServicePanelDoctor;