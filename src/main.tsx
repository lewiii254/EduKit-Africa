import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Inject AdSense only in production builds
if (import.meta.env.PROD) {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5562813955044752";
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
}

createRoot(document.getElementById("root")!).render(<App />);
