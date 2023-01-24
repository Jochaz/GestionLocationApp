import React from 'react';
import Header2 from '../Header2';

function ExplicationApplication() {
    return (    
        <div className='explicationApp'>
            <div className='logoApp'>
                <img src="LogoGestionImmo.png" alt="logo" width="75px" height="75px" />
                <span><Header2 title="GestionLoc" subtitle="L'application de gestion de location de vos biens immobilier."/></span>
            </div>
            <p>
                GestionLoc est un outil numérique qui aide les propriétaires et les gestionnaires immobiliers à gérer efficacement leurs propriétés locatives. 
                Les fonctionnalités courantes incluent la gestion des locataires, la gestion des paiements, la gestion des réparations et des demandes, la communication entre les propriétaires et les locataires, et la génération de rapports financiers. 
                Les utilisateurs peuvent accéder à l'application à partir de leur smartphone ou de leur ordinateur. <br /><br/>
                les propriétaires et les gestionnaires immobiliers peuvent améliorer l'efficacité de la gestion de leurs propriétés locatives, réduire les erreurs et les omissions, et améliorer la communication avec les locataires.
            </p>
        </div>
    )
}
export default ExplicationApplication;