import "../styles/globals.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Components/Sections/Navbar";
import Footer from "../Components/Sections/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />;
      <Footer />
    </>
  );
}

export default MyApp;
