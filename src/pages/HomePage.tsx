import { IonContent, IonIcon, IonPage } from '@ionic/react';
import firebase from '../firebase';
import Freelancer from '../components/Freelancer';
import { cameraOutline, codeSlashOutline, colorPaletteOutline, megaphoneOutline, notificationsOutline, shirtOutline, videocamOffOutline } from 'ionicons/icons';

import './HomePage.css'
import { useEffect, useState } from 'react';

const HomePage: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('freelancer')
      .onSnapshot((snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setData(newData);
      })
  }, [])

  function cardOnClick(id: string) {
    console.log(id);
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">

        <div className="navbar">
          <h2 className="username"><span>Hello,</span><br />Ricky Tandiono</h2>
          <IonIcon icon={notificationsOutline} className="notification" />
        </div>

        <div className="categories">
          <h2>Select Categories</h2>
          <div className="categories-flex">
            <div className="category">
              <IonIcon icon={colorPaletteOutline} className="category-icon" />
              <p>Design</p>
            </div>
            <div className="category">
              <IonIcon icon={codeSlashOutline} className="category-icon" />
              <p>Programming</p>
            </div>
            <div className="category">
              <IonIcon icon={megaphoneOutline} className="category-icon" />
              <p>Marketing</p>
            </div>
          </div>
          <div className="categories-flex">
            <div className="category">
              <IonIcon icon={videocamOffOutline} className="category-icon" />
              <p>Video Edit</p>
            </div>
            <div className="category">
              <IonIcon icon={cameraOutline} className="category-icon" />
              <p>Photography</p>
            </div>
            <div className="category">
              <IonIcon icon={shirtOutline} className="category-icon" />
              <p>T-shirt Design</p>
            </div>
          </div>
        </div>

        <div className="featured-freelancer">
          <h2 className="featured-freelancer-title">Featured Freelancers</h2>
          {data.map((doc: any) =>
            <div onClick={() => cardOnClick(doc.id)} key={doc.id}>
              <Freelancer name={doc.name} job={doc.job} star={doc.star} review={doc.review} price={doc.price + 'M'} pic={doc.pic} />
            </div>
          )
          }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
