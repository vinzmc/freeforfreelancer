import { IonPage, IonContent, IonInput, IonButton } from "@ionic/react"
import { Link } from "react-router-dom";


const LoginPage: React.FC = () => {
    return(
        <IonPage>
            <IonContent>
                <h2 className="title">Sign In</h2>

                <div className="form-inputs">
                    <div className="ion-padding">

                        <p className="form-name">Email address</p>
                        <IonInput placeholder="Email address..." className="form-input" type="email"></IonInput>

                        <p className="form-name">Password</p>
                        <IonInput placeholder="Password..." className="form-input" type="password"></IonInput>

                        <p className="formbtn-link">Don't have an account? <Link to="/RegisterPage  " className="formbtn-link-orange">Sign Up</Link></p>
                    </div>
                </div>

                <IonButton routerLink="/tabs" className="ion-padding ion-float-right form-button">Sign In</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default LoginPage;