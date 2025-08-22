import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "normalize.css";

import { BlueprintProvider } from "@blueprintjs/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BlueprintProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BlueprintProvider>
  </StrictMode>,
);
