import cl from "./loader.module.css";

export const Loader = () => {
  return (
    <div className={cl.loader_container}>
      <div className={cl.loader_title}></div>
    </div>
  );
};
