import { IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonLabel, IonList, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonText, IonVirtualScroll } from '@ionic/react';
import firebase from '../firebase';
import { useEffect, useState } from 'react';
import { star, starOutline, location } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';

//assets
import profilePlaceHolder from '../assets/profilePlaceHolder.png'

//theme
import './ProfilePage.css';

const OrderSegment: React.FC<{ data: any[] }> = (props) => {
    const history = useHistory();

    const viewOrderDetail = (id:string) =>{
        var url = '/OrderDetail/Freelancer/'.concat(id);
        history.push(url);
        window.location.href = url;
    }

    return (
        // di loop
        <div>
            {props.data.map((doc: any, i) =>
                <div className="ion-padding" key={doc.id}>
                    <div className="order-freelancer">

                        <div className="order-detail" style={{ margin: "4px 18px" }}>
                            <div className="order-flex">
                                <a className="order-number" style={{ fontWeight: 'bold' , fontSize:'large'}} onClick={()=>{viewOrderDetail(doc.id)}}>#{doc.id}</a>
                            </div>
                            <h2 className="order-freelancer-name">{doc.freelancerName}</h2>
                            <h2 className="order-date">{doc.created.toDate().toLocaleDateString()}</h2>
                            Status
                            <h2 className="order-progress">{doc.status}</h2>
                            {doc.status !== 'Reviewed' &&
                                <IonButton>
                                    Give a Review
                                </IonButton>
                            }
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

const AboutSegment: React.FC<{ bio: any, portofolio: any, location: any, docRef: any, userDataName: any, userDataPhoto: any, userDataType: any, userDataJob: any, userDataCategory: any }> = (props) => {
    const [postData, setPostData] = useState<any>('');
    const [postData2, setPostData2] = useState<any>('');
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [profileData1, setProfileData1] = useState<any>();
    const [profileData2, setProfileData2] = useState<any>();
    const [profileData3, setProfileData3] = useState<any>();
    const [profileData4, setProfileData4] = useState<any>();
    const [profileData5, setProfileData5] = useState<any>();
    const [profileData6, setProfileData6] = useState<any>();

    const [category, setCat] = useState<string>();

    const signout = () => {
        firebase.auth().signOut().then(() => {
            window.location.replace('LoginPage.tsx');
        }).catch((error) => {
            console.log('Cannot Sign Out');
        });
    }

    // Update user jadi freelancer
    const updateType = () => {
        console.log(props.docRef)
        console.log(postData)
        console.log(props.userDataName)

        const db = firebase.firestore();
        db.collection('users').doc(props.docRef).set({
            fee: 0.1,
            star: 0,
            category: category,
            type: "freelancer",
            job: postData,
            price: postData2
        }, { merge: true }).then(() => {
            console.log('success')
        }).catch(() => {
            console.log("error")
        }).finally(() => {
            setShowModal(false);
            window.location.reload();
        })
    }

    // default value untuk profile data (props kedalam useState)
    useEffect(() => {
        setProfileData1(props.userDataName);
        setProfileData2(props.bio);
        setProfileData3(props.portofolio);
        setProfileData4(props.location);
        setProfileData5(props.userDataJob);
        setProfileData6(props.userDataCategory);
    }, [props]);

    // update profile user
    const updateProfile = () => {
        const db = firebase.firestore();
        db.collection('users').doc(props.docRef).set({
            name: profileData1 === null ? props.userDataName : profileData1,
            bio: profileData2 === null ? '' : profileData2,
            portofolio: profileData3 === null ? '' : profileData3,
            location: profileData4 === null ? '' : profileData4,
            job: profileData5 === null ? props.userDataJob : profileData5,
            category: profileData6 === null ? props.userDataCategory : profileData6
        }, { merge: true }).then(() => {
            console.log('success')

        }).catch(() => {
            console.log("error")
        }).finally(() => {
            setShowModal(false);
            window.location.reload();
        })
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
            {/* Settings  */}
            <div className="ion-margin-top about-section bordered">
                <h2>Setting</h2>
                {/* modal untuk daftar freelancer */}
                <IonModal isOpen={showModal} cssClass='modal-class' backdropDismiss={false}>
                    <div className="form-inputs">
                        <div className="ion-padding">
                            <p className="form-name">Job<span style={{ color: 'red' }}>*</span></p>
                            <IonInput placeholder="Job name" className="form-input" style={{ color: "gray" }} value={postData} onIonChange={(e: any) => setPostData(e.target.value)}></IonInput>

                            <p className="form-name">Price (Jt)<span style={{ color: 'red' }}>*</span></p>
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
                {props.userDataType !== 'freelancer' &&
                    <IonButton className="summary-button ion-margin-bottom" onClick={() => setShowModal(true)}>Start Freelance</IonButton>
                }
                {/* modal untuk edit aboutme */}
                <IonModal isOpen={editModal} cssClass='modal-class' backdropDismiss={false}>
                    <div className="form-inputs" style={{ overflow: 'scroll' }}>
                        <IonList className="ion-padding">
                            <p className="form-name">Nama<span style={{ color: 'red' }}>*</span></p>
                            <IonInput placeholder="Full Name" className="form-input" style={{ color: "gray" }} value={profileData1} onIonChange={(e: any) => setProfileData1(e.target.value)}></IonInput>

                            <p className="form-name">Biodata<span style={{ color: 'red' }}>*</span></p>
                            <IonInput placeholder="Biodata kamu" className="form-input" style={{ color: "gray" }} value={profileData2} onIonChange={(e: any) => setProfileData2(e.target.value)}></IonInput>

                            <p className="form-name">Portofolio<span style={{ color: 'red' }}>*</span></p>
                            <IonInput placeholder="Link website pribadi atau portofolio" className="form-input" style={{ color: "gray" }} value={profileData3} onIonChange={(e: any) => setProfileData3(e.target.value)}></IonInput>

                            <p className="form-name">Location<span style={{ color: 'red' }}>*</span></p>
                            <IonInput placeholder="Kota, Negara" className="form-input" style={{ color: "gray" }} value={profileData4} onIonChange={(e: any) => setProfileData4(e.target.value)}></IonInput>

                            <p className="form-name">Jobs Desc<span style={{ color: 'red' }}>*</span></p>
                            <IonInput placeholder="Jobs" className="form-input" style={{ color: "gray" }} value={profileData5} onIonChange={(e: any) => setProfileData5(e.target.value)}></IonInput>

                            <p className="form-name">Jobs Category<span style={{ color: 'red' }}>*</span></p>
                            <IonSelect value={profileData6} placeholder="Select category" onIonChange={e => setProfileData6(e.detail.value)}>
                                <IonSelectOption value="Design">Design</IonSelectOption>
                                <IonSelectOption value="Programming">Programming</IonSelectOption>
                                <IonSelectOption value="Marketing">Marketing</IonSelectOption>
                                <IonSelectOption value="Videography">Videography</IonSelectOption>
                                <IonSelectOption value="Photography">Photography</IonSelectOption>
                                <IonSelectOption value="T-shirt Design">T-shirt Design</IonSelectOption>
                            </IonSelect>
                        </IonList>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem", marginBottom: "1rem" }}>
                            <IonButton className="modal-btn" onClick={() => updateProfile()} style={{ marginRight: "1rem" }} disabled={(profileData1 === props.userDataName && profileData2 === props.bio && profileData3 === props.portofolio && profileData4 === props.location && profileData5 === props.userDataJob && profileData6 === props.userDataCategory) ? true : false}>Save</IonButton>
                            <IonButton onClick={() => setEditModal(false)} className="modal-btn">Cancel</IonButton>
                        </div>
                    </div>
                </IonModal>
                <IonButton className="summary-button ion-margin-bottom" onClick={() => setEditModal(true)}>Edit Profile</IonButton>
            </div>
            {/* Lokasi */}
            <div className="ion-margin-top about-section bordered">
                <h2>Sign Out</h2>
                <IonButton className="summary-button ion-margin-bottom" onClick={signout}>Sign Out</IonButton>
            </div>
        </div>
    )
}

const Profile: React.FC = () => {
    const history = useHistory();

    const [userData, setUserData] = useState<any>([]);
    const [dataOrder, setDataOrder] = useState<any>([]);
    const [page, setPage] = useState("about");
    const [userDocRef, setUserDocRef] = useState("");

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

    // orders data
    useEffect(() => {
        if (userDocRef !== undefined) {
            const db = firebase.firestore();
            db.collection('orders')
                .where('client', '==', userDocRef)
                .get()
                .then(querySnapshot => {
                    var newData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    // console.log('data', newData);
                    setDataOrder(newData);
                });
        }
    }, [userDocRef]);

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
                                    <img src={userData.photo = null ? profilePlaceHolder : userData.photo} onClick={() => { window.open('https://myaccount.google.com/profile/photo/edit?pli=1') }} />
                                </IonAvatar>
                            </IonCol>

                            <IonCol style={{ marginLeft: "1.8rem" }}>
                                <div>
                                    <h1 className="ion-no-margin profile-name">{userData.name}</h1>
                                    {/* Jobs dan rating */}
                                    {userData.type !== 'user' &&
                                        <div>
                                            <p className="ion-no-margin profile-desc">{userData.job}</p>
                                            <div className="profile-reputasi">
                                                {userData.length !== 0 && userData.star !== undefined &&
                                                    [...Array(userData.star)].map((_, i) =>
                                                        <IonIcon icon={star} key={i} />
                                                    )
                                                }
                                                {userData.length !== 0 && userData.star !== undefined &&
                                                    [...Array(5 - userData.star)].map((_, i) =>
                                                        <IonIcon icon={starOutline} key={5 - i} />
                                                    )
                                                }
                                                <IonText className="profile-rating"> {userData.star}.0</IonText>
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
                    <IonSegmentButton value="order">
                        <IonLabel>Orders</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="about">
                        <IonLabel>About</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                {/* Segment Page (pakai switch) */}
                {
                    {
                        'order': <OrderSegment data={dataOrder} />,
                        'about': <AboutSegment bio={userData.bio} location={userData.location} portofolio={userData.portofolio} docRef={userDocRef} userDataName={userData.name} userDataPhoto={userData.photo} userDataType={userData.type} userDataJob={userData.job} userDataCategory={userData.category} />
                    }[page]
                }
            </IonContent>


        </IonPage>
    );
};

export default Profile;