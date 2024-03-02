import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={`${styles.container} border-t border-gray-600`}>
      <div className={`${styles.footerWrapper}`}>
        <div className={styles.logo}>Suham Hamid</div>
        <div className={styles.text}>
          {`Suham's personal project © All rights reserved.`}
        </div>
      </div>
    </div>
  );
};

export default Footer;
