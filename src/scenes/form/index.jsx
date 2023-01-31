import { Box, Button, IconButton, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useRef, useState } from "react";
import ValidForm from "./valid";
import { PhotoCamera } from "@mui/icons-material";

const Form = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  let user = null; 
  if (typeof props.user == "object") {
    user = props.user.user;
  } else {
    user = JSON.parse(props.user).user;
  }
  const [confirm, setConfirm] = useState();
  const [fileInput, setFileInput] = useState(null)

  const handleFileInput = (e) => {
      // handle validations
      setFileInput(e.target.files[0])
  }

  const handleFormSubmit = (values) => {
    user.telephoneport = values.contact;
    user.telephonefixe = values.contactFix;
    user.adresseLigne1 = values.address1;
    user.adresseLigne2 = values.address2;
    user.adresseLigne3 = values.address3;
    user.CP            = values.CP;
    user.ville         = values.ville;

    console.log(values.picture)
    
    fetch('http://localhost:4001/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'APIGestionLocation123'
    },   
    body: JSON.stringify(user)
    })
    .then((response) => {
      response.json().then((data) => {
        
        // if (fileInput){
        //   const test = URL.createObjectURL(fileInput)
        // }
        
        setConfirm(data.message);
      })
    })
  };

  if (!user){
    return
  }
  const initialValues = {
    firstName: user.prenom ,
    lastName: user.nom,
    email: user.email,
    contact: user.telephoneport,
    contactFix: user.telephonefixe,
    address1: user.adresseLigne1,
    address2: user.adresseLigne2,
    address3: user.adresseLigne3,
    CP: user.CP,
    ville: user.ville,
    picture: ''
  
  };
  return (
    <Box m="20px">
      <Header title="MON PROFIL" subtitle="Modifier vos informations" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* <Box m={"5px"}>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <PhotoCamera sx={"margin-right:10px"}/>
                <input accept="image/*png" type="file" onChange={handleFileInput} name="avatar" />
              </IconButton>
            </Box> */}
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                disabled={true}
                type="text"
                label="Prénom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                disabled={true}
                type="text"
                label="Nom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                disabled={true}
                type="text"
                label="Adresse email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Numéro de téléphone portable"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Numéro de téléphone fixe"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactFix}
                name="contactFix"
                error={!!touched.contactFix && !!errors.contactFix}
                helperText={touched.contactFix && errors.contactFix}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ligne adresse n°1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ligne adresse n°2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ligne adresse n°3"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address3}
                name="address3"
                error={!!touched.address3  && !!errors.address3}
                helperText={touched.address3 && errors.address3}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Code postale"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.CP}
                name="CP"
                error={!!touched.CP && !!errors.CP}
                helperText={touched.CP && errors.CP}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ville"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ville}
                name="ville"
                error={!!touched.ville && !!errors.ville}
                helperText={touched.ville && errors.ville}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
            
              <Button type="submit" color="secondary" variant="contained">
                Sauvegarder le profil
              </Button>
            </Box>
            <ValidForm props={{confirm}}/>
          </form>
          
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("Prénom requis"),
  lastName: yup.string().required("Nom requis"),
  email: yup.string().email("Adresse email non valide").required("Adresse email requis"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Numéro de téléphone non valide")
    .required("Numéro de téléphone portable requis"),
  contactFix: yup
    .string()
    .matches(phoneRegExp, "Numéro de téléphone non valide"),
  address1: yup.string().required("Ligne d'adresse n°1 requise"),
});


export default Form;
