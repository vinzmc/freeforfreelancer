import { IonBackButton, IonButton, IonButtons, IonCard, IonContent, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import firebase from '../firebase';
import Freelancer from "../components/Freelancer";
import './SearchPage.css'

const SearchPage: React.FC = () => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection('freelancer')
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
            <IonToolbar className="ion-margin-top">
                <IonTitle className="titleMiddle">Search</IonTitle>      
            </IonToolbar>
            <IonContent>
                <IonSearchbar style={{marginBottom: '2rem'}} placeholder="Designer"></IonSearchbar>
                <IonLabel className="label">6 Freelancers Found</IonLabel>
                <IonList>
                    {data.map((doc: any) =>
                        <div key={doc.id} >
                            <Freelancer key={doc.id} name={doc.name} job={doc.job} star={doc.star} review={doc.review} price={doc.price + 'M'} pic={doc.pic} />
                        </div>
                        )
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default SearchPage;