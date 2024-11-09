import { useState } from "react";

export default function TextInput({
  className,
  onEnter = () => {},
  placeholder = "Type something...",
}) {
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
      onEnter(input); // Pass the input to the parent component's callback
      setInput(""); // Clear the input after handling
    }
  };

  return (
    <input
      type="text"
      value={input}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      placeholder={placeholder}
      className={className}
    />
  );
}
