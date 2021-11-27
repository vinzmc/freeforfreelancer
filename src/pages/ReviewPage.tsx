import { IonButton, IonContent, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';

//theme
import { FaStar } from 'react-icons/fa'
import './ReviewPage.css'


const ReviewPage: React.FC = () => {
    const [ rating, setRating ] = useState<number>(0);

    return (
        <IonPage>
            <IonToolbar className="ion-margin-top">
                <IonTitle className="titleMiddle" style={{ fontWeight: "500", fontSize: "16px" }}>Review</IonTitle>
            </IonToolbar>
            <IonContent fullscreen>
                <div className="ion-text-center">
                    {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;

                        return(
                            <label>
                                <input 
                                    type="radio" 
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                    />
                                <FaStar className="star" color={ratingValue <= rating ? "ffff00" : "7f7f7f"} size={50} />
                            </label>
                        );

                    })}
                </div>
                <IonButton onClick={() => console.log(rating)}></IonButton>
            </IonContent>    
        </IonPage>
    );
};

export default ReviewPage;
