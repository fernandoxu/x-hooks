import { useDebounceFn } from 'ahooks';
import { useState, useEffect } from 'react';

/**
 *  判断是否滚动到底部
 * @param {number} offset 距离底部多少距离触发
 */
const usePageBottom = (offset: number = 10) => {
  const [reachedBottom, setReachedBottom] = useState(false);

  const { run: handleScroll } = useDebounceFn(
    () => {
      const offsetHeight = document.documentElement.offsetHeight;
      const innerHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;

      const hasReachedBottom =
        offsetHeight - (innerHeight + scrollTop) <= offset;

      setReachedBottom(hasReachedBottom);
    },
    {
      wait: 200,
    }
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return reachedBottom;
};

export { usePageBottom };
