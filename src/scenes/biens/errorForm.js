import { Box } from '@mui/system';
import React from 'react';

function ErreurForm({props}) {
    //State

    //Comportements

    //Affichage
    return(
        <div className='erreurForm'>
            <Box sx={{paddingTop: "10px"}}>
                <p>{props.erreurForm}</p>
            </Box>
        </div>
    )
}

export default ErreurForm;