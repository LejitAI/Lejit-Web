import React from "react";

const ComingSoon = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        color: "white",
        flexDirection: "column",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Main Header */}
      <h1 style={{ fontSize: "3rem", marginBottom: "20px", animation: "fadeIn 1.5s ease-in-out" }}>
        Something Awesome is Coming Soon!
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "30px", maxWidth: "600px", lineHeight: "1.5" }}>
        We are working hard to finish the development of this page. Please stay
        tuned for updates!
      </p>

      {/* Image or Illustration */}
      <div
        style={{
          width: "250px",
          height: "250px",
          marginBottom: "30px",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "5rem",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          🚀
        </span>
      </div>

     
    </div>
  );
};

export default ComingSoon;
