import { IonContent, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import firebase from '../firebase';
import Freelancer from "../components/Freelancer";
import './SearchPage.css'

const SearchPage: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState<any>([]);
    const [renderedData, setRenderedData] = useState<any>([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection('freelancer')
            .where('name', '!=', 'Sergio Nathaniel') //temporary solution untuk auth
            .onSnapshot((snapshot) => {
                const newData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setData(newData);
                setRenderedData(newData);
                setSearchText('');
            })
    }, [])

    function search(searchText: string) {
        setSearchText(searchText);
        const newData = data.filter((value: any) => {
            return value.name.toLowerCase().includes(searchText.toLowerCase()) ||
                value.job.toLowerCase().includes(searchText.toLowerCase());
        })
        setRenderedData(newData);
    }

    function cardOnClick(id: string) {
        window.location.href = "/Freelancer/".concat(id);
    }

    return (
        <IonPage>
            <IonContent>
                <IonToolbar className="ion-margin-top">
                    <IonTitle className="titleMiddle">Search</IonTitle>
                </IonToolbar>
                <IonSearchbar placeholder="Designer, Programmer..." onIonChange={e => search(e.detail.value!)} value={searchText} showCancelButton="focus"></IonSearchbar>

                <IonList className="ion-padding">
                    <IonLabel className="label">{renderedData.length} Freelancers Found</IonLabel>
                    {renderedData.map((doc: any) =>
                        <div key={doc.id} onClick={() => cardOnClick(doc.id)}>
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