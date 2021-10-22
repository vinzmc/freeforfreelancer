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
      .where('name', '!=', 'Sergio Nathaniel')//temporary solution untuk auth
      .onSnapshot((snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setData(newData);
      })
  }, [])

  function cardOnClick(id: string) {
    window.location.href = "/Freelancer/".concat(id);
  }

  function categoryOnClick(id: string) {
    window.location.href = "/CategoryPage/".concat(id);
  }

  const arrCategory = [
    'Design',
    'Programming',
    'Marketing'
  ]

  const arrCategory2 = [
    'Videography',
    'Photography',
    'T-shirt Design'
  ]

  const arrIcon = [
    colorPaletteOutline,
    codeSlashOutline,
    megaphoneOutline
  ]

  const arrIcon2 = [
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
            {arrCategory.map((doc, i) =>
              <a onClick={() => categoryOnClick(doc)} className="category" key={i}>
                <IonIcon icon={arrIcon[i]} className="category-icon" />
                <p>{doc}</p>
              </a>
            )}
          </div>
          <div className="categories-flex">
            {arrCategory2.map((doc, i) =>
              <a onClick={() => categoryOnClick(doc)} className="category" key={i}>
                <IonIcon icon={arrIcon2[i]} className="category-icon" />
                <p>{doc}</p>
              </a>
            )}
          </div>
        </div>

        <div className="featured-freelancer">
          <h2 className="featured-freelancer-title">Featured Freelancers</h2>
          {data.slice(0,4).map((doc: any) =>
            <div onClick={() => cardOnClick(doc.id)} key={doc.id}>
              <Freelancer name={doc.name} job={doc.job} star={doc.star} review={doc.review} price={doc.price + 'M'} pic={doc.pic} />
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
