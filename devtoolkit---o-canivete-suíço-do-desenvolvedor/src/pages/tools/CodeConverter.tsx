import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import {
  RefreshCw,
  Copy,
  RotateCcw,
  FileCode,
  FileJson,
  FileType,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaReact, FaVuejs, FaAngular, FaPython, FaSwift } from "react-icons/fa";
import {
  SiSvelte,
  SiKotlin,
  SiFlutter,
  SiExpo,
  SiDotnet,
  SiSwift,
} from "react-icons/si";
import * as S from "./styles/CodeConverter.styles";
import { toast } from "react-hot-toast";
import { formatCode } from "../../shared/utils/formatter";

type Platform =
  | "react"
  | "vue"
  | "angular"
  | "svelte"
  | "react-native"
  | "kotlin"
  | "flutter"
  | "dotnet"
  | "python"
  | "swift";

const CodeConverter: React.FC = () => {
  const theme = useTheme();
  const tabsRef = useRef<HTMLDivElement>(null);

  // Input State
  const [html, setHtml] = useState(
    '<div class="card">\n  <h1>Hello World</h1>\n  <p>Welcome to platform converter</p>\n</div>',
  );
  const [cssInput, setCssInput] = useState(
    ".card {\n  padding: 20px;\n  background: #fff;\n  border-radius: 8px;\n}\n\nh1 {\n  color: #333;\n}",
  );
  const [js, setJs] = useState("// Logic goes here");

  // Output State
  const [targetPlatform, setTargetPlatform] = useState<Platform>("react");
  const [outputCode, setOutputCode] = useState("");

  const platforms = [
    { id: "react", label: "React", icon: FaReact, color: "#61DAFB" },
    { id: "vue", label: "Vue", icon: FaVuejs, color: "#4FC08D" },
    { id: "angular", label: "Angular", icon: FaAngular, color: "#DD0031" },
    { id: "svelte", label: "Svelte", icon: SiSvelte, color: "#FF3E00" },
    { id: "react-native", label: "Expo", icon: SiExpo, color: "#61DAFB" },
    { id: "kotlin", label: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
    { id: "flutter", label: "Flutter", icon: SiFlutter, color: "#42A5F5" },
    { id: "dotnet", label: ".NET (Blazor)", icon: SiDotnet, color: "#512BD4" },
    { id: "python", label: "Python (Tk)", icon: FaPython, color: "#3776AB" },
    { id: "swift", label: "SwiftUI", icon: FaSwift, color: "#F05138" },
  ];

  const activePlatformConfig = platforms.find((p) => p.id === targetPlatform);

  useEffect(() => {
    // Debounce conversion to avoid heavy prettier calls on every keystroke
    const timer = setTimeout(() => {
      convertCode();
    }, 100);
    return () => clearTimeout(timer);
  }, [html, cssInput, js, targetPlatform]);

  const convertCode = async () => {
    let rawCode = "";
    let lang: any = "babel";

    try {
      switch (targetPlatform) {
        case "react":
          rawCode = generateReact(html, cssInput, js);
          lang = "babel";
          break;
        case "vue":
          rawCode = generateVue(html, cssInput, js);
          lang = "vue";
          break;
        case "angular":
          rawCode = generateAngular(html, cssInput, js);
          lang = "angular";
          break;
        case "svelte":
          rawCode = generateSvelte(html, cssInput, js);
          lang = "html";
          break;
        case "react-native":
          rawCode = generateReactNative(html, cssInput, js);
          lang = "babel";
          break;
        case "kotlin":
          rawCode = generateKotlin(html, cssInput, js);
          lang = "kotlin";
          break;
        case "flutter":
          rawCode = generateFlutter(html, cssInput, js);
          lang = "dart";
          break;
        case "dotnet":
          rawCode = generateDotNet(html, cssInput, js);
          lang = "html"; // Blazor is HTML-like
          break;
        case "python":
          rawCode = generatePython(html, cssInput, js);
          lang = "python"; // Not supported by prettier-standalone by default, will likely fallback
          break;
        case "swift":
          rawCode = generateSwift(html, cssInput, js);
          lang = "swift"; // Will fallback
          break;
      }

      const formatted = await formatCode(rawCode, lang);
      setOutputCode(formatted);
    } catch (error) {
      console.error(error);
      setOutputCode(
        "// Error converting code. Please check your HTML structure.",
      );
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
    toast.success("Code copied to clipboard!");
  };

  const handleReset = () => {
    setHtml("");
    setCssInput("");
    setJs("");
    toast.success("Input cleared");
  };

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = 150;
      tabsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          <RefreshCw size={36} color={theme.colors.primary[500]} />
          Platform Converter
        </S.Title>
        <S.Description>
          Transform web code into component boilerplate. Use the arrows to
          explore more platforms.
        </S.Description>
      </S.Header>

      <S.Workspace>
        {/* Left Pane: Source Editors */}
        <S.IdeWindow>
          <S.IdeHeader>
            <S.WindowControls>
              <div className="red" />
              <div className="yellow" />
              <div className="green" />
            </S.WindowControls>
            <span
              style={{
                color: "#888",
                fontSize: "0.8rem",
                marginLeft: "0.5rem",
              }}
            >
              Source Code (Web)
            </span>
            <div style={{ flex: 1 }} />
            <S.ActionButton onClick={handleReset} title="Reset All">
              <RotateCcw size={14} />
            </S.ActionButton>
          </S.IdeHeader>

          <S.IdeBody style={{ overflow: "hidden" }}>
            <S.SplitPane style={{ height: "40%" }}>
              <S.SplitHeader>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <FileCode size={12} color="#E34F26" /> index.html
                </div>
              </S.SplitHeader>
              <S.EditorTextarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder="<!-- HTML Structure -->"
                spellCheck={false}
              />
            </S.SplitPane>

            <S.SplitPane style={{ height: "35%" }}>
              <S.SplitHeader>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <FileType size={12} color="#264de4" /> styles.css
                </div>
              </S.SplitHeader>
              <S.EditorTextarea
                value={cssInput}
                onChange={(e) => setCssInput(e.target.value)}
                placeholder="/* CSS Styles */"
                spellCheck={false}
              />
            </S.SplitPane>

            <S.SplitPane style={{ flex: 1 }}>
              <S.SplitHeader>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <FileJson size={12} color="#F7DF1E" /> script.js
                </div>
              </S.SplitHeader>
              <S.EditorTextarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                placeholder="// JS Logic"
                spellCheck={false}
              />
            </S.SplitPane>
          </S.IdeBody>
        </S.IdeWindow>

        {/* Right Pane: Target Output */}
        <S.IdeWindow>
          <S.IdeHeader>
            <S.TabsContainer>
              <S.ScrollControl onClick={() => scrollTabs("left")}>
                <ChevronLeft size={14} />
              </S.ScrollControl>
              <S.PlatformTabs ref={tabsRef}>
                {platforms.map((p) => (
                  <S.IdeTab
                    key={p.id}
                    $active={targetPlatform === p.id}
                    $brandColor={p.color}
                    onClick={() => setTargetPlatform(p.id as Platform)}
                  >
                    <p.icon size={14} />
                    {p.label}
                  </S.IdeTab>
                ))}
              </S.PlatformTabs>
              <S.ScrollControl onClick={() => scrollTabs("right")}>
                <ChevronRight size={14} />
              </S.ScrollControl>
            </S.TabsContainer>

            <S.CopyButton onClick={handleCopy}>
              <Copy size={12} /> Copy
            </S.CopyButton>
          </S.IdeHeader>
          <S.IdeBody>
            <S.ScrollDisplay>
              <S.OutputDisplay $brandColor={activePlatformConfig?.color}>
                {outputCode}
              </S.OutputDisplay>
            </S.ScrollDisplay>
          </S.IdeBody>
        </S.IdeWindow>
      </S.Workspace>
    </S.Container>
  );
};

// --- Conversion Strategies ---

// Existing
function generateReact(html: string, css: string, js: string) {
  let jsx = html.replace(/class=/g, "className=");
  jsx = jsx.replace(/<!--/g, "{/*").replace(/-->/g, "*/}");

  const indent = (str: string) =>
    str
      .split("\n")
      .map((l) => "      " + l)
      .join("\n")
      .trim();

  return `// MyComponent.tsx
import React from 'react';
import styled from 'styled-components';

export default function MyComponent() {
  // ${js.replace(/\n/g, "\n  // ")}

  return (
    <Wrapper>
      ${jsx ? indent(jsx) : "{/* Content */}"}
    </Wrapper>
  );
}

const Wrapper = styled.div\`
  ${css}
\`;
`;
}

function generateVue(html: string, css: string, js: string) {
  return `<!-- MyComponent.vue -->
<template>
  ${html}
</template>

<script setup>
// ${js}
</script>

<style scoped>
${css}
</style>
`;
}

function generateAngular(html: string, css: string, js: string) {
  return `// my-component.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: \`
    ${html}
  \`,
  styles: [\`
    ${css}
  \`]
})
export class MyComponent {
  // ${js}
}
`;
}

function generateSvelte(html: string, css: string, js: string) {
  return `<!-- MyComponent.svelte -->
<script>
  // ${js}
</script>

${html}

<style>
  ${css}
</style>
`;
}

function generateReactNative(html: string, css: string, js: string) {
  let rnJsx = html
    .replace(/<div/g, "<View")
    .replace(/<\/div>/g, "</View>")
    .replace(/<span/g, "<Text")
    .replace(/<\/span>/g, "</Text>")
    .replace(/<p/g, "<Text")
    .replace(/<\/p>/g, "</Text>")
    .replace(/<h[1-6]/g, "<Text")
    .replace(/<\/h[1-6]>/g, "</Text>")
    .replace(/class="/g, "style={styles.");

  return `// MyComponent.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MyComponent() {
  // ${js}

  return (
    <View style={styles.container}>
      ${rnJsx}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  /* 
  Manual conversion required for:
  ${css.replace(/\n/g, "\n  ")}
  */
});
`;
}

function generateKotlin(html: string, css: string, js: string) {
  return `// Layout (res/layout/activity_my_component.xml)
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <!-- ${html} -->

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Sample Text" />

</LinearLayout>

// Activity (MyComponentActivity.kt)
class MyComponentActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_my_component)
        
        // ${js}
    }
}
`;
}

function generateFlutter(html: string, css: string, js: string) {
  return `// my_component.dart
import 'package:flutter/material.dart';

class MyComponent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            // HTML:
            /* ${html} */
            
            Text('Sample Text'),
          ],
        ),
      ),
    );
  }
}
`;
}

// New Strategies

function generateDotNet(html: string, css: string, js: string) {
  // Blazor Component
  return `@page "/my-component"

<div class="my-component-wrapper">
    ${html}
</div>

@code {
    // Logic from JS
    /*
    ${js}
    */
    
    protected override void OnInitialized()
    {
        // Init logic
    }
}

<style>
    ${css}
</style>
`;
}

function generatePython(html: string, css: string, js: string) {
  // Tkinter Frame
  return `import tkinter as tk
from tkinter import ttk

class MyComponent(tk.Frame):
    def __init__(self, parent):
        super().__init__(parent)
        self.pack(fill='both', expand=True, padx=20, pady=20)
        
        # Styles applied via configuration
        # ${css.replace(/\n/g, " ")}

        self.create_widgets()
        
    def create_widgets(self):
        # HTML Structure Mapping
        """
        ${html}
        """
        
        self.label = ttk.Label(self, text="Converted Component")
        self.label.pack(pady=10)
        
        # JS Logic
        # ${js}

if __name__ == "__main__":
    root = tk.Tk()
    root.geometry("400x300")
    app = MyComponent(root)
    root.mainloop()
`;
}

function generateSwift(html: string, css: string, js: string) {
  return `import SwiftUI

struct MyComponent: View {
    // JS Logic State
    /*
    ${js}
    */

    var body: some View {
        VStack {
            // HTML Mapping
            /*
            ${html}
            */
            Text("Content")
                .padding()
        }
        .padding() // Default container style
    }
}

struct MyComponent_Previews: PreviewProvider {
    static var previews: some View {
        MyComponent()
    }
}

// CSS comments:
/*
${css}
*/
`;
}

export default CodeConverter;
