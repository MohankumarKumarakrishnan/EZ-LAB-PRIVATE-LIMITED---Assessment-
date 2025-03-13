import React, { useState } from "react";

const App = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    
    if (!email) {
      setError("Email is required");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const response = await fetch("http://3.228.97.110:9000/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.status === 422) {
        setError(data.message || "Invalid email");
      } else if (response.status === 200) {
        setMessage("Form Submitted");
        setEmail("");
      } else {
        setError("Something went wrong. Try again later.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 w-full min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-blue-600">EZ Works</h1>
      <p className="text-gray-600 mt-2">Suite Of Business Support Services</p>
      
      <p className="text-gray-500 mt-4 max-w-lg text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...
      </p>

      
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {message && <p className="text-green-500 mt-2">{message}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {["Presentation Design", "Audio - Visual Production", "Translation Services", "Graphic Design", "Research & Analytics", "Data Processing"].map((service, index) => (
          <div key={index} className="bg-blue-900 text-white p-4 rounded-lg w-64">
            <h3 className="font-semibold">{service}</h3>
            <p className="text-sm mt-2">Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.</p>
          </div>

        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 rounded w-64 focus:ring focus:ring-blue-300"
        />
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Contact Me
        </button>
      </form>
    </div>
  );
};

export default App;