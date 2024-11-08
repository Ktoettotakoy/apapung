import { useState } from "react";

export default function TextInput({ className }) {
  const [input, setInput] = useState("");

  // Define the foo function
  const foo = () => {
    console.log("Function 'foo' called with input:", input);
    // Perform any action you want with the input here
    setInput(""); // Clear the input after handling if needed
  };

  // Handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      foo();
    }
  };

  return (
    <input
      type="text"
      value={input}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      placeholder="Type something and press Enter"
      className={className}
    />
  );
}
