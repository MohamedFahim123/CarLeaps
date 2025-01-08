"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function SelectComponent({
  options = ["New York", "Los Vegas", "California"],
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]); // Added handleClickOutside to dependencies

  return (
    <div ref={ref} className={`drop-menu  ${isDropdownOpen ? "active" : ""} `}>
      <div className="select" onClick={() => setIsDropdownOpen((prev) => !prev)}>
        <span>{selectedOption}</span>
        <i className="fa fa-angle-down" />
      </div>

      {isDropdownOpen && (
        <ul
          className="dropdown"
          style={{
            display: "block",
            opacity: 1,
            visibility: "visible",
            transition: "0.4s",
          }}
        >
          {options.map((option, index) => (
            <li
              onClick={() => {
                setSelectedOption(option);
                setIsDropdownOpen(false);
              }}
              key={index}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
