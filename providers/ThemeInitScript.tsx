"use client";

const STORAGE_KEY = "which-font-theme";

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})();`;

export function ThemeInitScript() {
  if (typeof window !== "undefined") {
    return null;
  }

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: THEME_INIT_SCRIPT,
      }}
    />
  );
}
