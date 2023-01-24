import { Box } from '@mui/system';
import React from 'react';

function ErreurLogin({props}) {
    //State

    //Comportements

    //Affichage
    return(
        <div className='erreurLogin'>
            <Box sx={{paddingTop: "10px"}}>{props.erreur}</Box>
        </div>
    )
}

export default ErreurLogin;