"use client";

import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useSearchParams } from "next/navigation";

const appId = "5d6071ce5e0445709bc9f1c7d7f20888";
const channelName = "informly";

export default function StreamClient() {
  const searchParams = useSearchParams();
  const remoteStreamRef = useRef(null);
  const clientRef = useRef(null);

  const [token, setToken] = useState("");

  useEffect(() => {
    let tokenParam = searchParams.get("token");
    if (tokenParam) {
      tokenParam = tokenParam.replace(/ /g, "+"); // Handle spaces in the token
      const decodedToken = decodeURIComponent(tokenParam);
      console.log("Decoded Token -------->>>>>", decodedToken);
      setToken(decodedToken); // Store the decoded token in state
    }
  }, [searchParams]);

  useEffect(() => {
    if (!token) return;

    const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    clientRef.current = client;

    const initAgora = async () => {
      try {
        await client.join(appId, channelName, token, null);
        // console.log("Joined channel successfully");

        client.on("user-published", async (user, mediaType) => {
          // console.log("User published:", user.uid, "MediaType:", mediaType);
          await client.subscribe(user, mediaType);

          if (mediaType === "video" && user.videoTrack) {
            console.log("User===>>", user.dataChannels);
            // console.log("leng===>>", user.videoTrack);
            const videoTracks = user.videoTrack
              ? [user.videoTrack]
              : user.videoTracks; // Handle multiple video tracks

            videoTracks.forEach((track, index) => {
              let playerContainer = document.getElementById(
                `user-${user.uid}-${index}`
              );

              if (!playerContainer) {
                playerContainer = document.createElement("div");
                playerContainer.id = `user-${user.uid}-${index}`;
                playerContainer.style.width = "50%"; // Adjust to fit two video streams
                playerContainer.style.height = "900px"; // Adjust to fit two video streams
                playerContainer.style.display = "inline-block"; // To place streams side by side
                remoteStreamRef.current.append(playerContainer);
              }

              track.play(playerContainer.id); // Play each track in its own container
              console.log(`Playing video track ${index} for user`, user.uid);
            });
          }

          if (mediaType === "audio" && user.audioTrack) {
            user.audioTrack.play();
            console.log("Playing audio for user", user.uid);
          }
        });

        client.on("user-unpublished", (user) => {
          console.log("User unpublished:", user.uid);
          const videoTracks = user.videoTrack
            ? [user.videoTrack]
            : user.videoTracks; // Handle multiple video tracks

          videoTracks.forEach((track, index) => {
            const playerContainer = document.getElementById(
              `user-${user.uid}-${index}`
            );
            if (playerContainer) {
              playerContainer.remove();
            }
          });
        });
      } catch (error) {
        console.error("Failed to join channel or handle stream:", error);
      }
    };

    initAgora();

    return () => {
      if (clientRef.current) {
        clientRef.current
          .leave()
          .then(() => {
            console.log("Left the channel");
          })
          .catch((error) => {
            console.error("Error leaving channel:", error);
          });
      }
    };
  }, [token]);

  return (
    <div style={styles.bgColor}>
      <h1 style={styles.heading}>Informly</h1>
      <h2 style={styles.subHeading}>Help, just a tap away</h2>
      <div
        ref={remoteStreamRef}
        id="remote-stream"
        style={styles.streamContainer}
      >
        {/* Video will be rendered inside this container */}
      </div>
    </div>
  );
}

const styles = {
  heading: {
    textAlign: "center",
    color: "red",
    margin: "5px 0",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: "1rem",
    fontFamily: "'Poppins',sans-serif",
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
  },
  streamContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    height: "calc(100vh - 60px)",
    justifyContent: "space-around", // Space out the video containers
    alignItems: "center",
    backgroundColor: "white",
    position: "relative",
    overflow: "hidden",
  },
  player: {
    width: "90%", // Width of each video container
    height: "45%", // Height of each video container (adjust as necessary)
    backgroundColor: "gray", // Fallback color for player containers
    border: "1px solid #ffffff", // Optional border for visibility
  },
  bgColor: {
    backgroundColor: "white",
  },
};
