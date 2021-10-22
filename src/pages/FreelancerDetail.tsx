import { IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonText, IonTextarea } from '@ionic/react';
import firebase from '../firebase';
import { useEffect, useState } from 'react';

//theme
import './ProfilePage.css';
import { star, starOutline, location } from 'ionicons/icons';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

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

const FreelancerDetail: React.FC = () => {
    const [data, setData] = useState<any>([]);
    const [dataReviewer, setDataReviewer] = useState<any>([]);
    const [page, setPage] = useState("review");
    const uriData = useParams<any>();
    const [showModal, setShowModal] = useState(false);

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
                <IonModal isOpen={showModal} cssClass='modal-class' backdropDismiss={false}>
                    <div className="form-inputs">
                        <div className="ion-padding">
                            <p className="form-name">Subject</p>
                            <IonInput placeholder="Project subject" className="form-input" style={{ color: "gray" }}></IonInput>

                            <p className="form-name">Description</p>
                            <IonTextarea placeholder="Project description" className="form-input" rows={6} style={{ color: "gray" }}></IonTextarea>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                            <IonButton onClick={() => setShowModal(false)} className="modal-btn" style={{ marginRight: "1rem" }}>Proceed</IonButton>
                            <IonButton onClick={() => setShowModal(false)} className="modal-btn">Cancel</IonButton>
                        </div>
                    </div>

                </IonModal>
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
                            <IonCol style={{ marginLeft: "1.5rem" }}>
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            <h1 className="ion-no-margin profile-name">{data.name}</h1>
                                            <p className="ion-no-margin profile-desc">{data.job}</p>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
                                            <p className="ion-no-margin profile-desc">Rp. {data.price}M</p>
                                            <IonButton slot="end" size="small" onClick={() => setShowModal(true)} className="hire-btn">Hire</IonButton>
                                        </div>

                                    </div>


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
                        'project': <ProjectSegment data={dataReviewer} />,
                        'about': <AboutSegment bio={data.bio} location={data.location} portofolio={data.portofolio} />


                    }[page]
                }
            </IonContent>
        </IonPage>
    );
};

export default FreelancerDetail;
