import React, { useState, useEffect } from "react";

import styles from "./Main.module.css";
import CustomerProfile from "./CustomerProfile";
import Activity from "./Activity";

const maxRetries = 4;

const Main = ({ customerAddress }) => {
  const [customerInfo, setCustomerInfo] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let currentRetryCount = retryCount;

    let fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      operation: "getProfile",
      profileName: customerAddress,
    });

    var requestOptions = {
      method: "POST",
      headers: fetchHeaders,
      body: raw,
      redirect: "follow",
    };

    const fetchCustomerData = async () => {
      try {
        const response = await fetch(
          `https://us-central1-nipon-test-350808.cloudfunctions.net/public_getProfile_MongoDB_Services`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setCustomerInfo(result);
        console.log("Fetching data now");
      } catch (error) {
        console.error("Error fetching data:", error);
        if (currentRetryCount < maxRetries) {
          currentRetryCount++;
          setRetryCount(currentRetryCount);
        } else {
          console.error("Max retries exceeded, Unable to fetch customer data.");
        }
      }
    };

    if (customerAddress) {
      fetchCustomerData();
    }
  }, [customerAddress, retryCount]);

  return (
    <>
      {!customerInfo && (
        <div className={styles.mainContainer}>
          <div className={styles.loading}>Loading Customer Information</div>
        </div>
      )}
      {customerInfo && (
        <div className={styles.mainContainer}>
          <CustomerProfile customerInfo={customerInfo} />
          <Activity customerInfo={customerInfo} />
        </div>
      )}
    </>
  );
};

export default Main;
