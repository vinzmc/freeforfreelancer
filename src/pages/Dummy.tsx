import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import firebase from '../firebase';
import { useEffect, useState } from 'react';


const Dummy: React.FC = () => {
    const [data, setData] = useState<any>([]);
    /*
    untuk collection -> document
    useEffect(() => {
        firebase
            .firestore()
            .collection('catalog')
            .onSnapshot((snapshot) => {
                const newData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
 
                setData(newData);
            })
    }, [])
    */

    //untuk collection -> document -> collection
    useEffect(() => {
        firebase
            .firestore()
            .collection('freelancer')
            .doc('1')
            .collection('order')
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
                        <IonBackButton defaultHref='/LoginPage' />
                    </IonButtons>
                    <IonTitle>Hello, </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {console.log(data)}
                <IonList>
                    {data.map((doc: any) =>
                        <IonItem key={doc.id}>
                            <IonLabel>
                                <h2>{doc.nama}</h2>
                                <h3>{doc.harga}</h3>
                                <p>{doc.deskripsi}</p>
                            </IonLabel>
                        </IonItem>)
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Dummy;
