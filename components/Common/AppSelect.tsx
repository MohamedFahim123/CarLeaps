"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import styles from "./AppSelect.module.css";

export type AppSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type AppSelectProps = {
  options: AppSelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
  variant?: "default" | "onDark" | "compact" | "ghostBorder";
  "aria-label"?: string;
};

export default function AppSelect({
  options,
  value,
  defaultValue = "",
  onChange,
  placeholder = "Select",
  disabled = false,
  id,
  name,
  className = "",
  variant = "default",
  "aria-label": ariaLabel,
}: AppSelectProps) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const current = value !== undefined ? value : uncontrolled;

  const selected = useMemo(
    () => options.find((option) => option.value === current),
    [options, current]
  );

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (
        rootRef.current &&
        event.target instanceof Node &&
        !rootRef.current.contains(event.target)
      ) {
        close();
      }
    };

    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [close, open]);

  const choose = (next: string) => {
    if (value === undefined) setUncontrolled(next);
    onChange?.(next);
    close();
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  };

  const variantClass =
    variant === "onDark"
      ? styles.onDark
      : variant === "compact"
        ? styles.compact
        : variant === "ghostBorder"
          ? styles.ghostBorder
          : "";

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${variantClass} ${className}`.trim()}
    >
      {name ? <input type="hidden" name={name} value={current} readOnly /> : null}
      <button
        type="button"
        id={selectId}
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel || placeholder}
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        onKeyDown={onTriggerKeyDown}
      >
        <span
          className={`${styles.label} ${
            selected ? "" : styles.placeholder
          }`.trim()}
        >
          {selected?.label || placeholder}
        </span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6.5L8 10.5L12 6.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul className={styles.menu} role="listbox" aria-labelledby={selectId}>
          {options.map((option) => {
            const isSelected = option.value === current;
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={option.disabled}
                  className={`${styles.option} ${
                    isSelected ? styles.optionSelected : ""
                  }`}
                  onClick={() => !option.disabled && choose(option.value)}
                  onMouseEnter={(event) => {
                    event.currentTarget.classList.add(styles.optionActive);
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.classList.remove(styles.optionActive);
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
