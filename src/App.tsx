import { InstallAppPrompt } from "@/modules/pwa/components/install-app-prompt";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@/routes";
import { PublicProviders } from "@/shared/providers/public-providers";

export default function App() {
  return (
    <BrowserRouter>
      <PublicProviders>
        <AppRoutes />
        <InstallAppPrompt />
      </PublicProviders>
    </BrowserRouter>
  )
}
