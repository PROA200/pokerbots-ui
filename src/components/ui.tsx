import React from "react";
import { theme } from "../theme";
export function Panel({
  style,
  children,
}: {
  style?: React.CSSProperties;
  children: any;
}) {
  return (
    <div
      style={{
        background: theme.panel,
        border: `1px solid ${theme.line}`,
        borderRadius: 12,
        padding: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
export function H1({ children }: { children: any }) {
  return (
    <h1
      style={{
        fontFamily:
          "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        fontSize: 28,
        margin: 0,
        fontWeight: 800,
      }}
    >
      {children}
    </h1>
  );
}
export function Small({ children }: { children: any }) {
  return <span style={{ color: theme.sub, fontSize: 13 }}>{children}</span>;
}
export function Pill({
  children,
  onClick,
}: {
  children: any;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        border: `1px solid ${theme.line}`,
        background: theme.panel,
        fontSize: 12,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
export function ActionButton({
  children,
  disabled,
  onClick,
}: {
  children: any;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 10,
        border: `1.5px solid ${disabled ? theme.line : theme.ink}`,
        background: disabled ? theme.panel : theme.ink,
        color: disabled ? theme.ink : "#fff",
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 600,
        fontSize: 14,
      }}
    >
      {children}
    </button>
  );
}
export function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        const num = e.target.value.replace(/[^0-9]/g, "");
        onChange(num);
      }}
      type="number"
      inputMode="numeric"
      pattern="[0-9]*"
      min="0"
      style={{
        padding: "10px 12px",
        borderRadius: 10,
        border: `1px solid ${theme.line}`,
        outline: "none",
        width: "100%",
        fontSize: 14,
      }}
    />
  );
}
