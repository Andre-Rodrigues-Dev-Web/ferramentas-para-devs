import React from "react";
import {
  IoIosChatbubbles,
  IoIosImages,
  IoIosCalendar,
  IoIosApps,
  IoIosMail,
} from "react-icons/io";
import { SiSafari } from "react-icons/si";
import { FaFolder, FaMusic, FaCog, FaTrash } from "react-icons/fa";
import { DockContainer, AppIcon, Divider } from "../LaptopMockup.styles";

export const MacDock: React.FC = () => {
  return (
    <DockContainer>
      <AppIcon $color="#fff" $bg="#1c64f2" $isOpen>
        <FaFolder />
      </AppIcon>
      <AppIcon $color="#fff" $bg="linear-gradient(180deg, #60a5fa, #3b82f6)">
        <IoIosApps />
      </AppIcon>
      <AppIcon $color="#fff" $bg="#3b82f6" $isOpen>
        <SiSafari />
      </AppIcon>
      <AppIcon $color="#fff" $bg="#0ea5e9">
        <IoIosMail />
      </AppIcon>
      <Divider />
      <AppIcon $color="#fff" $bg="#22c55e" $isOpen>
        <IoIosChatbubbles />
      </AppIcon>
      <AppIcon $color="#fff" $bg="#ea580c">
        <IoIosImages />
      </AppIcon>
      <AppIcon $color="#fff" $bg="#f59e0b">
        <IoIosCalendar />
      </AppIcon>
      <AppIcon $color="#fff" $bg="#ef4444" $isOpen>
        <FaMusic />
      </AppIcon>
      <Divider />
      <AppIcon $color="#fff" $bg="#64748b" $isOpen>
        <FaCog />
      </AppIcon>
      <AppIcon $color="#fff" $bg="#94a3b8">
        <FaTrash />
      </AppIcon>
    </DockContainer>
  );
};
