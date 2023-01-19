import { parse } from "csv-parse/sync";
import {
  currentDayFormatted,
  currentMonthFormatted,
  currentYear,
} from "./dates";
import { userEnrollmentItem } from "./types";
import { startLogging, endLogging } from "./logging";
const readline = require("readline");

const dev = process.env.NODE_ENV === "development";

export default async function getUserEnrollmentData() {
  var startTime = Date.now();
  startLogging("getUserEnrollmentData");

  const userEnrollmentDataUrl = `https://ton.twimg.com/birdwatch-public-data/${currentYear}/${currentMonthFormatted}/${currentDayFormatted}/userEnrollment/userEnrollment-00000.tsv`;

  const res = await fetch(userEnrollmentDataUrl);
  const text = await res.text();

  const allUserStates = parse(text, {
    columns: true,
    skip_empty_lines: true,
    delimiter: "\t",
    to: dev ? 1500000 : undefined,
  }).map((user: userEnrollmentItem) => {
    return {
      enrollmentState: user.enrollmentState,
      participantId: user.participantId,
      timestampOfLastStateChange: user.timestampOfLastStateChange,
    };
  });

  const newUsers = allUserStates.filter(
    (item: userEnrollmentItem) => item.enrollmentState === "newUser"
  ).length;

  const earnedIn = allUserStates.filter(
    (item: userEnrollmentItem) => item.enrollmentState === "earnedIn"
  ).length;
  const earnedOut = allUserStates.filter(
    (item: userEnrollmentItem) =>
      item.enrollmentState === "earnedOutAcknowledged" ||
      item.enrollmentState === "earnedOutNoAcknowledge"
  ).length;
  const atRisk = allUserStates.filter((item: userEnrollmentItem) => {
    return item.enrollmentState === "atRisk";
  }).length;

  const userStates = {
    new_user: newUsers,
    earned_in: earnedIn,
    earned_out: earnedOut,
    at_risk: atRisk,
  };
  endLogging("getUserEnrollmentData", startTime);
  return userStates;
}

//TODO: #22 Rename this file and function to getAllNotesStatus
