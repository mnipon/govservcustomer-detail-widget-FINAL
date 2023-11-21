import React from "react";

import styles from "./ConversationTranscript.module.css";

const fallbackTranscripts = [
  {
    customerSay: null,
    botSay:
      "Hi Alex,  Welcome to Beyond Services, Are you here to update your ID card?",
  },
  {
    customerSay: "yes",
    botSay:
      'Great Alex ! please use the link and Scan your ID card https://secure.journeyid.io/s/oarsNVB Once completed, please confirm me with "Yes, I completed scan"',
  },
  {
    customerSay: null,
    botSay:
      'Please confirm "Yes, I completed scan" when you completed scan ID card.',
  },
  {
    customerSay: "done",
    botSay:
      "Thank you for updating your ID Card I see that you eligible for a Smart Meter. Would you like to upgrade?",
  },
  {
    customerSay: "yes ,but would be my advantage if i use smart meter",
    botSay:
      "Here are differences between smart meter and normal meter.\n  **Advantages of Smart Meters over Normal Meters**\n\n1.  Smart meters provide real-time energy consumption data, allowing consumers to make informed decisions about their energy usage and adjust their behavior accordingly.\n\n\n2.  Smart meters enable remote meter reading, eliminating the need for manual meter reading and reducing the potential for human error.\n\n\n3.  Smart meters can detect power outages and restore power more quickly.\n\n\n4.  Smart meters can be used to implement time-of-use pricing, which can encourage consumers to use energy during off-peak hours.\n\n\n5.  Smart meters can be used to identify and reduce energy theft. Would you like to proceed?",
  },
];

const ConversationTranscript = ({ customerInfo, onShowTranscript }) => {
  let transcripts = customerInfo.callTranscript;

  if (!transcripts) {
    transcripts = fallbackTranscripts;
  }

  return (
    <>
      <div className={styles.conversationContainer}>
        <div className={styles.closeText} onClick={onShowTranscript}>
          Close X
        </div>
        {transcripts.map((transcript) => (
          <div className={styles.conversationScriptContainer}>
            <div className={styles.customerText}>
              <span className={styles.customerTitle}>Alex:</span>{" "}
              {transcript.customerSay || "Hi"}
            </div>
            <div className={styles.botText}>
              <span className={styles.botTitle}>Bot:</span>
              {transcript.botSay}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ConversationTranscript;
