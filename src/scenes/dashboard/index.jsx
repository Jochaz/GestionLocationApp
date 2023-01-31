import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import FactBox from "../../components/FactBox";
import WalletIcon from '@mui/icons-material/Wallet';


function getNombreLocataire(user) {

  return 0;
}

function getRevenuSurMois(user){

  const revenues = {revenu:"3000", pourcentage: (-12.2).toString() + "%", ratio:(0.12)};

  return revenues;
}

function getRevenueGenereeAnnee(user) {
  return 120000
}

const Dashboard = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let user = null; 
  if (typeof props.user == "object") {
    user = props.user.user;
  } else {
    user = JSON.parse(props.user).user;
  }
 

  if (!user){
    return
  }
  const titreTDB = "TABLEAU DE BORD DE " + user.nom + " " + user.prenom


  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={titreTDB} subtitle="Bienvenue sur votre tableau de bord" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FactBox
            title={user.biens.length}
            subtitle="Biens"
            icon={
              <HomeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={getRevenuSurMois(user).revenu + " €"}
            subtitle="Revenu sur le mois"
            progress={getRevenuSurMois(user).ratio}
            increase={getRevenuSurMois(user).pourcentage}
            icon={
              <WalletIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FactBox
            title={ getNombreLocataire(user)}
            subtitle="Locataires"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue générée sur l'année
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {getRevenueGenereeAnnee(user) + " €"}
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        

        {/* ROW 3 */}

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
