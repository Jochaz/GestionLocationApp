import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Select, InputLabel, MenuItem } from "@mui/material";
import Header from '../../components/Header';
import { Formik } from 'formik';
import * as yup from "yup";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fr';
import { DatePicker } from '@mui/x-date-pickers';
import { useRef } from 'react';
import ErreurForm from "./errorForm";
import { useNavigate } from 'react-router-dom';


const AddBien = (props) => {
  let user = null; 
  if (typeof props.user == "object") {
    user = props.user.user;
  } else {
    user = JSON.parse(props.user).user;
  }

  const [activeStep, setActiveStep] = useState(0);
  const formRef = useRef(null);
  const [erreurForm, setErreurForm] = useState();
  const [dateacquisition, setDateAcquisition] = useState();
  const navigate = useNavigate();


  const handleFormSubmit = (values) => {
    values.dateacquisition = dateacquisition; 
    values.userid = user._id;
    console.log(JSON.stringify(values));

    fetch('http://localhost:4001/addbien', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'APIGestionLocation123'
    },   
    body: JSON.stringify(values)
    })
    .then((response) => {
      response.json().then((data) => {
        navigate("/bien", {user})
       // setConfirm(data.message);
      })
    })

  };

  const initialValues = {
    address1: '',
    address2: '',
    address3: '',
    ville: '',
    cp: '',
    etage: '',
    residence: '',
    type: 1,
    surfacetotale: '',
    surfacehabitable: '',
    nbchambre: '',
    nbsdb: '' ,
    nbpiece: '',
    classeenergie: 'Non noté',
    ges: 'Non noté',
    prixachat: '',
    loyermensuel: ''
  };
  const handleNext = () => {
    const values = formRef.current.values;
    
    let erreurMessageEtape1 = "";
    let erreurMessageEtape2 = "";
    let erreurMessageEtape3 = "";

    if (activeStep === 0){    
      if (values.address1 === ""){
        erreurMessageEtape1 = erreurMessageEtape1 + "Le champs ligne d'adresse n°1 est requis. \n "
      }
      if (values.cp === ""){
        erreurMessageEtape1 = erreurMessageEtape1 + "Le champs code postale est requis.\n "
      }
      if (values.ville === ""){
        erreurMessageEtape1 = erreurMessageEtape1 + "Le champs ville est requis. \n"
      }
    }

    if (activeStep === 1){      
      if (values.surfacetotale === ""){
        erreurMessageEtape2 = erreurMessageEtape2 + "Le champs surface totale est requis. \n"
      }

      if (values.surfacehabitable === ""){
        erreurMessageEtape2 = erreurMessageEtape2 + "Le champs surface habitable est requis. \n"
      }

      if (values.nbchambre === ""){
        erreurMessageEtape2 = erreurMessageEtape2 + "Le champs nombre de chambres est requis. \n"
      }

      if (values.nbsdb === ""){
        erreurMessageEtape2 = erreurMessageEtape2 + "Le champs nombre de salle de bains est requis. \n"
      }

      if (values.nbpiece === ""){
        erreurMessageEtape2 = erreurMessageEtape2 + "Le champs nombre de pièces est requis. \n"
      }
    }

    if (activeStep === 2){      
      if (values.prixachat === ""){
        erreurMessageEtape3 = erreurMessageEtape3 + "Le champs prix d'achat du bien est requis. \n"
      }
    }

    if (erreurMessageEtape1 === "" && erreurMessageEtape2 === "" && erreurMessageEtape3 === ""){
      setErreurForm("")
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setErreurForm(erreurMessageEtape1 + erreurMessageEtape2 + erreurMessageEtape3);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box m="20px">
      <Header title="VOS BIENS" subtitle="Ajout d'un nouveau bien immobilier" />
      <Typography variant="h5" style={{marginBottom: '10px'}}>
        {activeStep === 0 ? 'Etape 1 : Renseigner une adresse' : 
         activeStep === 1 ? 'Etape 2 : Caractéristiques du bien' : 
         activeStep === 1 ? 'Etape 3 : Les chiffres du bien' :
         'Etape 3 : Récapitulatif de votre nouveau bien'}
      </Typography>
      <Formik
        innerRef={formRef}
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >{({
        values,
        errors,
        touched,
        handleBlur,        
        handleChange,
        handleSubmit
      }) => (
        <form onSubmit={handleSubmit}>
          {activeStep === 0 && (
            <Box>
              <TextField
                label="Ligne adresse n°1"
                name="address1"
                required
                value={values.address1}
                onChange={handleChange}
                fullWidth
                onBlur={handleBlur}
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                style={{marginBottom: '8px'}}
              />
              <TextField
                label="Ligne adresse n°2"
                name="address2"
                value={values.address2}
                onChange={handleChange}
                fullWidth
                style={{marginBottom: '8px'}}
              />
              <TextField
                label="Ligne adresse n°3"
                name="address3"
                value={values.address3}
                onChange={handleChange}
                fullWidth
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                style={{marginBottom: '8px'}}
              />
              <TextField
                label="Code postale"
                required
                name="cp"
                value={values.cp}
                onChange={handleChange}
                fullWidth
                style={{marginBottom: '8px'}}
              />
              <TextField
                label="Ville"
                required
                name="ville"
                value={values.ville}
                onChange={handleChange}
                fullWidth
                style={{marginBottom: '8px'}}
              />
              <TextField
                label="Etage"
                name="etage"
                value={values.etage}
                onChange={handleChange}
                fullWidth
                style={{marginBottom: '8px'}}
              />
              <TextField
                label="Résidence"
                name="residence"
                value={values.residence}
                onChange={handleChange}
                fullWidth
                style={{marginBottom: '8px'}}
              />
            </Box>
          )}
          {activeStep === 1 && (
            <Box>
              <InputLabel id="label">Type de bien</InputLabel>
              <Select
                labelId="type"
                name="type"
                onChange={handleChange}
                value={values.type}
                fullWidth
                style={{marginBottom: '8px'}}
              >
                <MenuItem value={1}>Maison</MenuItem>
                <MenuItem value={2}>Appartement</MenuItem>
                <MenuItem value={3}>Garage</MenuItem>
                <MenuItem value={4}>Terrain</MenuItem>
              </Select>
              <TextField
                label="Surface totale en m²"
                name="surfacetotale"
                required
                value={values.surfacetotale}
                onChange={handleChange}
                fullWidth
                style={{marginBottom: '8px'}}
              />
              <TextField
                label="Surface habitable en m²"
                required
                name="surfacehabitable"
                value={values.surfacehabitable}
                onChange={handleChange}
                fullWidth
                style={{marginBottom: '8px'}}
              />
              <TextField
                label="Nombre de chambres"
                name="nbchambre"
                required
                value={values.nbchambre}
                onChange={handleChange}
                fullWidth
                style={{marginBottom: '8px'}}
              />
              <TextField
                label="Nombre de salle de bains"
                name="nbsdb"
                required
                value={values.nbsdb}
                onChange={handleChange}
                fullWidth
                style={{marginBottom: '8px'}}
              />
              <TextField
                label="Nombre de pièces"
                name="nbpiece"
                required
                value={values.nbpiece}
                onChange={handleChange}
                fullWidth
                style={{marginBottom: '8px'}}
              />
              <InputLabel id="labelclasseenergie">Classe énergie</InputLabel>
              <Select
                labelId="classeenergie"
                name="classeenergie"
                onChange={handleChange}
                value={values.classeenergie}
                fullWidth
                style={{marginBottom: '8px'}}
              >
                <MenuItem value={"A"}>A</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
                <MenuItem value={"C"}>C</MenuItem>
                <MenuItem value={"D"}>D</MenuItem>
                <MenuItem value={"E"}>E</MenuItem>
                <MenuItem value={"F"}>F</MenuItem>
                <MenuItem value={"G"}>G</MenuItem>
                <MenuItem value={"Non noté"}>Non noté</MenuItem>
              </Select>
              <InputLabel id="labelclasseenergie">GES</InputLabel>
              <Select
                labelId="ges"
                name="ges"
                onChange={handleChange}
                value={values.ges}
                fullWidth
                style={{marginBottom: '8px'}}
              >
                <MenuItem value={"A"}>A</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
                <MenuItem value={"C"}>C</MenuItem>
                <MenuItem value={"D"}>D</MenuItem>
                <MenuItem value={"E"}>E</MenuItem>
                <MenuItem value={"F"}>F</MenuItem>
                <MenuItem value={"G"}>G</MenuItem>
                <MenuItem value={"Non noté"}>Non noté</MenuItem>
              </Select>
            </Box>
          )}
          {activeStep === 2 && (
            <Box>
              <TextField
                label="Prix d'achat du bien"
                name="prixachat"
                value={values.prixachat}
                required
                onChange={handleChange}
                fullWidth
                style={{marginBottom: '8px'}}
              />
              <InputLabel id="labelDateAcquisition">Date acquisition du bien</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'} >
                <DatePicker
                  name="dateacquisition"
                  required
                  value={dateacquisition}
                  onChange={(value) => {
                    setDateAcquisition(value);
                  }}
                  className="datePickerFormulaire"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                label="Loyer mensuel"
                name="loyermensuel"
                value={values.loyermensuel}
                onChange={handleChange}
                fullWidth
                style={{marginBottom: '8px', marginTop: '8px'}}
              />
            </Box>
          )}
          {activeStep === 3 && (
           <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Adresse du nouveau bien
              </Typography>
              <Typography variant="h5" component="div">
                {values.address1}{values.address2 !== '' ? ', ' + values.address2 : ''}{values.address3 !== '' ? ', ' + values.address3 : ''}
                <br />
                {values.cp + ', ' + values.ville} 
                <br />
                {'Etage : ' + values.etage}
                <br />
                {'Résidence : ' + values.residence}
                <br />
              </Typography>
              <Typography sx={{ fontSize: 14, marginTop: 1 }} color="text.secondary" gutterBottom>
                Caractéristiques du nouveau bien
              </Typography>
              <Typography variant="body2">
                Surface habitable : {values.surfacehabitable} m²
                <br />
                Surface totale : {values.surfacetotale} m²
                <br />
                Nombre de chambres : {values.nbchambre}
                <br />
                Nombre de salles de bain : {values.nbsdb}
                <br />
                Nombre de pièces : {values.nbpiece}
                <br />
                Classe energie : {values.classeenergie}
                <br />
                GES : {values.ges}
              </Typography>
              <Typography sx={{ fontSize: 14, marginTop: 1 }} color="text.secondary" gutterBottom>
                Les chiffres du bien
              </Typography>
              <Typography variant="body2">
                Prix d'achat : {values.prixachat}€
                <br />
                Date d'achat du bien : {dateacquisition != null ? 
                                          new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(dateacquisition.toDate()) : 
                                          new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date())
                                       }             
                <br />
                Loyer mensuel (€) : {values.loyermensuel}
              </Typography>
            </CardContent>
          </Card>
          )}
          <ErreurForm props={{erreurForm}}/>
          <Box sx={{marginTop:2, }} display="flex" justifyContent="flex-end">
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Précédent
            </Button>
            {activeStep === 3 && (
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Envoyer
              </Button>
            )}
            {activeStep !== 3 &&(
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Suivant
              </Button>
            )}
            
          </Box>
          
        </form>
        )}
      </Formik>
    </Box>
  );
};
const checkoutSchema = yup.object().shape({
    address1: yup.string().required("Ligne d'adresse n°1 requise"),
  });


export default AddBien;
