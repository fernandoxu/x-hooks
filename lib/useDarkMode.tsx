import { useState, useEffect } from 'react';

const matchDark = '(prefers-color-scheme: dark)';

/**
 * 判断 dark mode 是否开启
 */
function useDarkMode() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia && window.matchMedia(matchDark).matches
  );

  const handleChange = ({ matches }: MediaQueryListEvent) => setIsDark(matches);

  useEffect(() => {
    const matcher = window.matchMedia(matchDark);

    //! 旧版本的 safari 不支持 addEventListener
    if (!matcher?.addEventListener) {
      matcher.addListener(handleChange);
      return () => {
        matcher.removeListener(handleChange);
      };
    }

    matcher.addEventListener('change', handleChange);
    return () => {
      matcher.removeEventListener('change', handleChange);
    };
  }, [setIsDark]);

  return isDark;
}

export { useDarkMode };
