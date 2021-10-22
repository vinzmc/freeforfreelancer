import React from 'react';
import {IonHeader, IonContent, IonToolbar, IonTitle} from '@ionic/react';

class HireModal extends React.Component {

  render() {
    return <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>My Modal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>This is the modal content.</p>
      </IonContent>
    </>
  };

}

export default HireModal;