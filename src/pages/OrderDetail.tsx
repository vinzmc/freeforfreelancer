import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { star, starOutline, document, time } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import firebase from '../firebase';

const OrderDetail: React.FC = () => {
    const uriData = useParams<any>();

    const [data, setData] = useState<any>([]);
    const [dataFreelancer, setDataFreelancer] = useState<any>([]);
    const [currTime, setCurrTime] = useState<string>();

    // freelancer data
    useEffect(() => {
        const db = firebase.firestore();
        db.collection('orders')
            .doc(uriData.id)
            .onSnapshot((snapshot) => {
                const newData = {
                    id: snapshot.id,
                    ...snapshot.data()
                }

                setData(newData);
            })
    }, []);

    // freelancer data
    useEffect(() => {
        const db = firebase.firestore();
        db.collection('users')
            .doc(data.freelancer)
            .onSnapshot((snapshot) => {
                const newData = {
                    id: snapshot.id,
                    ...snapshot.data()
                }

                setDataFreelancer(newData);
            })

        //tanggal order
        if (data.created !== undefined) {
            const time = data.created.toDate();
            const month = ['Januari', 'Febuari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'December']
            setCurrTime(time.getDate() + ' ' + month[time.getMonth()] + ' ' + time.getFullYear())
        }
    }, [data]);

    const finishOrder = (id: string) => {
        window.location.href = "/Payment/Freelancer/".concat(id).concat("/review");
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="titleMiddle" style={{ fontWeight: "500", fontSize: "16px" }}>Order Detail</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={`/Tabs/Freelancer/${data.freelancer}`} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {/* Profile Header Content */}
                <div className="profile-header-content">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="2.2" className=" ion-padding">
                                <IonAvatar className="profile-avatar" style={{ top: "5px" }}>
                                    <img src={dataFreelancer.photo} />
                                </IonAvatar>
                            </IonCol>
                            <IonCol style={{ marginLeft: "1.5rem" }}>
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>
                                            <h1 className="ion-no-margin profile-name" style={{ fontSize: "14px" }}>{dataFreelancer.name}</h1>
                                            <p className="ion-no-margin profile-desc" style={{ marginTop: "4px", color: "gray" }}>{dataFreelancer.job}</p>
                                        </div>
                                    </div>


                                    <div className="profile-reputasi">
                                        {dataFreelancer.length !== 0 && dataFreelancer.star !== undefined &&
                                            [...Array(dataFreelancer.star)].map((x, i) =>
                                                <IonIcon icon={star} key={i} />
                                            )
                                        }
                                        {dataFreelancer.length !== 0 && dataFreelancer.star !== undefined &&
                                            [...Array(5 - dataFreelancer.star)].map((x, i) =>
                                                <IonIcon icon={starOutline} key={5 - i} />
                                            )
                                        }
                                        <IonText className="profile-rating"> {dataFreelancer.star}.0</IonText>
                                        <IonText className="profile-rating"> ({dataFreelancer.review} Review)</IonText>
                                    </div>

                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
                <div className="summary-box ion-margin">
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: '5px' }}>
                        <h3 className="summary-detail">Status</h3>
                        <h3 className="summary-price" >{data.status}</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 className="summary-detail">Total</h3>
                        <h3 className="summary-price">Rp. {dataFreelancer.price}M</h3>
                    </div>
                    {/* generate  */}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 className="summary-detail">Order Date</h3>
                        <h3 className="summary-price">{currTime}</h3>
                    </div>
                </div>
                <div className="summary-box ion-margin">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '10px', marginTop: '5px' }}>
                        <h3 style={{ fontWeight: 'bold' }} className="summary-detail">Subject</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '10px' }}>
                        <h3 className="summary-detail">{data.subject}</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '10px' }}>
                        <h3 style={{ fontWeight: 'bold' }} className="summary-detail">Description</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '10px' }}>
                        <h3 className="summary-detail">{data.description}</h3>
                    </div>
                </div>
                <div className="summary-box ion-margin">
                    <h3 className="summary-detail" style={{ marginTop: '5px' , fontWeight:'bold'}}>Delivery Files</h3>
                    <h3 className="summary-detail" style={{ marginTop: '5px' }}>dummy-files.mp4</h3>
                </div>

                <div className="ion-margin ion-padding" style={{ display: "flex", justifyContent: "space-around" }}>
                    <IonButton onClick={() => finishOrder(uriData.id)} className="ion-padding summary-button" >Finish Order</IonButton>
                    <IonButton className="ion-padding summary-button" >Complaint Order</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default OrderDetail;