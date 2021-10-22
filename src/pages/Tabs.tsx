import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { home, search, personCircle } from "ionicons/icons";

const Tabs: React.FC = () => {
    return(
        <IonTabs>
            <IonRouterOutlet>
                

                <IonTabBar slot="bottom">
                    <IonTabButton tab="home">
                        <IonIcon icon={home}></IonIcon>
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="search">
                        <IonIcon icon={search}></IonIcon>
                        <IonLabel>Search</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="profile">
                        <IonIcon icon={personCircle}></IonIcon>
                        <IonLabel>Profile</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonRouterOutlet>
        </IonTabs>
    )
}

export default Tabs;