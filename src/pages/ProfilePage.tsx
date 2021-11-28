import { IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonLabel, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonText, IonTextarea } from '@ionic/react';
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
                <div className="container">
                    <div className="center">
                        Belum ada Review
                    </div>
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
                <div className="container">
                    <div className="center">
                        <div>Belum Ada Order</div>
                        <div><IonButton routerLink="/Tabs/SearchPage" className="ion-padding form-button">Mulai Order</IonButton></div>
                    </div>
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
                <div className="container">
                    <div className="center">
                        Belum ada Project
                    </div>
                </div>
            }
        </div>
    )
}

const AboutSegment: React.FC<{ bio: any, portofolio: any, location: any, docRef: any, userDataName: any, userDataEmail: any, userDataPhoto: any }> = (props) => {

    const [postData, setPostData] = useState<any>('');
    const [postData2, setPostData2] = useState<any>('');
    const [showModal, setShowModal] = useState(false);

    const [category, setCat] = useState<string>();

    const updateType = () => {
        console.log(props.docRef)
        console.log(postData)
        console.log(props.userDataName)

        const db = firebase.firestore();
        db.collection('users').doc(props.docRef).set({
            email: props.userDataEmail,
            fee: 0.1,
            star: 0,
            category: category,
            name: props.userDataName,
            photo: props.userDataPhoto,
            type: "freelancer",
            job: postData,
            price: postData2
        }).then(() => {
            console.log('success')

        }).catch(() => {
            console.log("error")
        })

        setShowModal(false)

    }
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
                <h2>Location</h2>
                <p><IonIcon icon={location} style={{ marginRight: "1rem" }} />{props.location === undefined ? 'Tambahkan lokasi' : props.location}</p>
            </div>
            <div className="ion-margin-top about-section bordered">
                <h2>Setting</h2>
                <IonModal isOpen={showModal} cssClass='modal-class' backdropDismiss={false}>
                    <div className="form-inputs">
                        <div className="ion-padding">
                            <p className="form-name">Job<span style={{ color: 'red' }}>*</span></p>
                            <IonInput placeholder="Job name" className="form-input" style={{ color: "gray" }} value={postData} onIonChange={(e: any) => setPostData(e.target.value)}></IonInput>

                            <p className="form-name">Price<span style={{ color: 'red' }}>*</span></p>
                            <IonInput placeholder="Your price" className="form-input" style={{ color: "gray" }} value={postData2} onIonChange={(e: any) => setPostData2(e.target.value)} type="number"></IonInput>

                            <p className="form-name">Category<span style={{ color: 'red' }}>*</span></p>
                            <IonSelect value={category} placeholder="Select category" onIonChange={e => setCat(e.detail.value)}>
                                <IonSelectOption value="Design">Design</IonSelectOption>
                                <IonSelectOption value="Programming">Programming</IonSelectOption>
                                <IonSelectOption value="Marketing">Marketing</IonSelectOption>
                                <IonSelectOption value="Videography">Videography</IonSelectOption>
                                <IonSelectOption value="Photography">Photography</IonSelectOption>
                                <IonSelectOption value="T-shirt Design">T-shirt Design</IonSelectOption>
                            </IonSelect>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                            <IonButton className="modal-btn" onClick={() => updateType()} style={{ marginRight: "1rem" }} disabled={(postData === '' || postData2 === '') ? true : false}>Proceed</IonButton>
                            <IonButton onClick={() => setShowModal(false)} className="modal-btn">Cancel</IonButton>
                        </div>
                    </div>

                </IonModal>
                <IonButton className="summary-button ion-margin-bottom" onClick={() => setShowModal(true)}>Start Freelance</IonButton>
            </div>
        </div>
    )
}

const Profile: React.FC = () => {
    const [data, setData] = useState<any>([]);
    const [userData, setUserData] = useState<any>([]);
    const [dataReviewer, setDataReviewer] = useState<any>([]);
    const [page, setPage] = useState("about");
    const [userDocRef, setUserDocRef] = useState("")
    const uriData = useParams<any>();
    const history = useHistory();

    const name = ""

    //user data
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const db = firebase.firestore();
                var docRef = db.collection("users").doc(user.uid);

                setUserDocRef(user.uid)

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
                        'about': <AboutSegment bio={userData.bio} location={userData.location} portofolio={userData.portofolio} docRef={userDocRef} userDataName={userData.name} userDataEmail={userData.email} userDataPhoto={userData.photo} />
                    }[page]
                }
            </IonContent>


        </IonPage>
    );
};

export default Profile;
