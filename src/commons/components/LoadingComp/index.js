import Layout from "../Layout";
import css from "src/commons/styles/productDetail.module.css";

function LoadingComp() {
  return (
    <>
      <>
        <Layout title="Product Detail" />
        <div className={css.back}>
          <div className={css.loading}>
            <div className={css.loader}>
              <svg
                className={`${css["loading-animation"]}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
              >
                <path
                  className={`${css["loading-animation__path"]}`}
                  d="M17.9 91.1V8.9h33.5s28.8-1.4 28.8 24.7c0 19.6-17.5 23.2-17.5 23.2L85 91.2H69.8l-21-33h-8.1V47.1h9.6s16.1 1.6 16.1-13.5-16.1-13.4-16.1-13.4H31.1v70.9H17.9z"
                />
              </svg>
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default LoadingComp;
