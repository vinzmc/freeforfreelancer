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
            <IonLabel>
                {/* bintang */}
                <div className="bintang-review">
                    {[...Array(4)].map((x, i) =>
                        <IonIcon icon={star} key={i} />
                    )}
                    {[...Array(1)].map((x, i) =>
                        <IonIcon icon={starOutline} key={5 - i} />
                    )}
                    <IonText> 4.0</IonText>
                </div>

                {/* Review */}
                <h3 >Review (Konteks)</h3>

                {/* Reviewer */}
                <h4>Reviwer (nama)</h4>
                {/* Review Desc */}
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </IonLabel>
        </div>
    )
}

const ProjectSegment: React.FC = () => {
    return (
        // di loop
        <div className="ion-padding">
            <IonLabel>
                {/* gambar project */}
                <IonGrid>
                    <IonRow>
                        <IonCol size="6">
                            <img src="https://wallpaperaccess.com/full/797185.png" />
                        </IonCol>
                        <IonCol size="6">
                            <img src="https://wallpaperaccess.com/full/797185.png" />
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {/* Project Name */}
                <h3 >Review (Konteks)</h3>

                {/* Tanggal */}
                <h4>21 Agustus 2021</h4>

                {/* bintang */}
                <div className="bintang-review">
                    {[...Array(4)].map((x, i) =>
                        <IonIcon icon={star} key={i} />
                    )}
                    {[...Array(1)].map((x, i) =>
                        <IonIcon icon={starOutline} key={5 - i} />
                    )}
                    <IonText> 4.0</IonText>
                </div>
            </IonLabel>
        </div>
    )
}

const AboutSegment: React.FC = () => {
    return (
        <div className="ion-padding">
            {/* Bio */}
            <IonLabel className="ion-padding">
                <h2>Bio</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </IonLabel>
            {/* Portofolio */}
            <IonLabel className="ion-padding">
                <h2>Portofolio</h2>
                {/* loop */}
                <h5>Link1</h5>
            </IonLabel>
            {/* Lokasi */}
            <IonLabel className="ion-padding">
                <h2>Lokasi</h2>
                <IonText>
                    <IonIcon icon={location} />
                    Lokasi
                </IonText>
            </IonLabel>
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
                            <IonCol size="2">
                                <IonAvatar className="profile-avatar">
                                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                                </IonAvatar>
                            </IonCol>
                            <IonCol className="ion-padding">
                                <IonLabel>
                                    <h1 className="ion-no-padding">Nama</h1>
                                    <p className="ion-no-padding">Deskripsi user</p>
                                    <div className="profile-reputasi">
                                        {[...Array(4)].map((x, i) =>
                                            <IonIcon icon={star} key={i} />
                                        )}
                                        {[...Array(1)].map((x, i) =>
                                            <IonIcon icon={starOutline} key={5 - i} />
                                        )}
                                        <IonText> 4.0</IonText>
                                        <IonText> (12 Review)</IonText>
                                    </div>
                                </IonLabel>
                            </IonCol>
                            <IonCol size="2" >
                                <IonButton>Hire</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>

                {/* Segment Tab */}
                <IonSegment onIonChange={e => setPage(e.detail.value!)}>
                    <IonSegmentButton value="review">
                        <IonLabel>Review</IonLabel>
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
                        'about': <AboutSegment />

                    }[page]
                }
            </IonContent>
        </IonPage>
    );
};

export default Profile;
