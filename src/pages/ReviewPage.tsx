import { IonBackButton, IonButton, IonButtons, IonContent, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import firebase from '../firebase';
import { FaStar } from 'react-icons/fa'
import { useHistory, useParams } from 'react-router';

//theme
import './ReviewPage.css'


const ReviewPage: React.FC = () => {
    const uriData = useParams<any>();
    const history = useHistory();

    const [data, setData] = useState<any>([]);
    const [dataFreelancer, setDataFreelancer] = useState<any>([]);
    const [userName, setUserName] = useState<string>('');

    const [feedback, setFeedback] = useState<any>('');
    const [rating, setRating] = useState<number>(5);

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
                            setUserName(doc.data()!.name);
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
        const fetchData = () => {
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
        }
        fetchData();
    }, []);

    //profile freelancer
    useEffect(() => {
        const fetchData2 = (id: string) => {
            const db = firebase.firestore();
            db.collection('users')
                .doc(id)
                .onSnapshot((snapshot) => {
                    const newData = {
                        id: snapshot.id,
                        ...snapshot.data()
                    }

                    setDataFreelancer(newData);
                })
        }

        if (data.freelancer !== null) {
            fetchData2(data.freelancer);
        }
    }, [data]);

    // submit review
    const handleSubmitReview = async () => {
        console.log(rating);
        const url = '/Tabs/Homepage/';

        // insert data
        const db = firebase.firestore();
        await db.collection("reviews")
            .add({
                orderId: data.id,
                client: data.client,
                clientName: userName,
                freelancer: data.freelancer,
                rating: rating,
                feedback: feedback,
                created: firebase.firestore.Timestamp.fromDate(new Date())
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            })

        const db2 = firebase.firestore();
        let star = dataFreelancer.star;
        let totalReview = dataFreelancer.totalReview;
        star = star * totalReview;
        star += rating;
        totalReview++;
        star /= totalReview;
        if(star%1 > 0.5){
            star = Math.ceil(star);
        }else{
            star = Math.floor(star);
        }

        await db2.collection('users')
            .doc(dataFreelancer.id)
            .set({
                star: star,
                totalReview: totalReview
            }, { merge: true })
            .then(() => {
                console.log('success')
            }).catch(() => {
                console.log("error")
            })

        const db3 = firebase.firestore();
        await db3.collection('orders')
            .doc(uriData.id)
            .set({
                status: 'Reviewed'
            }, { merge: true })
            .then(() => {
                console.log('success')
            }).catch(() => {
                console.log("error")
            }).finally(() => {
                history.push(url);
                window.location.href = url;
            })
    }

    return (
        <IonPage>
            <IonToolbar className="ion-margin-top">
                <IonTitle className="titleMiddle" style={{ fontWeight: "500", fontSize: "16px" }}>Review</IonTitle>
                <IonButtons slot="start">
                    <IonBackButton defaultHref={`/OrderDetail/Freelancer/${uriData.id}`} />
                </IonButtons>
            </IonToolbar>
            <IonContent fullscreen>

                <div className="summary-box ion-margin">
                    <div className="ion-text-center">
                        <div>
                            <p>What is your review?</p>
                        </div>
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;

                            return (
                                <label key={i}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                    />
                                    <FaStar className="star" color={ratingValue <= rating ? "ffc107" : "7f7f7f"} size={20} />
                                </label>
                            );
                        })}
                    </div>
                    <div className="ion-margin-top">
                        <div>
                            <IonTextarea placeholder="Write your experience with this freelancer....." className="form-input" rows={6} style={{ color: "gray" }} value={feedback} onIonChange={e => setFeedback(e.detail.value)}></IonTextarea>
                        </div>
                        <IonButton className="summary-button ion-margin-top" onClick={() => handleSubmitReview()}>Review</IonButton>
                    </div>
                </div>

            </IonContent>
        </IonPage>
    );
};

export default ReviewPage;
