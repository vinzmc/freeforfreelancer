import { IonPage, IonContent, IonItem, IonRadioGroup, IonRadio, IonInput, IonButton } from "@ionic/react"
import { Link } from "react-router-dom"


const RegisterPage: React.FC = () => {
    function buttonOnClick() {
        window.location.href = "/LoginPage";
    }
    
    return (
        <IonPage>
            <IonContent>
                <h2 className="title">Sign Up</h2>

                <IonRadioGroup className="radio-group" value="client">
                    <IonItem lines="none" className="radio-item">
                        <p className="radio-label">I'm a client</p>
                        <IonRadio slot="start" value="client" className="radio-button" />
                    </IonItem>
                    <IonItem lines="none" className="radio-item">
                        <p className="radio-label">I'm a freelancer</p>
                        <IonRadio slot="start" value="freelancer" className="radio-button" />
                    </IonItem>
                </IonRadioGroup>

                <div className="form-inputs">
                    <div className="ion-padding">
                        <p className="form-name">Your Name</p>
                        <IonInput placeholder="Name..." className="form-input"></IonInput>

                        <p className="form-name">Email address</p>
                        <IonInput placeholder="Email address..." className="form-input" type="email"></IonInput>

                        <p className="form-name">Password</p>
                        <IonInput placeholder="Pasword..." className="form-input" type="password"></IonInput>
                        <p className="formbtn-link">Already have an account <Link to="/LoginPage" className="formbtn-link-orange">Sign In</Link></p>
                    </div>
                </div>
                <IonButton className="ion-padding ion-float-right form-button" onClick={() => buttonOnClick()}>Create</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default RegisterPage