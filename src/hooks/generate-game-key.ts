/* eslint-disable no-plusplus */
export const generateGameKey = () => {
  const arrayKeys = new Array(17);
  const keys: string[] = [];
  const firstChartCode = 65, totalCharts = 25;
  const firstNumber = 48, totalNumber = 9;
  for (let i = 0; i < arrayKeys.length; i++) {
    const chartOrNumber = Math.floor(Math.random() * 2);
    if (i === 5 || i === 11) keys.push('-');
    else if (chartOrNumber) {
      const num = String.fromCharCode((Math.floor(Math.random() * totalNumber) + firstNumber));
      keys.push(num);
    } else {
      const chart = String.fromCharCode((Math.floor(Math.random() * totalCharts) + firstChartCode));
      keys.push(chart);
    }
  }

  return keys.join('');
};
