const readline = require("readline");

export function startLogging(logItemName: string) {
  process.stdout.write(logItemName + "...");
}

export function endLogging(logItemName: string, startTime: number) {
  let elapsed = Date.now() - startTime;
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(
    `${logItemName}...Done ✅ ${(elapsed / 1000).toFixed(3)}s`
  );
  process.stdout.write("\n");
}
