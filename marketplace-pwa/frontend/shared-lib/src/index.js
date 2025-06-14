// Context
// Exported using * to export all named exports from a module,
// but also, because it uses named exports (export const AuthContext = ...),
// it allows importing specific exports from the module.
// For some unknown reason, the AuthContext is not being exported using the * syntax
// export * from "./context/AuthContext";
export { AuthProvider, AuthContext } from "./context/AuthContext";

// Components
export { default as Login } from "./components/Login.jsx";
export { default as Signup } from "./components/Signup.jsx";

// UI components
export * from "./components/ui/alert.jsx";
export { default as Badge } from "./components/ui/badge.jsx";
export { default as Button } from "./components/ui/button.jsx";
export * from "./components/ui/card.jsx";
export * from "./components/ui/carousel.jsx";
export { default as Checkbox } from "./components/ui/checkbox.jsx";
export * from "./components/ui/dialog.jsx";
export * from "./components/ui/form.jsx";
export { default as Input } from "./components/ui/input.jsx";
export { default as Label } from "./components/ui/label.jsx";
export { default as ScrollArea } from "./components/ui/scroll-area.jsx";
export * from "./components/ui/table.jsx";

// Pages
export { default as LoginPage } from "./pages/LoginPage.jsx";

// Services
export { default as api } from "./services/api.js";
export { default as authService } from "./services/authService.js";

// Lib utilities
export * from "./lib/utils.js";
