import { IonBackButton, IonButtons, IonContent, IonLabel, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const SearchPage: React.FC = () => {
    return (
        <IonPage>
            <IonToolbar className="ion-margin-top">
                <IonTitle className="titleMiddle">Search</IonTitle>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/HomePage"/>
                </IonButtons>
            </IonToolbar>
            <IonContent>
                <IonSearchbar placeholder="Designer"></IonSearchbar>
            </IonContent>
        </IonPage>
    );
}

export default SearchPage;