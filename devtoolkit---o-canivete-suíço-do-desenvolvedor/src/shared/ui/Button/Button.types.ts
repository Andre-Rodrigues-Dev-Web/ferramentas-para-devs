import * as React from "react";

export interface StyledButtonProps {
  $variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  $size?: "sm" | "md" | "lg";
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}
