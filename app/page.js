"use client";

export default function Home() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>Informly</h1>
        <p style={styles.description}>Help, just a tap away</p>
      </div>
    </main>
  );
}

const styles = {
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full viewport height
    backgroundColor: "#000000", // Dark background for contrast
    color: "#ffffff", // White text for better visibility
    fontFamily: "'Poppins', sans-serif", // Modern font style
  },
  container: {
    textAlign: "center",
  },
  title: {
    fontSize: "5rem", // Large font size for the title
    fontWeight: "bold",
    margin: "0",
    color: "#ffffff", // Eye-catching neon-like color
    letterSpacing: "2px", // Slightly spaced out letters for a sleek look
  },
  description: {
    fontSize: "1.5rem", // Smaller font size for subtitle
    marginTop: "12px",
    color: "#DDDDDD", // Softer white for description
    maxWidth: "600px", // Limit width of the description
  },
};
