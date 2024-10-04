import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { Button } from "./components/Buttons/DefaultButton/Button";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Button title={"123"} />
  </StrictMode>,
);
