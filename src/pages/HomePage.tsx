import { IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import firebase from '../firebase';
import { useEffect, useState } from 'react';
import './Home.css';

import { brush, camera, codeWorking, megaphone, shirt, videocam } from "ionicons/icons";

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hello, </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLabel>Select Categories</IonLabel>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonIcon icon={brush} />
              <IonLabel>Design</IonLabel>
            </IonCol>
            <IonCol>
              <IonIcon icon={codeWorking} />
              <IonLabel>Programming</IonLabel>
            </IonCol>
            <IonCol>
              <IonIcon icon={megaphone} />
              <IonLabel>Marketing</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonIcon icon={videocam} />
              <IonLabel>Video Editing</IonLabel>
            </IonCol>
            <IonCol>
              <IonIcon icon={camera} />
              <IonLabel>Photography</IonLabel>
            </IonCol>
            <IonCol>
              <IonIcon icon={shirt} />
              <IonLabel>T-Shirt Design</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
