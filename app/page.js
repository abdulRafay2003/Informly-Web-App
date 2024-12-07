"use client";

export default function Home() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>Informly</h1>
        <p style={styles.description}>HELP, JUST A TAP AWAY</p>
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
    backgroundColor: "#ffffff", // Dark background for contrast
    color: "#000000", // White text for better visibility
    fontFamily: "'Poppins', sans-serif", // Modern font style
  },
  container: {
    textAlign: "center",
  },
  title: {
    fontSize: "5rem", // Large font size for the title
    fontWeight: "bold",
    margin: "0",
    fontFamily: "'Roboto', sans-serif", // Modern font style
    color: "red", // Eye-catching neon-like color
    letterSpacing: "2px", // Slightly spaced out letters for a sleek look
  },
  description: {
    fontSize: "1rem", // Smaller font size for subtitle
    marginTop: "1px",
    fontWeight:'bold',
    color: "#000000", // Softer white for description
    maxWidth: "600px", // Limit width of the description
  },
};
