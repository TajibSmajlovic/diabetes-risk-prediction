import styles from "./Decoration.style.css";
import doctorPng from "../../images/doctor.png";
import { useLocation } from "remix";

export const decorationLinks = () => [{ rel: "stylesheet", href: styles }];

const TopLeftDecoration = () => {
  return (
    <div className="top-left-decoration">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="653.227"
        height="341"
        viewBox="0 0 653.227 341"
      >
        <path
          id="Path_54"
          data-name="Path 54"
          d="M13.982,130.947c-1.05,3.318,1.05,181.034,0,184.353C58.362,273.487,130.57,259.16,198.5,254.606s137.786-1.876,202.438-19.328c67.979-18.348,124.86-57.961,167.819-104.331S638.98,27.65,666.906-25.7H13.982Z"
          transform="translate(-13.679 25.7)"
          fill="rgba(123,228,149,0.9)"
        />
      </svg>
    </div>
  );
};

const BottomRightDecoration = () => {
  return (
    <div className="bottom-right-decoration">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="728.111"
        height="492.685"
        viewBox="0 0 728.111 492.685"
      >
        <path
          id="Path_293"
          data-name="Path 293"
          d="M1054.986,150.136C955.229,163.442,838.747,217.843,801.1,287.105c-9.143,16.82-15.579,34.618-28.521,50.03-22.3,26.551-61.428,43.019-101.232,53.807s-81.784,17.017-120.89,29.108C429.892,457.327,350.319,548.145,326.875,642.811l728.111.01Z"
          transform="translate(-326.875 -150.136)"
          fill="rgba(123,228,149,0.9)"
        />
      </svg>
    </div>
  );
};

const DoctorDecoration = () => {
  const { pathname } = useLocation();
  let width = Infinity;

  if (typeof window !== "undefined") {
    width = window.screen.width;
  }

  if (pathname === "/predict" && width < 800) {
    return <div className="doctor-decoration"></div>;
  }

  if (pathname === "/" && width > 800 && width < 1500) {
    return <div className="doctor-decoration"></div>;
  }

  return (
    <div className="doctor-decoration">
      {typeof window !== "undefined" && (
        <img src={doctorPng} alt="doctor-image" />
      )}
    </div>
  );
};

const Decoration = () => (
  <div className="wrapper">
    <TopLeftDecoration />
    <DoctorDecoration />
    <BottomRightDecoration />
  </div>
);

export default Decoration;
