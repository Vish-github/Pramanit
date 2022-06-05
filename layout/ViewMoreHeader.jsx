import Link from "next/link";
import styles from "../styles/ViewMoreHeader.module.css";

function ViewMoreHeader({ title, type }) {
  return (
    <div className={styles.view_more_header_container}>
      <h2>{title}</h2>
      <Link href={`/view_all_applications?type=${type}`}>
        <button>View All</button>
      </Link>
    </div>
  );
}

export default ViewMoreHeader;
