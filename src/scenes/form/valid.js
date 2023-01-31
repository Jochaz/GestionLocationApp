import { Box } from '@mui/system';
import React from 'react';

function ValidForm({props}) {
    //State

    //Comportements

    //Affichage
    return(
        <div className='validForm'>
            <Box sx={{paddingTop: "10px"}}>{props.confirm}</Box>
        </div>
    )
}

export default ValidForm;