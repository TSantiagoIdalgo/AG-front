export const scrollInToView = (elementId: string, yOffset: number = -80, maxAttempts = 10) => {
  let attempts = 0;
  const interval = setInterval(() => {
    const element = document.getElementById(elementId);
    if (element || attempts >= maxAttempts) {
      clearInterval(interval);
      if (element) {
        const yScroll = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ behavior: 'smooth', top: yScroll });
      }
    }
    attempts+=1;
  }, 100);
};