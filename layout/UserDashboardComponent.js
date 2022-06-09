import Image from "next/image";
import {useRouter} from "next/router";

import styles from "../styles/UserDashboardComponent.module.css";
import Button from "../UI/Button";

function UserDashboardComponent({image, title, href, active}) {
  const router = useRouter();
  return (
    <div
      className={styles.userdashboard_option}
      style={{
        opacity: active ? 1 : 0.5,
        pointerEvents: active ? "all" : "none",
      }}
    >
      <Image src={image} width={300} height={300} />
      <div className={styles.userdashboard_option_image}>
        <Button title={title} onClick={() => router.push(href)} />
      </div>
    </div>
  );
}

export default UserDashboardComponent;
