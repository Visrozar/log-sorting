"use strict";

const _ = require("lodash");
// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    // sort the logs in the logSources
    logSources.sort((a, b) => new Date(a.last.date).getTime() - new Date(b.last.date).getTime())

    while (logSources.length > 0) {
      const logEntry = logSources[0].last;
      printer.print(logEntry)

      logSources = await binaryInsert(logSources).catch((err) => { console.error(err); });
    }

    printer.done()
    resolve(console.log("Async sort complete."));
  });
};

async function binaryInsert(sortedLogSources) {
  const usedLogSource = sortedLogSources.shift();
  if (usedLogSource.drained) return sortedLogSources

  await usedLogSource.pop();
  // binary search and insert
  sortedLogSources.splice(_.sortedIndexBy(sortedLogSources, usedLogSource, "last.date"), 0, usedLogSource);

  return sortedLogSources;
}