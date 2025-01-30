import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/Context.jsx";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { newChat, prevPrompts, onSent } = useContext(Context); // Use `newChat` from context

  return (
    <div className="Sidebar">
      <div className="top">
        {/* Menu Icon */}
        <img
          className="menu"
          src={assets.menu_icon}
          alt="Menu icon"
          onClick={() => setExtended(!extended)} // Toggle extended state
        />

        {/* New Chat Section */}
        <div className="new-chat" onClick={newChat}>
          {/* Trigger newChat function on click */}
          <img src={assets.plus_icon} alt="Plus icon" />
          {extended && <p>New Chat</p>}
        </div>

        {/* Recent Section */}
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                className="recent-entry"
                key={index} // Unique key for React rendering
                onClick={() => onSent(item)} // Call `onSent` with the clicked prompt
              >
                <img src={assets.message_icon} alt="Message icon" />
                <p>{item}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="bottom">
        <div className="bottom-item">
          <img src={assets.question_icon} alt="Question icon" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item">
          <img src={assets.history_icon} alt="History icon" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item">
          <img src={assets.setting_icon} alt="Settings icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

