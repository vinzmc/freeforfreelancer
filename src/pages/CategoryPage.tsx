import { IonContent, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import firebase from '../firebase';
import Freelancer from "../components/Freelancer";
import './SearchPage.css'
import { dice } from "ionicons/icons";
import { useLocation, useParams } from "react-router";

const CategoryPage: React.FC = (props) => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState<any>([]);
    const [renderedData, setRenderedData] = useState<any>([]);
    const uriData = useParams<any>();
    const emp = useLocation();
    console.log(emp);

    useEffect(() => {
        firebase
            .firestore()
            .collection('freelancer')
            .where('kategori', '==', '')
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

    return (
        <IonPage>
            <IonContent>
                <IonToolbar className="ion-margin-top" style={{ marginBottom: '1rem' }}>
                    <IonTitle className="titleMiddle">Search</IonTitle>
                </IonToolbar>
                <IonLabel className="label">{renderedData.length} Freelancers Found</IonLabel>
                <IonList>
                    {renderedData.map((doc: any) =>
                        <div key={doc.id}>
                            <Freelancer key={doc.id} name={doc.name} job={doc.job} star={doc.star} review={doc.review} price={doc.price + 'M'} pic={doc.pic} />
                        </div>
                    )
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default CategoryPage;