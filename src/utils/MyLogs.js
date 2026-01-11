const LOG_ENABLE = true;

export function MyLog(key, value) {
  if (LOG_ENABLE) {
    console.log(key, value);
  }
}
