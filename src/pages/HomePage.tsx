import { IonContent, IonIcon, IonPage } from '@ionic/react';
import firebase from '../firebase';
import Freelancer from '../components/Freelancer';
import { cameraOutline, codeSlashOutline, colorPaletteOutline, megaphoneOutline, notificationsOutline, shirtOutline, videocamOffOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

//theme
import './HomePage.css'

const HomePage: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);
  const history = useHistory();

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
              setUserData(doc.data());
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

  //freelancer data
  useEffect(() => {

    const db = firebase.firestore();
    db.collection('users')
      .where('type', '==', 'freelancer')
      .onSnapshot((snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setData(newData);
      })
  }, [])

  function redirectWithId(page: string, id: string) {
    window.location.href = '/'.concat(page, '/', id);
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
          <h2 className="username"><span>Hello,</span><br />{userData.name}</h2>
          <IonIcon icon={notificationsOutline} className="notification" />
        </div>

        <div className="categories">
          <h2>Select Categories</h2>
          <div className="categories-flex">
            {arrCategory.map((doc, i) =>
              <a onClick={() => redirectWithId('CategoryPage', doc)} className="category" key={i}>
                <IonIcon icon={arrIcon[i]} className="category-icon" />
                <p>{doc}</p>
              </a>
            )}
          </div>
          <div className="categories-flex">
            {arrCategory2.map((doc, i) =>
              <a onClick={() => redirectWithId('CategoryPage', doc)} className="category" key={i}>
                <IonIcon icon={arrIcon2[i]} className="category-icon" />
                <p>{doc}</p>
              </a>
            )}
          </div>
        </div>

        <div className="featured-freelancer">
          <h2 className="featured-freelancer-title">Featured Freelancers</h2>
          {data.slice(0, 4).map((doc: any) =>
            <div onClick={() => redirectWithId('Freelancer', doc.id)} key={doc.id}>
              <Freelancer name={doc.name} job={doc.job} star={doc.star} review={doc.review} price={doc.price + 'M'} pic={doc.photo} />
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
