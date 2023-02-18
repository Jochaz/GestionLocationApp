import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from "react-router-dom";

function ChargeBien(user) {

  return [{id: 1, name: "Maison du bonheur", adresse: "5A chemin de la tour bandin", ville: "Buxy", CP: "71390"}];
}


const Bien = (props) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  let user = null; 
  if (typeof props.user == "object") {
    user = props.user.user;
  } else {
    user = JSON.parse(props.user).user;
  }

  const columns = [
    { field: "name", headerName: "Identifiant" },
    {
      field: "adresse",
      headerName: "Ligne adresse",
      flex: 1,
      cellClassName: "adresse-column--cell",
    },
    {
      field: "ville",
      headerName: "Ville",
      flex: 1,
      cellClassName: "adresse-column--cell",
    },
    {
      field: "CP",
      headerName: "Code postale",
      flex: 1,
      cellClassName: "adresse-column--cell",
    },
    {
      field: "dateacquisition",
      headerName: "Date acquisition",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="VOS BIENS" subtitle="Gestion de vos biens immobilier" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .adresse-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.redAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.redAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <IconButton onClick={() => {
           navigate("/addbien", {user})
        }}>
          <AddCircleOutlineIcon className="AddButton" />
        </IconButton>
        
        <DataGrid checkboxSelection rows={ChargeBien(user)} columns={columns} />
        
      </Box>
    </Box>
  );
};

export default Bien;
