import React from "react";
import {
  FaApple,
  FaWifi,
  FaSearch,
  FaBatteryFull,
  FaUserCircle,
  FaSlidersH,
} from "react-icons/fa";
import {
  MenuBar,
  MenuBarLeft,
  MenuBarRight,
  MenuBarIconGroup,
  MenuBarItem,
} from "../LaptopMockup.styles";

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
      <MenuBarLeft>
        <FaApple />
        <MenuBarItem>File</MenuBarItem>
        <MenuBarItem>Edit</MenuBarItem>
        <MenuBarItem>View</MenuBarItem>
        <MenuBarItem>Window</MenuBarItem>
        <MenuBarItem>Help</MenuBarItem>
      </MenuBarLeft>
      <MenuBarRight>
        <MenuBarIconGroup>
          <FaBatteryFull />
          <FaWifi />
          <FaSearch />
          <FaSlidersH style={{ fontSize: "0.7rem" }} />
          <span style={{ fontWeight: 400 }}>{dateStr}</span>
          <span style={{ fontWeight: 400 }}>{timeStr}</span>
        </MenuBarIconGroup>
        <FaUserCircle style={{ fontSize: "1.2rem", opacity: 0.8 }} />
      </MenuBarRight>
    </MenuBar>
  );
};
