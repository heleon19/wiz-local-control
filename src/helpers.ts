export function convertPWMRefreshRateToPWMConf(
  pwmRefreshRate: number,
): string {
  const refreshRateHundreds = pwmRefreshRate / 100;
  return ("0" + refreshRateHundreds).slice (-2);
}
