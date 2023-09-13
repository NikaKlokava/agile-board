import cl from "./styles/footer.module.css";

export const Footer = () => {
  return (
    <div className={cl.footer_wrapper}>
      <p className={cl.footer_text}>Veranika Klokava</p>
      <p className={cl.footer_text}>2023</p>
      <div className={cl.footer_links}>
        <a href="https://instagram.com/nika_klokava?igshid=MmIzYWVlNDQ5Yg==">
          <div className={cl.instagram} />
        </a>
        <a href="https://linkedin.com/in/veranika-klokava-858b5b287">
          <div className={cl.linkedin} />
        </a>
        <a href="https://github.com/NikaKlokava">
          <div className={cl.github} />
        </a>
      </div>
    </div>
  );
};
