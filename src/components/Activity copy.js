import React, { useState, useEffect } from "react";
import styles from "./Activity.module.css";
import chatBlack from "../images/chat-black.png";
import aiBlack from "../images/ai-black.png";
import laptop from "../images/laptop.png";
import ConversationTranscript from "./ConversationTranscript";
import ConversationSummary from "./ConversationSummary";

function Activity({ customerInfo }) {
  const [showTranscript, setShowTranscript] = useState(false);

  const tempVertexSummary =
    "The customer wants to update their ID card. The bot provides a link to scan the ID card and the customer confirms that they have completed the scan. The bot then asks if the customer would like to upgrade to a smart meter. The customer asks for more information about the advantages of a smart meter and the bot provides a list of advantages. The customer then agrees to proceed with the upgrade.";

  const [vertexSummary, setVertexSummary] = useState();

  useEffect(() => {
    setVertexSummary(customerInfo.vertexSummary);
  }, [customerInfo]);
  console.log("Vertex Summary is :", vertexSummary);

  const showTranscriptHandler = () => {
    setShowTranscript((prevState) => !prevState);
    console.log("Show Transcript State : ", showTranscript);
  };

  return (
    <>
      <div className={styles.activityContainer}>
        <div className={styles.column1}>
          <div className={styles.iconContainer}>
            <div className={styles.activity}>Activity</div>
            <div className={styles.icon}>
              <img className={styles.chat} src={chatBlack} alt="Chat" />
            </div>
            <div className={`${styles.icon} ${styles.icon2}`}>
              <img className={styles.ai} src={aiBlack} alt="AI" />
            </div>
            <div className={`${styles.icon} ${styles.icon3}`}>
              <img className={styles.laptop} src={laptop} alt="Laptop" />
            </div>
          </div>
          <div className={styles.verticalLine1}></div>
          <div className={styles.verticalLine2}></div>
        </div>
        <div className={styles.column2}>
          <div className={styles.row1}>Ongoing Chat</div>
          <div className={styles.row2}>
            <ConversationSummary text={vertexSummary} maxLength="75" />
            {/* {customerInfo.vertexSummary} */}
          </div>
          <div
            className={styles.transcriptButton}
            onClick={showTranscriptHandler}
          >
            Show Transcript
          </div>
          <div className={styles.row3}>
            Alex updated her ID card via website with help of AI Bot.
          </div>
        </div>
      </div>
      {showTranscript && (
        <ConversationTranscript
          customerInfo={customerInfo}
          onShowTranscript={showTranscriptHandler}
        />
      )}
    </>
  );
}

export default Activity;
