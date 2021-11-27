import { IonButton, IonContent, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';

//theme
import { FaStar } from 'react-icons/fa'
import './ReviewPage.css'


const ReviewPage: React.FC = () => {
    const [rating, setRating] = useState<number>(0);

    return (
        <IonPage>
            <IonToolbar className="ion-margin-top">
                <IonTitle className="titleMiddle" style={{ fontWeight: "500", fontSize: "16px" }}>Review</IonTitle>
            </IonToolbar>
            <IonContent fullscreen>

                <div className="summary-box ion-margin">
                    <div className="ion-text-center">
                        <div>
                            <p>Whats your review?</p>
                        </div>
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;

                            return (
                                <label>
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
                            <IonTextarea placeholder="Write your experience with this freelancer....." className="form-input" rows={6} style={{ color: "gray" }}></IonTextarea>
                        </div>
                        <IonButton className="summary-button ion-margin-top" onClick={() => console.log(rating)}>Review</IonButton>
                    </div>
                </div>

            </IonContent>
        </IonPage>
    );
};

export default ReviewPage;
