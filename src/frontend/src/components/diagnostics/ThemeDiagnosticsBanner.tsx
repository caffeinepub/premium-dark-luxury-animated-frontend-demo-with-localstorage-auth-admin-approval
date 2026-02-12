import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

export default function ThemeDiagnosticsBanner() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [diagnostics, setDiagnostics] = useState({
    cssLoaded: false,
    themeVariables: false,
    backgroundApplied: false,
  });

  useEffect(() => {
    // Check if diagnostics are enabled via query param
    const params = new URLSearchParams(window.location.search);
    const diagEnabled = params.get('diag') === '1';
    setIsEnabled(diagEnabled);

    if (diagEnabled) {
      // Run diagnostics
      const runDiagnostics = () => {
        // Check if CSS is loaded by looking for a known style
        const body = document.body;
        const computedStyle = window.getComputedStyle(body);
        
        // Check background color
        const bgColor = computedStyle.backgroundColor;
        const backgroundApplied = bgColor.includes('10') || bgColor.includes('31') || bgColor.includes('68'); // RGB values for #0A1F44
        
        // Check if CSS variables are defined
        const rootStyle = window.getComputedStyle(document.documentElement);
        const neonBlue = rootStyle.getPropertyValue('--neon-blue');
        const luxuryDark = rootStyle.getPropertyValue('--luxury-dark');
        const themeVariables = !!(neonBlue && luxuryDark);
        
        // Check if stylesheets are loaded
        const cssLoaded = document.styleSheets.length > 0;

        setDiagnostics({
          cssLoaded,
          themeVariables,
          backgroundApplied,
        });
      };

      // Run immediately and after a short delay to ensure CSS is loaded
      runDiagnostics();
      setTimeout(runDiagnostics, 500);
    }
  }, []);

  if (!isEnabled) return null;

  const allPassed = diagnostics.cssLoaded && diagnostics.themeVariables && diagnostics.backgroundApplied;

  return (
    <div className="fixed top-4 right-4 z-[100] max-w-md">
      <Alert 
        variant={allPassed ? "default" : "destructive"}
        className="border-2 shadow-lg"
      >
        {allPassed ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5" />
        )}
        <AlertTitle className="font-bold">
          {allPassed ? 'Theme Diagnostics: PASS' : 'Theme Diagnostics: FAIL'}
        </AlertTitle>
        <AlertDescription className="mt-2 space-y-1 text-sm">
          <div className="flex items-center gap-2">
            {diagnostics.cssLoaded ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span>CSS Loaded: {diagnostics.cssLoaded ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center gap-2">
            {diagnostics.themeVariables ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span>Theme Variables: {diagnostics.themeVariables ? 'Present' : 'Missing'}</span>
          </div>
          <div className="flex items-center gap-2">
            {diagnostics.backgroundApplied ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span>Dark Background: {diagnostics.backgroundApplied ? 'Applied' : 'Not Applied'}</span>
          </div>
          <div className="mt-2 pt-2 border-t border-white/20 flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="text-xs">
              Add <code className="bg-black/30 px-1 rounded">?diag=1</code> to URL to enable diagnostics
            </span>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
