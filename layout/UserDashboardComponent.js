import Image from "next/image";

import styles from "../styles/UserDashboardComponent.module.css";
import Button from "../UI/Button";

function UserDashboardComponent({image, title}) {
  return (
    <div className={styles.userdashboard_option}>
      <Image src={image} width={300} height={300} />
      <div className={styles.userdashboard_option_image}>
        <Button title={title} />
      </div>
    </div>
  );
}

export default UserDashboardComponent;
