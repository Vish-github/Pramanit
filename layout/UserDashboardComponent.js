import Image from "next/image";
import {useRouter} from "next/router";

import styles from "../styles/UserDashboardComponent.module.css";
import Button from "../UI/Button";

function UserDashboardComponent({image, title, href}) {
  const router = useRouter();
  return (
    <div className={styles.userdashboard_option}>
      <Image src={image} width={300} height={300} />
      <div className={styles.userdashboard_option_image}>
        <Button title={title} onClick={() => router.push(href)} />
      </div>
    </div>
  );
}

export default UserDashboardComponent;
