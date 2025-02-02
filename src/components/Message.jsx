import React from "react";

const Message = ({ text, isSender }) => {
    return (
        <div
            style={{
                textAlign: isSender ? "right" : "left",
                margin: "10px",
                padding: "10px",
                backgroundColor: isSender ? "#DCF8C6" : "#ECECEC",
                borderRadius: "10px",
                maxWidth: "70%",
                alignSelf: isSender ? "flex-end" : "flex-start",
            }}
        >
            {text}
        </div>
    );
};

export default Message;