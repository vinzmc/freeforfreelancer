import { IonContent, IonIcon, IonPage } from '@ionic/react';
import firebase from '../firebase';
import Freelancer from '../components/Freelancer';
import { cameraOutline, codeSlashOutline, colorPaletteOutline, megaphoneOutline, notificationsOutline, shirtOutline, videocamOffOutline } from 'ionicons/icons';

import './HomePage.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    window.location.href = "/Tabs/Freelancer/".concat(id);
  }

  function categoryOnClick(id: string) {
    window.location.href = "/CategoryPage/".concat(id);
  }

  const arrCategory = [
    'Design',
    'Programming',
    'Marketing',
    'Videography',
    'Photography',
    'T-shit Design'
  ]

  const arrIcon = [
    colorPaletteOutline,
    codeSlashOutline,
    megaphoneOutline,
    videocamOffOutline,
    cameraOutline,
    shirtOutline
  ]

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
            {[...Array(3)].map((_, i) =>
              <a onClick={() => categoryOnClick(arrCategory[i])} className="category" key={i}>
                <IonIcon icon={arrIcon[i]} className="category-icon" />
                <p>{arrCategory[i]}</p>
              </a>
            )}
            {[...Array(3)].map((_, i) =>
              <a onClick={() => categoryOnClick(arrCategory[i+3])} className="category" key={i}>
                <IonIcon icon={arrIcon[i+3]} className="category-icon" />
                <p>{arrCategory[i+3]}</p>
              </a>
            )}
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
