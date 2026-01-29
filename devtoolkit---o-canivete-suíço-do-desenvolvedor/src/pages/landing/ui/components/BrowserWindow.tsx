import React from "react";
import { Terminal, Code, Cpu, Activity, Wrench } from "lucide-react";
import { FaCog, FaRegMap, FaSlidersH } from "react-icons/fa";
import { SiSafari } from "react-icons/si";
import {
  BrowserContainer,
  BrowserHeader,
  Tabs,
  Tab,
  Toolbar,
  UrlBar,
  PlatformPreview,
  SidebarMock,
  GridMock,
  CardMock,
  TrafficLightsContainer,
  TrafficLight,
  CardIcon,
  CardContent,
  CardTitle,
  CardDescription,
} from "../LaptopMockup.styles";
import MenuMockup from "./MenuMockup";

export const BrowserWindow: React.FC = () => {
  return (
    <BrowserContainer>
      <BrowserHeader>
        <Tabs>
          <Tab $active>
            <SiSafari style={{ color: "#3b82f6" }} /> DevToolkit Platform{" "}
            <span style={{ marginLeft: "auto", opacity: 0.5 }}>×</span>
          </Tab>
          <Tab>
            <FaCog /> Settings{" "}
            <span style={{ marginLeft: "auto", opacity: 0.5 }}>×</span>
          </Tab>
        </Tabs>
      </BrowserHeader>
      <Toolbar>
        <TrafficLightsContainer>
          <TrafficLight $variant="red">
            <svg
              viewBox="0 0 24 24"
              width="8"
              height="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </TrafficLight>
          <TrafficLight $variant="yellow">
            <svg
              viewBox="0 0 24 24"
              width="8"
              height="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            >
              <path d="M5 12h14" />
            </svg>
          </TrafficLight>
          <TrafficLight $variant="green">
            <svg
              viewBox="0 0 24 24"
              width="8"
              height="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            >
              <path d="M3 3l18 18M10 22L3 3l11 4" style={{ opacity: 0 }} />{" "}
              {/* Hide arrows, just simple green */}
              <path d="M4 12h8m-4-4v8" strokeWidth="4" />
            </svg>
          </TrafficLight>
        </TrafficLightsContainer>
        <UrlBar>
          <span style={{ fontSize: "0.6rem" }}>🔒</span>{" "}
          devtoolkit.app/dashboard
        </UrlBar>
      </Toolbar>

      <PlatformPreview>
        <SidebarMock>
          <MenuMockup />
        </SidebarMock>
        <GridMock>
          <CardMock>
            <CardIcon>
              <Code size={18} />
            </CardIcon>
            <CardContent>
              <CardTitle>JSON Formatter</CardTitle>
              <CardDescription>Beautify & Validate</CardDescription>
            </CardContent>
          </CardMock>
          <CardMock>
            <CardIcon $bg="rgba(16, 185, 129, 0.15)" $color="#10b981">
              <Cpu size={18} />
            </CardIcon>
            <CardContent>
              <CardTitle>UUID Generator</CardTitle>
              <CardDescription>v4 identifier tool</CardDescription>
            </CardContent>
          </CardMock>
          <CardMock>
            <CardIcon $bg="rgba(245, 158, 11, 0.15)" $color="#f59e0b">
              <Activity size={18} />
            </CardIcon>
            <CardContent>
              <CardTitle>JWT Decoder</CardTitle>
              <CardDescription>Decode & Verify</CardDescription>
            </CardContent>
          </CardMock>
          <CardMock>
            <CardIcon $bg="rgba(236, 72, 153, 0.15)" $color="#ec4899">
              <Terminal size={18} />
            </CardIcon>
            <CardContent>
              <CardTitle>SQL Fiddle</CardTitle>
              <CardDescription>Test queries fast</CardDescription>
            </CardContent>
          </CardMock>
          <CardMock>
            <CardIcon $bg="rgba(139, 92, 246, 0.15)" $color="#8b5cf6">
              <FaRegMap size={18} />
            </CardIcon>
            <CardContent>
              <CardTitle>CSS Gradient</CardTitle>
              <CardDescription>Design generator</CardDescription>
            </CardContent>
          </CardMock>
          <CardMock>
            <CardIcon $bg="rgba(6, 182, 212, 0.15)" $color="#06b6d4">
              <FaSlidersH size={18} />
            </CardIcon>
            <CardContent>
              <CardTitle>Base64</CardTitle>
              <CardDescription>Encoder/Decoder</CardDescription>
            </CardContent>
          </CardMock>
        </GridMock>
      </PlatformPreview>
    </BrowserContainer>
  );
};
