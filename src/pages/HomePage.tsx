import { IonContent, IonIcon, IonPage } from '@ionic/react';

import Freelancer from '../components/Freelancer';
import { cameraOutline, codeSlashOutline, colorPaletteOutline, megaphoneOutline, notificationsOutline, shirtOutline, videocamOffOutline } from 'ionicons/icons';

import './HomePage.css'

const HomePage: React.FC = () => {
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

          <Freelancer name={'Sergio Nathaniel'} job={'UX Designer'} star={4} review={12} price={'1.2M'} pic={'https://i.ibb.co/kKvtcqR/pexels-stefan-stefancik-91227.jpg'} />

          <Freelancer name={'Andy Bernard'} job={'Android Developer'} star={5} review={8} price={'1.5M'} pic={'https://i.ibb.co/5xjmLTz/pexels-italo-melo-2379005.jpg'} />

          <Freelancer name={'Kaleb Juliu'} job={'User Interface Designer'} star={4} review={9} price={'1.0M'} pic={'https://i.ibb.co/Dzh7Wrf/KJ.png'} />

          <Freelancer name={'John Thor'} job={'Wordpress Developer'} star={4} review={18} price={'900K'} pic={'https://i.ibb.co/ZXyp28S/pexels-simon-robben-614810.jpg'} />

        </div>


      </IonContent>
    </IonPage>
  );
};

export default HomePage;
