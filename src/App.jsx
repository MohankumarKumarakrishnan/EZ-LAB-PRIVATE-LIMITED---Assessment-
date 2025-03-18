import React, { useState } from "react";

import logoImage from "./assets/ez.png";
import designIcon from "./assets/design.png";
import audioIcon from "./assets/audio.png";
import translationIcon from "./assets/translation.png";
import graphicIcon from "./assets/graphic.png";
import researchIcon from "./assets/research.png";
import dataIcon from "./assets/data.png";
import "./App.css";

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
      const response = await fetch("https://test.ezworks.ai/api", {
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

  const services = [
    {
      title: "Presentation Design",
      icon: designIcon,
      description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
    },
    {
      title: "Audio - Visual Production",
      icon: audioIcon,
      description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
    },
    {
      title: "Translation Services",
      icon: translationIcon,
      description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
    },
    {
      title: "Graphic Design",
      icon: graphicIcon,
      description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
    },
    {
      title: "Research & Analytics",
      icon: researchIcon,
      description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
    },
    {
      title: "Data Processing",
      icon: dataIcon,
      description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
    },
  ];

  return (
    <div className="outer-background">
      <div className="page-container">
        <div className="left-section">
          <div className="logo-row">
            <img src={logoImage} alt="EZ Works Logo" className="logo-image" />
          </div>

          <h2 className="tagline">Suite Of Business Support Services</h2>

          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...
          </p>

          
          <form onSubmit={handleSubmit}>
            <div className="email-container desktop">
              <input
                type="email"
                className="email-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="contact-button" type="submit">
                Contact Me
              </button>
            </div>
          </form>

         
          {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
          {message && <p style={{ color: "green", marginTop: "0.5rem" }}>{message}</p>}
        </div>

        {/* Services Section */}
        <div className="right-section">
          {services.map((service, index) => (
            <div className="card" key={index}>
              <div className="card-header">
                <img src={service.icon} alt={service.title} className="card-icon" />
                <h3>{service.title}</h3>
              </div>
              <p>{service.description}</p>
            </div>
          ))}

          {/* Mobile Form */}
          <form onSubmit={handleSubmit}>
            <div className="email-container mobile">
              <input
                type="email"
                className="email-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="contact-button" type="submit">
                Contact Me
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
