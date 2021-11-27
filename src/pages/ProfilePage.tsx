import { IonAvatar, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonText } from '@ionic/react';
import firebase from '../firebase';
import { useEffect, useState } from 'react';
import { star, starOutline, location } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';

//assets
import profilePlaceHolder from '../assets/profilePlaceHolder.png'

//theme
import './ProfilePage.css';

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
            {props.data.length === 0 &&
                <div>
                    Belum ada Review
                </div>
            }
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
            {props.data.length === 0 &&
                <div>
                    Belum ada Order
                </div>
            }
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
            {props.data.length === 0 &&
                <div>
                    Belum ada Project
                </div>
            }
        </div>
    )
}

const AboutSegment: React.FC<{ bio: any, portofolio: any, location: any }> = (props) => {
    return (
        <div className="ion-padding">
            {/* Bio */}
            <div className="about-section bordered">
                <h2>Biodata</h2>
                <p className="justify">{props.bio === undefined ? 'Tambahkan biodata dirimu' : props.bio}</p>
            </div>
            {/* Portofolio */}
            <div className="ion-margin-top about-section bordered">
                <h2>Portofolio</h2>
                {/* loop */}
                <p>{props.portofolio === undefined ? 'Tambahkan protofoliomu' : props.portofolio}</p>
            </div>
            {/* Lokasi */}
            <div className="ion-margin-top about-section bordered">
                <h2>location</h2>
                <p><IonIcon icon={location} style={{ marginRight: "1rem" }} />{props.location === undefined ? 'Tambahkan lokasi' : props.location}</p>
            </div>
        </div>
    )
}

const Profile: React.FC = () => {
    const [data, setData] = useState<any>([]);
    const [userData, setUserData] = useState<any>([]);
    const [dataReviewer, setDataReviewer] = useState<any>([]);
    const [page, setPage] = useState("about");
    const uriData = useParams<any>();
    const history = useHistory();

    //user data
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const db = firebase.firestore();
                var docRef = db.collection("users").doc(user.uid);

                docRef.get()
                    .then((doc) => {
                        if (doc.exists) {
                            // console.log("Document data:", doc.data());
                            setUserData(doc.data());
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("User data missing!");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
            } else {
                // User is signed out
                // redirect to login page
                var url = '/LoginPage';
                history.push(url);
                window.location.href = url;
            }
        });
    }, []);


    useEffect(() => {
        //data freelancer
        if (userData.type !== 'user') {
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
        }
    }, [])


    useEffect(() => {
        //data reviewer
        if (userData.type !== 'user') {
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
        }
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
                                    <img src={userData.photo = null ? profilePlaceHolder : userData.photo} />
                                </IonAvatar>
                            </IonCol>

                            <IonCol style={{ marginLeft: "1.8rem" }}>
                                <div>
                                    <h1 className="ion-no-margin profile-name">{userData.name}</h1>
                                    {userData.type !== 'user' &&
                                        <div>
                                            <p className="ion-no-margin profile-desc">{data.job}</p>
                                            <div className="profile-reputasi">
                                                {data.length !== 0 && data.length !== undefined &&
                                                    [...Array(data.star)].map((_, i) =>
                                                        <IonIcon icon={star} key={i} />
                                                    )
                                                }
                                                {data.length !== 0 && data.length !== undefined &&
                                                    [...Array(5 - data.star)].map((_, i) =>
                                                        <IonIcon icon={starOutline} key={5 - i} />
                                                    )
                                                }
                                                <IonText className="profile-rating"> {data.star}.0</IonText>
                                                <IonText className="profile-rating"> ({data.review} Review)</IonText>
                                            </div>
                                        </div>
                                    }
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
                    {userData.type !== 'user' &&
                        <IonSegmentButton value="project">
                            <IonLabel>Projects</IonLabel>
                        </IonSegmentButton>
                    }
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
                        'about': <AboutSegment bio={userData.bio} location={userData.location} portofolio={userData.portofolio} />
                    }[page]
                }
            </IonContent>


        </IonPage>
    );
};

export default Profile;
