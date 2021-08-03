"use strict";

const _ = require("lodash");
// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  // sort the logs in the logSources
  logSources.sort((a, b) => new Date(a.last.date).getTime() - new Date(b.last.date).getTime())

  while (logSources.length > 0) {
    const logEntry = logSources[0].last;
    printer.print(logEntry)

    logSources = binaryInsert(logSources)
  }

  printer.done()
  return console.log("Sync sort complete.");

};

function jsSort(logSources) {
  if (logSources[0].drained) {
    logSources.shift()
    return logSources
  }
  logSources[0].pop()
  // default JS sort
  logSources.sort((a, b) => new Date(a.last.date).getTime() - new Date(b.last.date).getTime())
  return logSources;
}

function binaryInsert(sortedLogSources) {
  const usedLogSource = sortedLogSources.shift();
  if (usedLogSource.drained) return sortedLogSources

  usedLogSource.pop();
  // binary search and insert
  sortedLogSources.splice(_.sortedIndexBy(sortedLogSources, usedLogSource, "last.date"), 0, usedLogSource);

  return sortedLogSources;
}

function loopSort(sortedLogSources) {
  const usedLogSource = sortedLogSources.shift();
  if (usedLogSource.drained) return sortedLogSources
  usedLogSource.pop();
  sortedLogSources.push(usedLogSource);

  // loop from last to first moving each bigger element to the right
  let i = sortedLogSources.length - 1;
  const item = sortedLogSources[i];
  while (i > 0 && item.last.date < sortedLogSources[i - 1].last.date) {
    sortedLogSources[i] = sortedLogSources[i - 1];
    i -= 1;
  }
  sortedLogSources[i] = item;
  return sortedLogSources;
}

function checkSorted(logSources) {
  let isSorted = true;
  logSources.some((source, i) => {
    if (logSources[i + 1] && source.last.date > logSources[i + 1].last.date) {
      console.log(`Broke on ${i} since ${source.last.date} > ${logSources[i + 1].last.date}`)
      isSorted = false;
      return true
    }
  });
  return isSorted
}