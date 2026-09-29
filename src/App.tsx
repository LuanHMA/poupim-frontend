import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@/routes";
import { PublicProviders } from "@/shared/providers/public-providers";

export default function App() {
  return (
    <BrowserRouter>
      <PublicProviders>
        <AppRoutes />
      </PublicProviders>
    </BrowserRouter>
  )
}
