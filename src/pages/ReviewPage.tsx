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
    const [feedback, setFeedback] = useState<any>('');
    const [rating, setRating] = useState<number>(5);

    // orders data
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
                freelancer: data.freelancer,
                rating: rating,
                feedback: feedback,
                created: firebase.firestore.Timestamp.fromDate(new Date())
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            })

        const db2 = firebase.firestore();
        db2.collection('orders')
        .doc(uriData.id)
        .set({
            status:'Reviewed'
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
