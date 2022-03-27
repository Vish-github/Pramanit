import styles from "../styles/ViewMoreHeader.module.css";

function ViewMoreHeader({title}) {
  return (
    <div className={styles.view_more_header_container}>
      <h2>{title}</h2>
      <button>View All</button>
    </div>
  );
}

export default ViewMoreHeader;
