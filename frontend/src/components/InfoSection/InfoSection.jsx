import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./InfoSection.module.scss";
import {
	faCarSide,
	faClock,
	faLocationDot,
	faPhone,
} from "@fortawesome/free-solid-svg-icons";

function InfoSection() {
	return (
		<section className={styles.info}>
			<div className={styles.info__wrap}>
				<div className={styles.info__item}>
					<FontAwesomeIcon icon={faPhone} className={styles.info__icon} />
					<p className={styles.info__text}>
						721 195 379 <br /> 697 760 969
					</p>
				</div>
				<div className={styles.info__item}>
					<FontAwesomeIcon icon={faLocationDot} className={styles.info__icon} />
					<p className={styles.info__text}>
						Food Order App <br /> Łukasza Bajora 14b <br /> Pogwizdów
					</p>
				</div>
				<div className={styles.info__item}>
					<FontAwesomeIcon icon={faClock} className={styles.info__icon} />
					<p className={styles.info__text}>
						pon.-czw.: 11:00 - 22:45 <br /> pt.-sob.: 12:00-22:45 <br /> nd.:
						11:00-22:45 <br />
						lokal czynny do 22:00
					</p>
				</div>
				<div className={styles.info__item}>
					<FontAwesomeIcon icon={faCarSide} className={styles.info__icon} />
					<p className={styles.info__text}>
						Warunki dostawy indywidualnie <br />W terenie do 5km - gratis!
					</p>
				</div>
			</div>
		</section>
	);
}

export default InfoSection;
