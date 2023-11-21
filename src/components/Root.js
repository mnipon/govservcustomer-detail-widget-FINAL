import React, { useState, useEffect } from "react";

import styles from "./Root.module.css";

import Main from "./Main";

const Root = ({ api, interactionId }) => {
  const [customerAddress, setCustomerAddress] = useState(null);

  // useEffect to get customerAddress state to fix issue with too many re-renders with api
  useEffect(() => {
    api.onDataEvent("onMediaEvent", (data) => {
      console.log("onMediaEvent: " + JSON.stringify(data));
      if (data.participants[0].type === "CUSTOMER") {
        setCustomerAddress(data.participants[0].address.trim());
      }
    });
  }, []);

  console.log("customer address is :", customerAddress);
  if (customerAddress) {
    return (
      <>
        <Main customerAddress={customerAddress} />
        {/* <div className={styles.loading}>Here is Customer Information</div> */}
      </>
    );
  } else {
    return (
      <>
        <div className={styles.loading}>Loading Customer Information</div>
      </>
    );
  }
};

export default Root;
