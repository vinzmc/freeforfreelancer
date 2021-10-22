import { IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonSegment, IonSegmentButton, IonText } from '@ionic/react';
import firebase from '../firebase';
import { useEffect, useState } from 'react';

//theme
import './ProfilePage.css';
import { star, starOutline, location } from 'ionicons/icons';
import { useParams } from 'react-router';

const ReviewSegment: React.FC<{ data: any[] }> = (props) => {
    return (
        // di loop
        <div>
            {props.data.map((doc: any) =>
                <div className="ion-padding" key={doc.id}>
                    {/* bintang */}
                    <div className="bintang-review">
                        {[...Array(doc.star)].map((x, i) =>
                            <IonIcon icon={star} key={i} />
                        )}
                        {[...Array(5 - doc.star)].map((x, i) =>
                            <IonIcon icon={starOutline} key={5 - i} />
                        )}
                        <IonText className="profile-rating"> {doc.star}.0</IonText>
                    </div>

                    {/* Review */}
                    <h3 className="ion-no-margin review-konteks">{doc.review}</h3>

                    {/* Reviewer */}
                    <h4 className="ion-no-margin review-name">{doc.nama}</h4>
                    {/* Review Desc */}
                    <p className="justify review-content" >{doc.reviewContent}</p>
                </div>
            )}
        </div>
    )
}

const OrderSegment: React.FC<{ data: any[] }> = (props) => {
    return (
        // di loop
        <div>
            {props.data.map((doc: any) =>
                <div className="ion-padding" key={doc.id}>
                    <div className="order-freelancer">

                        <div className="freelancer-pic">
                            <IonAvatar className="freelancer-avatar"><img src={doc.profile} alt={doc.nama} /></IonAvatar>
                        </div>

                        <div className="order-detail" style={{ margin: "4px 18px" }}>

                            <div className="order-flex">
                                <h2 className="order-number">#{doc.id}</h2>
                                <h2 className="order-progress">{doc.status}</h2>
                            </div>
                            <h2 className="order-freelancer-name">{doc.nama}</h2>
                            <h2 className="order-date">{doc.tanggalOrder.toDate().toLocaleDateString()}</h2>
                        </div>

                    </div>
                </div>
            )}
        </div>

    )
}

const ProjectSegment: React.FC<{ data: any[] }> = (props) => {
    return (
        // di loop
        <div>
            {props.data.map((doc: any) =>
                <div className="ion-padding" key={doc.id}>
                    <div>
                        {/* gambar project */}
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <img src={doc.project} style={{ borderRadius: "5px" }} />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        {/* Project Name */}
                        <h3 className="ion-no-margin project-context">{doc.review}</h3>

                        {/* Tanggal */}
                        <h4 className="ion-no-margin project-date">{doc.tanggalReview.toDate().toLocaleDateString()}</h4>

                        {/* bintang */}

                        <div style={{ marginTop: "10px" }}>
                            {[...Array(doc.star)].map((x, i) =>
                                <IonIcon icon={star} key={i} />
                            )}
                            {[...Array(5 - doc.star)].map((x, i) =>
                                <IonIcon icon={starOutline} key={5 - i} />
                            )}
                            <IonText style={{ fontSize: "13px" }}> 4.0</IonText>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const AboutSegment: React.FC<{ bio: any, portofolio: any, location: any }> = (props) => {
    return (
        <div className="ion-padding">
            {/* Bio */}
            <div className="about-section bordered">
                <h2>Bio</h2>
                <p className="justify">{props.bio}</p>
            </div>
            {/* Portofolio */}
            <div className="ion-margin-top about-section bordered">
                <h2>Portofolio</h2>
                {/* loop */}
                <p>{props.portofolio}</p>
            </div>
            {/* Lokasi */}
            <div className="ion-margin-top about-section bordered">
                <h2>location</h2>
                <p><IonIcon icon={location} style={{ marginRight: "1rem" }} />{props.location}</p>
            </div>
        </div>
    )
}

const Profile: React.FC = () => {
    const [data, setData] = useState<any>([]);
    const [dataReviewer, setDataReviewer] = useState<any>([]);
    const [page, setPage] = useState("review");
    const uriData = useParams<any>();

    useEffect(() => {
        firebase
            .firestore()
            .collection('freelancer')
            .doc(uriData.id)
            .onSnapshot((snapshot) => {
                const newData = {
                    id: snapshot.id,
                    ...snapshot.data()
                }

                setData(newData);
            })
    }, [])

    useEffect(() => {
        firebase
            .firestore()
            .collection('freelancer')
            .doc(uriData.id)
            .collection('order')
            .onSnapshot((snapshot) => {
                const newReviewerData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setDataReviewer(newReviewerData);
            });
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
                                    <img src={data.pic} />
                                </IonAvatar>
                            </IonCol>
                            <IonCol style={{ marginLeft: "1.8rem" }}>
                                <div>
                                    <h1 className="ion-no-margin profile-name">{data.name}</h1>
                                    <p className="ion-no-margin profile-desc">{data.job}</p>
                                    <div className="profile-reputasi">
                                        {data.length !== 0 &&
                                            [...Array(data.star)].map((x, i) =>
                                                <IonIcon icon={star} key={i} />
                                            )
                                        }
                                        {data.length !== 0 &&
                                            [...Array(5 - data.star)].map((x, i) =>
                                                <IonIcon icon={starOutline} key={5 - i} />
                                            )
                                        }
                                        <IonText className="profile-rating"> {data.star}.0</IonText>
                                        <IonText className="profile-rating"> ({data.review} Review)</IonText>
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
                        'review': <ReviewSegment data={dataReviewer} />,
                        'order': <OrderSegment data={dataReviewer} />,
                        'project': <ProjectSegment data={dataReviewer} />,
                        'about': <AboutSegment bio={data.bio} location={data.location} portofolio={data.portofolio} />


                    }[page]
                }
            </IonContent>
        </IonPage>
    );
};

export default Profile;
