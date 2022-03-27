import styles from "../../../styles/MunicipalityStat.module.css";

function MunicipalityStat({color, title, value}) {
  return (
    <div
      className={styles.municipality_stat_container}
      style={{
        backgroundColor: color,
      }}
    >
      <p className={styles.municipality_stat_title}>{title}</p>
      <p className={styles.municipality_stat_value}> {value}</p>
    </div>
  );
}

export default MunicipalityStat;
