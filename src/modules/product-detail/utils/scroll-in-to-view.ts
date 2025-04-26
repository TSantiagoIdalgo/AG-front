// eslint-disable-next-line no-magic-numbers
export const scrollInToView = (elementId: string, yOffset: number = -80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const yScroll = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    window.scrollTo({ behavior: 'smooth', top: yScroll });
  }
};