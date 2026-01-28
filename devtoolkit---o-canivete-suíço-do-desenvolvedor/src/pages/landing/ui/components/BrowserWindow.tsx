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
} from "../LaptopMockup.styles";

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
        <div
          style={{ display: "flex", gap: "0.5rem" }}
          className="traffic-lights"
        >
          <div className="red">
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
          </div>
          <div className="yellow">
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
          </div>
          <div className="green">
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
          </div>
        </div>
        <UrlBar>
          <span style={{ fontSize: "0.6rem" }}>🔒</span>{" "}
          devtoolkit.app/dashboard
        </UrlBar>
      </Toolbar>

      <PlatformPreview>
        <SidebarMock>
          <div
            className="logo-container"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
              paddingLeft: "0.5rem",
            }}
          >
            <div
              style={{
                width: "1.5rem",
                height: "1.5rem",
                background: "#3b82f6",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)",
              }}
            >
              <Wrench size={12} color="white" />
            </div>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              DevToolkit
            </span>
          </div>

          <div
            className="menu-group"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div
              className="item active"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.5rem",
                borderRadius: "6px",
                background: "rgba(59, 130, 246, 0.15)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
              }}
            >
              <span style={{ fontSize: "0.6rem", color: "#60a5fa" }}>
                Dashboard
              </span>
            </div>
            <div
              className="item"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.5rem",
              }}
            >
              <span style={{ fontSize: "0.6rem", color: "#94a3b8" }}>
                Tools
              </span>
            </div>
            <div
              className="item"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.5rem",
              }}
            >
              <span style={{ fontSize: "0.6rem", color: "#94a3b8" }}>
                Settings
              </span>
            </div>
          </div>
        </SidebarMock>
        <GridMock>
          <CardMock>
            <div
              className="icon"
              style={{
                background: "rgba(59, 130, 246, 0.15)",
                color: "#3b82f6",
              }}
            >
              <Code size={18} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontSize: "0.6rem",
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                JSON Formatter
              </span>
              <span style={{ fontSize: "0.5rem", color: "#64748b" }}>
                Beautify & Validate
              </span>
            </div>
          </CardMock>
          <CardMock>
            <div
              className="icon"
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                color: "#10b981",
              }}
            >
              <Cpu size={18} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontSize: "0.6rem",
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                UUID Generator
              </span>
              <span style={{ fontSize: "0.5rem", color: "#64748b" }}>
                v4 identifier tool
              </span>
            </div>
          </CardMock>
          <CardMock>
            <div
              className="icon"
              style={{
                background: "rgba(245, 158, 11, 0.15)",
                color: "#f59e0b",
              }}
            >
              <Activity size={18} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontSize: "0.6rem",
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                JWT Decoder
              </span>
              <span style={{ fontSize: "0.5rem", color: "#64748b" }}>
                Decode & Verify
              </span>
            </div>
          </CardMock>
          <CardMock>
            <div
              className="icon"
              style={{
                background: "rgba(236, 72, 153, 0.15)",
                color: "#ec4899",
              }}
            >
              <Terminal size={18} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontSize: "0.6rem",
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                SQL Fiddle
              </span>
              <span style={{ fontSize: "0.5rem", color: "#64748b" }}>
                Test queries fast
              </span>
            </div>
          </CardMock>
          <CardMock>
            <div
              className="icon"
              style={{
                background: "rgba(139, 92, 246, 0.15)",
                color: "#8b5cf6",
              }}
            >
              <FaRegMap size={18} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontSize: "0.6rem",
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                CSS Gradient
              </span>
              <span style={{ fontSize: "0.5rem", color: "#64748b" }}>
                Design generator
              </span>
            </div>
          </CardMock>
          <CardMock>
            <div
              className="icon"
              style={{
                background: "rgba(6, 182, 212, 0.15)",
                color: "#06b6d4",
              }}
            >
              <FaSlidersH size={18} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontSize: "0.6rem",
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                Base64
              </span>
              <span style={{ fontSize: "0.5rem", color: "#64748b" }}>
                Encoder/Decoder
              </span>
            </div>
          </CardMock>
        </GridMock>
      </PlatformPreview>
    </BrowserContainer>
  );
};
