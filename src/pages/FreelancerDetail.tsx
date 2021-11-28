import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonLabel, IonList, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import firebase from '../firebase';
import { useEffect, useState } from 'react';

//theme
import './ProfilePage.css';
import { star, starOutline, location } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import { FaStar } from 'react-icons/fa';

const ReviewSegment: React.FC<{ data: any[] }> = (props) => {
    return (
        // di loop
        <div>
            {props.data && props.data.map((doc: any) =>
                <IonList className="ion-padding" key={doc.id}>
                    <div className="about-section bordered">
                        {/* bintang */}
                        <div className="bintang-review">
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;

                                return (
                                    <label key={i}>
                                        <FaStar className="star" color={ratingValue <= doc.rating ? "ffc107" : "7f7f7f"} size={20} />
                                    </label>
                                );
                            })}
                        </div>
                        {/* Reviewer */}
                        <h4 className="ion-no-margin review-name" style={{fontWeight:'bold'}}>{doc.clientName}</h4>
                        {/* Review Desc */}
                        <p className="justify review-content" >{doc.feedback}</p>
                    </div>
                </IonList>

            )}
            {props.data.length == 0 && (
                <div className="container">
                    <div className="center">
                        Freelancer Belum Memiliki Review
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
            {props.data && props.data.map((doc: any) =>
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
            {props.data.length == 0 && (
                <div className="container">
                    <div className="center">
                        Freelancer Belum Memiliki Project
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
                {props.bio && (
                    <p className="justify">{props.bio}</p>
                )}
                {!props.bio && (
                    <p className="justify">Masukan Bio anda disini</p>
                )}
            </div>
            {/* Portofolio */}
            <div className="ion-margin-top about-section bordered">
                <h2>Portofolio</h2>
                {/* loop */}
                {props.portofolio && (
                    <p className="justify">{props.bio}</p>
                )}
                {!props.portofolio && (
                    <p className="justify">Masukan Portofolio anda disini</p>
                )}
            </div>
            {/* Lokasi */}
            <div className="ion-margin-top about-section bordered">
                <h2>location</h2>
                {props.location && (
                    <p><IonIcon icon={location} style={{ marginRight: "1rem" }} />{props.location}</p>
                )}
                {!props.location && (
                    <p className="justify">Masukan Lokasi anda disini</p>
                )}
            </div>
        </div>
    )
}

const FreelancerDetail: React.FC = () => {
    const uriData = useParams<any>();
    const history = useHistory();

    const [data, setData] = useState<any>([]);
    const [dataReviewer, setDataReviewer] = useState<any>([]);

    const [postData, setPostData] = useState<any>('');
    const [postData2, setPostData2] = useState<any>('');

    const [page, setPage] = useState("review");
    const [showModal, setShowModal] = useState(false);

    //handle payment button
    const payment = (id: string) => {
        var url = '/Payment/Freelancer/'.concat(id)
        var arr = [postData, postData2]
        history.push(url, arr);

        window.location.href = url;
        setShowModal(false);
    }

    //profile freelancer
    useEffect(() => {
        const db = firebase.firestore();
        const fetchData = async () => {
            await db.collection('users')
                .doc(uriData.id)
                .onSnapshot(
                    {
                        next: snapshot => {
                            if (snapshot.exists) {
                                const newData = {
                                    id: snapshot.id,
                                    ...snapshot.data()
                                }

                                setData(newData);
                            } else {
                                var url = '/Tabs/Homepage';
                                history.push(url);
                                window.location.href = url;
                            }
                        },
                        error: error => {
                            console.log(error);
                        }
                    }
                )
        }
        fetchData()
    }, []);

    // reviews data
    useEffect(() => {
        const db = firebase.firestore();
        db.collection('reviews')
            .where('freelancer', '==', uriData.id)
            .get()
            .then(querySnapshot => {
                var newData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                // console.log('data', newData);
                setDataReviewer(newData);
            });
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="titleMiddle" style={{ fontWeight: "500", fontSize: "16px" }}>{data.name}</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={`/Tabs/Homepage/`} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonModal isOpen={showModal} cssClass='modal-class' backdropDismiss={false}>
                    <div className="form-inputs">
                        <div className="ion-padding">
                            <p className="form-name">Subject <span style={{ color: 'red' }}>*</span></p>
                            <IonInput placeholder="Project subject" className="form-input" style={{ color: "gray" }} value={postData} onIonChange={(e: any) => setPostData(e.target.value)}></IonInput>

                            <p className="form-name">Description <span style={{ color: 'red' }}>*</span></p>
                            <IonTextarea placeholder="Project description" className="form-input" rows={6} style={{ color: "gray" }} value={postData2} onIonChange={(e: any) => setPostData2(e.target.value)}></IonTextarea>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                            <IonButton onClick={() => payment(uriData.id)} className="modal-btn" style={{ marginRight: "1rem" }} disabled={(postData === '' || postData2 === '') ? true : false}>Proceed</IonButton>
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
                                    <img src={data.photo} />
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
                                        {data.length !== 0 && data.star !== undefined &&
                                            [...Array(data.star)].map((x, i) =>
                                                <IonIcon icon={star} key={i} />
                                            )
                                        }
                                        {data.length !== 0 && data.star !== undefined &&
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
                    {/* <IonSegmentButton value="project">
                        <IonLabel>Projects</IonLabel>
                    </IonSegmentButton> */}
                    <IonSegmentButton value="about">
                        <IonLabel>About</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                {/* Segment Page (pakai switch) */}
                {
                    {
                        'review': <ReviewSegment data={dataReviewer} />,
                        // 'project': <ProjectSegment data={dataReviewer} />,
                        'about': <AboutSegment bio={data.bio} location={data.location} portofolio={data.portofolio} />


                    }[page]
                }
            </IonContent>
        </IonPage>
    );
};

export default FreelancerDetail;
