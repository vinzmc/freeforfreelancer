import { IonAvatar, IonIcon } from "@ionic/react"
import { star, starOutline } from "ionicons/icons"

import './Freelancer.css'

const Freelancer: React.FC<{ name: string, job: string, star: number, review: number, price: string, pic: string }> = props => {
    return (
        <div className="freelancer">

            <div className="freelancer-pic-price">
                <IonAvatar className="freelancer-avatar"><img src={props.pic} alt="" /></IonAvatar>
                <p>Rp. {props.price}</p>
            </div>

            <div className="freelacer-detail" style={{ marginTop: "-10px" }}>

                <h2 className="freelancer-job">{props.job}<br /><span>{props.name}</span></h2>

                <div className="review-flex">
                    {/* <div className="freelancer-star">
                        <IonIcon icon={star} />
                        <IonIcon icon={star} />
                        <IonIcon icon={star} />
                        <IonIcon icon={star} />
                    </div> */}
                    <h2 className="review-qty">
                        {[...Array(props.star)].map((_, i) =>
                            <IonIcon icon={star} key={i} />
                        )}
                        {[...Array(5 - props.star)].map((_, i) =>
                            <IonIcon icon={starOutline} key={5 - i} />
                        )} ({props.review} reviews)
                    </h2>
                </div>
            </div>

        </div>
    )
}

export default Freelancer