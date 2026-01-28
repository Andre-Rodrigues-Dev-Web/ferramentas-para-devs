import React from "react";
import {
  FaApple,
  FaWifi,
  FaSearch,
  FaBatteryFull,
  FaUserCircle,
  FaSlidersH,
} from "react-icons/fa";
import { MenuBar } from "../LaptopMockup.styles";

export const MacMenuBar: React.FC = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <MenuBar>
      <div className="left">
        <FaApple />
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Window</span>
        <span>Help</span>
      </div>
      <div className="right">
        <div className="icon-group">
          <FaBatteryFull />
          <FaWifi />
          <FaSearch />
          <FaSlidersH style={{ fontSize: "0.7rem" }} />
          <span style={{ fontWeight: 400 }}>{dateStr}</span>
          <span style={{ fontWeight: 400 }}>{timeStr}</span>
        </div>
        <FaUserCircle style={{ fontSize: "1.2rem", opacity: 0.8 }} />
      </div>
    </MenuBar>
  );
};
