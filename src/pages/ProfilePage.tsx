import { IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonSegment, IonSegmentButton, IonText } from '@ionic/react';
import firebase from '../firebase';
import { useEffect, useState } from 'react';

//theme
import './ProfilePage.css';
import { star, starOutline, location } from 'ionicons/icons';

const ReviewSegment: React.FC = () => {
    return (
        // di loop
        <div className="ion-padding">
            <div>
                {/* bintang */}
                <div className="bintang-review">
                    {[...Array(4)].map((x, i) =>
                        <IonIcon icon={star} key={i} />
                    )}
                    {[...Array(1)].map((x, i) =>
                        <IonIcon icon={starOutline} key={5 - i} />
                    )}
                    <IonText className="profile-rating"> 4.0</IonText>
                </div>

                {/* Review */}
                <h3 className="ion-no-margin review-konteks">Review (Konteks)</h3>

                {/* Reviewer */}
                <h4 className="ion-no-margin review-name">Reviwer (nama)</h4>
                {/* Review Desc */}
                <p className="justify review-content" >Lorem ipsum kolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>
    )
}

const OrderSegment: React.FC = () => {
    return (
        // di loop
        <div className="ion-padding">
            <div className="order-freelancer">

                <div className="freelancer-pic">
                    <IonAvatar className="freelancer-avatar"><img src="https://i.ibb.co/5xjmLTz/pexels-italo-melo-2379005.jpg" alt="" /></IonAvatar>
                </div>

                <div className="order-detail" style={{ margin: "4px 18px" }}>

                    <div className="order-flex">
                        <h2 className="order-number">Order #1AF578</h2>
                        <h2 className="order-progress">In-Progress</h2>
                    </div>
                    <h2 className="order-freelancer-name">Maurice Marvin</h2>
                    <h2 className="order-date">18 October 2021 - 10.00 WIB</h2>

                </div>

            </div>
        </div>
    )
}

const ProjectSegment: React.FC = () => {
    return (
        // di loop
        <div className="ion-padding">
            <div>
                {/* gambar project */}
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <img src="https://i.ibb.co/p1NgGbp/Screenshot-2021-10-22-171209.png" style={{ borderRadius: "5px" }} />
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {/* Project Name */}
                <h3 className="ion-no-margin project-context">Review (Konteks)</h3>

                {/* Tanggal */}
                <h4 className="ion-no-margin project-date">21 Agustus 2021</h4>

                {/* bintang */}
                <div style={{ marginTop: "10px" }}>
                    {[...Array(4)].map((x, i) =>
                        <IonIcon icon={star} key={i} />
                    )}
                    {[...Array(1)].map((x, i) =>
                        <IonIcon icon={starOutline} key={5 - i} />
                    )}
                    <IonText style={{ fontSize: "13px" }}> 4.0</IonText>
                </div>
            </div>
        </div>
    )
}

const AboutSegment: React.FC = () => {
    return (
        <div className="ion-padding">
            {/* Bio */}
            <div className="about-section bordered">
                <h2>Bio</h2>
                <p className="justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            {/* Portofolio */}
            <div className="ion-margin-top about-section bordered">
                <h2>Portofolio</h2>
                {/* loop */}
                <p>Link1</p>
            </div>
            {/* Lokasi */}
            <div className="ion-margin-top about-section bordered">
                <h2>Lokasi</h2>
                <p><IonIcon icon={location} style={{ marginRight: "1rem" }} />Jakarta, Indonesia</p>
            </div>
        </div>
    )
}

const Profile: React.FC = () => {
    const [data, setData] = useState<any>([]);
    const [page, setPage] = useState("review");

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

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="profile-header-background">
                    {/* <img></img> */}
                </div>
                {/* Profile Header Content */}
                <div className="profile-header-content">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="2.2" className=" ion-padding">
                                <IonAvatar className="profile-avatar">
                                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                                </IonAvatar>
                            </IonCol>
                            <IonCol style={{ marginLeft: "1.8rem" }}>
                                <div>
                                    <h1 className="ion-no-margin profile-name">Nama</h1>
                                    <p className="ion-no-margin profile-desc">Deskripsi user</p>
                                    <div className="profile-reputasi">
                                        {[...Array(4)].map((x, i) =>
                                            <IonIcon icon={star} key={i} />
                                        )}
                                        {[...Array(1)].map((x, i) =>
                                            <IonIcon icon={starOutline} key={5 - i} />
                                        )}
                                        <IonText className="profile-rating"> 4.0</IonText>
                                        <IonText className="profile-rating"> (12 Review)</IonText>
                                    </div>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>

                {/* Segment Tab */}
                <IonSegment onIonChange={e => setPage(e.detail.value!)} value={page} className='profile-segment'>
                    <IonSegmentButton value="review" >
                        <IonLabel>Review</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="order">
                        <IonLabel>Orders</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="project">
                        <IonLabel>Projects</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="about">
                        <IonLabel>About</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                {/* Segment Page (pakai switch) */}
                {
                    {
                        'review': <ReviewSegment />,
                        'project': <ProjectSegment />,
                        'about': <AboutSegment />,
                        'order': <OrderSegment />

                    }[page]
                }
            </IonContent>
        </IonPage>
    );
};

export default Profile;
