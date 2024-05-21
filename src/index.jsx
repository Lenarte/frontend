import { createRoot } from "react-dom/client";
import App from "./App";

const divDoIndex = document.getElementById("root");
const root = createRoot(divDoIndex);

root.render(<App />);