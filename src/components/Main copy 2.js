import React, { useState, useEffect } from "react";

import styles from "./Main.module.css";
import CustomerProfile from "./CustomerProfile";
import Activity from "./Activity";

const Main = ({ api, interactionId }) => {
  const [customerInfo, setCustomerInfo] = useState({});

  useEffect(() => {
    api.onDataEvent("onMediaEvent", (data) => {
      console.log("onMediaEvent: " + JSON.stringify(data));
      if (data.participants[0].type === "CUSTOMER") {
        const fetchHeaders = new Headers();
        fetchHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          operation: "getProfile",
          profileName: data.participants[0].address.trim(),
        });

        var requestOptions = {
          method: "POST",
          headers: fetchHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          `https://us-central1-nipon-test-350808.cloudfunctions.net/public_getProfile_MongoDB_Services`,
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Customer Information from REST API ", data);
            setCustomerInfo(data);
            if (!customerInfo.firstName) {
              fetch(
                `https://us-central1-nipon-test-350808.cloudfunctions.net/public_getProfile_MongoDB_Services`,
                requestOptions
              )
                .then((response2) => response2.json())
                .then((data2) => {
                  console.log("Customer2 Information from REST API ", data2);
                  setCustomerInfo(data2);
                });
            }
          });
      }
    });
  }, [api, customerInfo]);

  return (
    <>
      <div className={styles.mainContainer}>
        <CustomerProfile customerInfo={customerInfo} />
        <Activity customerInfo={customerInfo} />
      </div>
    </>
  );
};

export default Main;
