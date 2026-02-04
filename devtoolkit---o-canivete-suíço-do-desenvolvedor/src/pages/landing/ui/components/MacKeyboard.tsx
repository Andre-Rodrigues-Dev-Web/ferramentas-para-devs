import React from "react";
import { KeyboardWell, KeyRow, Key } from "../LaptopMockup.styles";

export const MacKeyboard: React.FC = () => {
  return (
    <KeyboardWell>
      {/* Function Row */}
      <KeyRow style={{ height: "0.6rem" }}>
        {[
          "Esc",
          "F1",
          "F2",
          "F3",
          "F4",
          "F5",
          "F6",
          "F7",
          "F8",
          "F9",
          "F10",
          "F11",
          "F12",
        ].map((k) => (
          <Key key={k}>
            <span style={{ fontSize: "0.35rem", opacity: 0.7 }}>{k}</span>
          </Key>
        ))}
        <Key $width={1.5} $special /> {/* Touch ID */}
      </KeyRow>
      {/* Numbers */}
      <KeyRow>
        {[
          "~",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "0",
          "-",
          "=",
          "Del",
        ].map((k) => (
          <Key key={k}>{k}</Key>
        ))}
      </KeyRow>
      {/* QWERTY */}
      <KeyRow>
        <Key $width={1.5}>
          <span style={{ fontSize: "0.4rem" }}>Tab</span>
        </Key>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"].map(
          (k) => (
            <Key key={k}>{k}</Key>
          ),
        )}
      </KeyRow>
      {/* ASDF */}
      <KeyRow>
        <Key $width={1.8}>
          <span style={{ fontSize: "0.4rem" }}>Caps</span>
        </Key>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"].map((k) => (
          <Key key={k}>{k}</Key>
        ))}
        <Key $width={1.8}>
          <span style={{ fontSize: "0.4rem" }}>Enter</span>
        </Key>
      </KeyRow>
      {/* ZXCV */}
      <KeyRow>
        <Key $width={2.2}>
          <span style={{ fontSize: "0.4rem" }}>Shift</span>
        </Key>
        {["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"].map((k) => (
          <Key key={k}>{k}</Key>
        ))}
        <Key $width={2.2}>
          <span style={{ fontSize: "0.4rem" }}>Shift</span>
        </Key>
      </KeyRow>
      {/* Spacebar Row */}
      <KeyRow>
        <Key $width={1.5}>
          <span style={{ fontSize: "0.35rem" }}>Fn</span>
        </Key>
        <Key $width={1.5}>
          <span style={{ fontSize: "0.35rem" }}>Ctrl</span>
        </Key>
        <Key $width={1.5}>
          <span style={{ fontSize: "0.35rem" }}>Opt</span>
        </Key>
        <Key $width={1.5}>
          <span style={{ fontSize: "0.35rem" }}>Cmd</span>
        </Key>
        <Key $width={6} />
        <Key $width={1.5}>
          <span style={{ fontSize: "0.35rem" }}>Cmd</span>
        </Key>
        <Key $width={1.5}>
          <span style={{ fontSize: "0.35rem" }}>Opt</span>
        </Key>
        <Key $width={1} />
        <Key $width={1} />
      </KeyRow>
    </KeyboardWell>
  );
};
