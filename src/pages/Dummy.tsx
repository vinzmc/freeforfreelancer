import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import firebase from '../firebase';
import { useEffect, useState } from 'react';
import './Home.css';

import { brush, camera, codeWorking, megaphone, shirt, videocam } from "ionicons/icons";

const Dummy: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('dummy')
      .onSnapshot((snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setData(newData);
      })
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot='start'>
                <IonBackButton defaultHref='/LoginPage'/>
            </IonButtons>
          <IonTitle>Hello, </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {console.log(data)}
        <p>asdasd</p>
      </IonContent>
    </IonPage>
  );
};

export default Dummy;
