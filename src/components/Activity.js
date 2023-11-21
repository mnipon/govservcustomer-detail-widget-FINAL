import React, { useState, useEffect } from "react";
import styles from "./Activity.module.css";
import chatBlack from "../images/chat.png";
import aiBlack from "../images/ai.png";
import websiteBlack from "../images/website.png";
import ConversationTranscript from "./ConversationTranscript";

function Activity({ customerInfo }) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);

  console.log("Vertex Summary is :", customerInfo.vertexSummary);

  const showTranscriptHandler = () => {
    setShowTranscript((prevState) => !prevState);
    console.log("Show Transcript State : ", showTranscript);
  };

  const toggleFullTextHandler = () => {
    setIsFullTextVisible(!isFullTextVisible);
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
              <img className={styles.laptop} src={websiteBlack} alt="Laptop" />
            </div>
          </div>
          <div className={styles.verticalLine1}></div>
          <div className={styles.verticalLine2}></div>
        </div>
        <div className={styles.column2}>
          <div className={styles.row1}>Ongoing Chat</div>
          <div className={styles.row2}>
            <div
              className={styles.truncatedtext}
              onMouseEnter={toggleFullTextHandler}
              onMouseLeave={toggleFullTextHandler}
            >
              {isFullTextVisible ? (
                <div>{customerInfo.vertexSummary}</div>
              ) : (
                <div>{customerInfo.vertexSummaryShort}...</div>
              )}
            </div>
          </div>
          <div
            className={styles.transcriptButton}
            onClick={showTranscriptHandler}
          >
            Show Transcript
          </div>
          <div className={styles.row3}>
            {customerInfo.scanIDCardStatus === "COMPLETED"
              ? "Alex updated her ID card via website with help of AI Bot."
              : "Alex visited website and need to contact agent."}
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
