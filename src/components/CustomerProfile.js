import React from "react";
import styles from "./CustomerProfile.module.css";
import envelopeBlack from "../images/envelope-black.png";
import markerBlack from "../images/marker-black.png";
import phonecallBlack from "../images/phonecall-black.png";
import alexImage from "../images/aleximage.png";
import orangeCheck from "../images/orange-check.png";
import greenCheck from "../images/green-check.png";

const CustomerProfile = ({ customerInfo }) => {
  const authenticatedCustomer =
    customerInfo.scanIDCardStatus === "COMPLETED" ? true : false;

  let isChecked = customerInfo.scanIDCardStatus === "COMPLETED" ? true : false;
  let checkImage;
  checkImage = isChecked ? greenCheck : orangeCheck;

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.customerImageContainer}>
          <img
            className={`${styles.customerImage} ${
              authenticatedCustomer ? styles.authenticated : ""
            }`}
            src={alexImage}
            alt="Alex profile"
          />
        </div>
        <div className={styles.profileInfoContainer}>
          <div className={styles.customerName}>
            {customerInfo.firstName} {customerInfo.lastName}
            <img
              className={styles.checkImage}
              src={checkImage}
              alt="Authentication Status"
            />
          </div>
          <div className={styles.customerPosition}>PROJECT MANAGER</div>
          <div className={styles.customerContact}>
            <img
              src={envelopeBlack}
              alt="Email"
              className={styles.contactImage}
            />
            {customerInfo.emailAddress}
            <img
              src={phonecallBlack}
              alt="Telephone"
              className={styles.phoneImage}
            />
            {customerInfo.phoneNumber}
          </div>
          <div className={styles.customerAddress}>
            {" "}
            <img
              src={markerBlack}
              alt="Address"
              className={styles.markerImage}
            />
            Happiness St,Dubai, UAE
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerProfile;
