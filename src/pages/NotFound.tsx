import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { text } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{text("Oops! Page not found", "यह पेज नहीं मिला")}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          {text("Return to Home", "होम पर वापस जाएँ")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
