import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import firebase from '../firebase';
import { useEffect, useState } from 'react';

//theme
import { star, starOutline } from 'ionicons/icons';


const ReviewPage: React.FC = () => {
    return (
        <IonPage>
            <IonToolbar className="ion-margin-top">
                <IonTitle className="titleMiddle" style={{ fontWeight: "500", fontSize: "16px" }}>Review</IonTitle>
            </IonToolbar>
            <IonContent fullscreen>
            </IonContent>    
        </IonPage>
    );
};

export default ReviewPage;
