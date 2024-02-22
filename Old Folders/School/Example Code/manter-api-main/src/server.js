const express = require("express");
const db = require("./databaseM70");
const db_M61 = require("./databaseM61");
const app = express();
const port = 8080;
const cors = require("cors");
const moment = require("moment-timezone");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(express.json());

app.listen(port, () => {
  console.log("Server started on port: ", port);
});

const getEndPointM70 = (url, procedureName) => {
  app.get(url, async (req, res) => {
    try {
      //Extract id from url
      const id = req.query.id;
      const hash = req.query.hash;

      //Dynamically create SQL statement based on presens of "id" in GET request
      const rows = !!id
        ? await db.promise().execute("CALL " + procedureName + "(" + id + ")")
        : await db.promise().execute("CALL " + procedureName);

      //Return json result
      res.json(rows[0][0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" + err });
    }
  });
};

const getEndPointByHashM70 = (url, procedureName) => {
  app.get(url, async (req, res) => {
    try {
      //Extract id and hash from url
      const id = req.query.id;
      const hash = req.query.hash;

      //Dynamically create SQL statement based on presens of "id"  and "hash" in GET request
      const rows =
        !!id && !!hash
          ? await db
              .promise()
              .execute("CALL " + procedureName + "(" + id + ", " + hash + ")")
          : await db.promise().execute("CALL " + procedureName);

      //Return json result
      res.json(rows[0][0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" + err });
    }
  });
};

const getEndPointByIDAndCodeM70 = (url, procedureName) => {
  app.get(url, async (req, res) => {
    try {
      //Extract id and code from url
      const id = req.query.id;
      const code = req.query.code;

      const rows = await db
        .promise()
        .execute("CALL " + procedureName + "(" + id + ", " + code + ")");

      // Get the server's local timezone
      const serverTimezone = moment.tz.guess();

      // Format the timestamps in the desired format with timezone conversion
      const formattedRows = rows[0][0].map((row) => {
        const createdAt = moment(row.createdAt)
          .tz(serverTimezone)
          .format("YYYY-MM-DD HH:mm:ss");
        return { createdAt };
      });

      // Return json result
      res.json(formattedRows);

      //Return json result
      //res.json(rows[0][0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" + err });
    }
  });
};

const getEndPointByIDActivity = (url, procedureName) => {
  app.get(url, async (req, res) => {
    try {
      //Extract id and timestamp from url
      const id = req.query.id;

      const rows = await db
        .promise()
        .execute("CALL " + procedureName + "(" + id + ")");

      // Get the server's local timezone
      const serverTimezone = moment.tz.guess();

      // Format the timestamps in the desired format with timezone conversion
      const formattedRows = rows[0][0].map((row) => {
        row.createdAt = moment(row.createdAt)
          .tz(serverTimezone)
          .format("YYYY-MM-DD HH:mm:ss");
        row.updatedAt = moment(row.updatedAt)
          .tz(serverTimezone)
          .format("YYYY-MM-DD HH:mm:ss");
        return row;
      });

      // Return json result
      res.json(formattedRows);
      //Return json result
      //res.json(rows[0][0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" + err });
    }
  });
};

const getEndPointByIDAndTimeStampM70 = (url, procedureName) => {
  app.get(url, async (req, res) => {
    try {
      //Extract id and timestamp from url
      const id = req.query.id;
      const timestamp = req.query.timestamp;

      const rows = await db
        .promise()
        .execute("CALL " + procedureName + "(" + id + ", " + timestamp + ")");

      // Get the server's local timezone
      const serverTimezone = moment.tz.guess();

      // Format the timestamps in the desired format with timezone conversion
      const formattedRows = rows[0][0].map((row) => {
        const createdAt = moment(row.createdAt)
          .tz(serverTimezone)
          .format("YYYY-MM-DD HH:mm:ss");
        const presetHash = row.presetHash;
        return {
          presetHash,
          createdAt,
        };
      });

      // Return json result
      res.json(formattedRows);
      //Return json result
      //res.json(rows[0][0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" + err });
    }
  });
};

const getEndPointM61 = (url, procedureName) => {
  app.get(url, async (req, res) => {
    try {
      //Extract id from url
      const id = req.query.id;

      //Dynamically create SQL statement based on presens of "id" in GET request
      const rows = !!id
        ? await db_M61
            .promise()
            .execute("CALL " + procedureName + "(" + id + ")")
        : await db_M61.promise().execute("CALL " + procedureName);

      //Return json result
      res.json(rows[0][0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" + err });
    }
  });
};

//===============================================================================M70 Endpoints================================================================================

//Machine end points
getEndPointM70(
  "/M70/machine/most-used-presets",
  "getMostUsedPresetsSpecificMachine_M70"
);
getEndPointM70(
  "/M70/machine/components-and-cycles",
  "getAllComponentsAndAmoutOfCyclesSpecificMachine_M70"
);
getEndPointM70("/M70/machine/presets", "getAllPresetsSpecificMachine_M70");
getEndPointM70(
  "/M70/machine/time-of-non-empty-scale",
  "getAmountOfTimeScaleNotEmptySpecificMachine_M70"
);
getEndPointM70("/M70/machine/bpm", "getBPMSpecificMachine_M70");
getEndPointM70(
  "/M70/machine/production-details",
  "getDetailsOfProductionSpecificMachine_M70"
);
getEndPointM70(
  "/M70/machine/number-of-differences-detected",
  "getDetectedNumberOfDifferencepecificMachine_M70"
);
getEndPointM70("/M70/machine/diffs", "getDiffsSpecificMachine_M70");
getEndPointM70(
  "/M70/machine/error-description",
  "getErrorDescriptionSpecificMachine_M70"
);
getEndPointM70(
  "/M70/machine/amount-of-bags-in-baggers",
  "getHowMuchBagsToGoIntoWhichBaggerSpecificMachine_M70"
);
getEndPointM70(
  "/M70/machine/amount-of-weights-in-baggers",
  "getHowMuchWeightsToGoIntoWhichBaggerSpecificMachine_M70"
);
getEndPointM70(
  "/M70/machine/last-activity",
  "getLastActivitySpecificMachine_M70"
);
getEndPointM70("/M70/machine/last-error", "getLastOccuredError_M70");
getEndPointM70("/M70/machine/last-sync", "getLastSyncSpecificMachine_M70");
getEndPointM70(
  "/M70/machine/production-runs",
  "getListOfProductionRunsSpecificMachine_M70"
);
getEndPointM70(
  "/M70/machine/maintenence-overview",
  "getMaintenanceOverviewSpecificMAchine_M70"
);
getEndPointM70(
  "/M70/machine/occured-errors-with-preset",
  "getOccuredErrorsWithPresetSpecificMachine_M70"
);
getEndPointM70(
  "/M70/machine/stopped/because-error",
  "getStoppedBecauseErrorSpecificMachine_M70"
);
getEndPointM70(
  "/M70/machine/stopped/not-because-error",
  "getStoppedNotBecauseOfErrorSpecificMachine_M70"
);
getEndPointM70(
  "/M70/machine/stopped/on-feed-delays",
  "getTimeStoppedOnFeedDelaySpecificMachine"
);
getEndPointM70("/machine/target-weight", "getTargetWeightpecificMachine_M70");
getEndPointM70(
  "/M70/machine/wait-for-more-scales-time",
  "getWaitForMoreScalesSpecificMachine_M70"
);
getEndPointM70(
  "/M70/machine/amount-of-overweights",
  "getAmountOfOverWeightsSpecificMachine_M70"
);
getEndPointM70(
  "/M70/machine/total/bags-dumped",
  "getTotalDumpedBagsSpecificMachine_M70"
);
getEndPointM70(
  "/M70/machine/total/weight-dumped",
  "getTotalDumpedWeightSpecificMachine_M70"
);
getEndPointM70(
  "/M70/machine/total/time-without-feed-delay",
  "getTotalTimeWithoutFeedDelaySpecificMachine"
);
getEndPointM70(
  "/M70/machine/total/time-run",
  "getTotalTimeRunSpecificMachine_M70"
);
getEndPointM70("/M70/machine/services", "getServices");

getEndPointM70("/M70/machine/service-ids", 
"getAllServiceIdsFromMachineId_M70");

getEndPointM70("/M70/machine/agents", 
"getAgentName_M70");

getEndPointM70("/M70/machine/all-agents", 
"getAllAgentNames_M70");

getEndPointM70("/M70/machine/components", 
"getComponents_M70");

getEndPointByIDAndTimeStampM70(
  "/M70/machine/preset-during-error",
  "getPresetDuringErrorTimeStamp"
);

getEndPointByIDAndCodeM70(
  "/M70/machine/errors/error-timestamp",
  "getErrorTimestampSpecificMachineByECode"
);

getEndPointByIDActivity(
  "/M70/machine/activities",
  "getMachineActivityByMachineId"
);

getEndPointM70("/M70/machine/productiondata", "getProductionDataByMachineId");

//Preset specific
getEndPointByHashM70(
  "/M70/machine/total/preset-time",
  "getTotalPresetTimeSpecificMachine_M70"
);
getEndPointByHashM70(
  "/M70/machine/total/dumped-weights-with-preset",
  "getDumpedWeightsWithPreset_M70"
);
getEndPointByHashM70(
  "/M70/machine/presetDetails",
  "getPresetDetailsSpecificMachineSpecificPreset_M70"
);
getEndPointByHashM70(
  "/M70/M70/machine/bags-dumped-with-preset",
  "getBagsDumpedWithPresetSpecificMachine_M70"
);
getEndPointByHashM70(
  "/M70/machine/no-of-times-preset-run",
  "getNumberOfTimesPresetIsRunSpecificMachine_M70"
);

getEndPointByHashM70(
"/M70/machine/preset-names-machines",
"getAllPresetsNamesMachines_M70"
);

//Totals
getEndPointM70("/M70/total/bags-dumped", "getTotalBagsDumped_M70_showOvertime");
getEndPointM70(
  "/M70/total/bags-dumped-per-preset",
  "getTotalBagsDumpedPerPreset_M70_showOvertime"
);
getEndPointM70(
  "/M70/total/weights-dumped",
  "getTotalWeightsDumped_M70_showOvertime"
);
getEndPointM70(
  "/M70/total/weights-dumped-per-preset",
  "getTotalWeightsDumpedperPreset_M70_showOvertime"
);
getEndPointM70("/M70/total/errors", "getTotalErrors_M70_showOvertime");
getEndPointM70(
  "/M70/total/errors/per-preset",
  "getTotalErrorsPerPreset_M70_showOvertime"
);
getEndPointM70(
  "/M70/total/errors/error",
  "getTotalErrorsForEachOccuredError_M70_showOverTime"
);
getEndPointM70(
  "/M70/total/errors/error-per-preset",
  "getTotalErrorsForEachOccuredErrorPerPreset_M70_showOverTime"
);
getEndPointM70("/M70/total/time-run", "getTotalTimeRun_M70_showOvertime");
getEndPointM70(
  "/M70/total/time-run-per-preset",
  "getTotalTimeRunPerPreset_M70_showOvertime"
);

getEndPointM70(
  "/M70/total/prod-mach-activity-data",
  "getProductionDataJoinMachineActivityDataOfPreset_M70_Overview"
);

getEndPointM70(
  "/M70/total/bags-dumped-with-machineType",
  "getTotalBagsDumpedJoinMachineType_M70"
);
getEndPointM70(
  "/M70/total/weights-dumped-with-machineType",
  "getTotalWeightsDumpedJoinMachineType_M70_showOverTime"
);
getEndPointM70(
  "/M70/total/errors-with-machineType",
  "getTotalErrorsJoinMachineType_M70"
);
getEndPointM70(
  "/M70/total/errors/error-with-machineType",
  "getTotalErrorsForEachOccuredErrorJoinMachineType_M70"
);

//Weighters
getEndPointM70("/M70/weighter/types", "getWeighterTypes_M70");
getEndPointM70("/M70/weighter/ids", "getWeighterID_M70");
getEndPointM70("/M70/weighter/byNumber", "getSpecificWeighterByNumbers_M70");
getEndPointM70("/M70/weighter/byType", "getSpecificWeighterByTypes_M70");

//===============================================================================M61 Endpoints================================================================================

//Machine
getEndPointM61("/M61/machine/presets", "getAllPresetsSpecificMachine_M61");
getEndPointM61(
  "/M61/machine/time-of-non-empty-scale",
  "getAmountOfTimeScaleNotEmptySpecificMachine_M61"
);
getEndPointM61(
  "/M61/machine/bags-dumped-with-preset",
  "getBagsDumpedWithPresetSpecificMachine_M61"
);
getEndPointM61("/M61/machine/bpm", "getBPMSpecificMachine_M61");
getEndPointM61(
  "/M61/machine/detected-number-of-diff",
  "getDetectedNumberOfDifferencepecificMachine_M61"
);
getEndPointM61("/M61/machine/diffs", "getDiffsSpecificMachine_M61");
getEndPointM61(
  "/M61/machine/dumped-weights-with-preset",
  "getDumpedWeightsWithPreset_M61"
);
getEndPointM61(
  "/M61/machine/error-description",
  "getErrorDescriptionSpecificMachine_M61"
);
getEndPointM61(
  "/M61/machine/amounts-of-bags-in-bagger",
  "getHowMuchBagsToGoIntoWhichBaggerSpecificMachine_M61"
);
getEndPointM61(
  "/M61/machine/amounts-of-weights-in-bagger",
  "getHowMuchWeightsToGoIntoWhichBaggerSpecificMachine_M61"
);
getEndPointM61(
  "/M61/machine/last-activity",
  "getLastActivitySpecificMachine_M61"
);
getEndPointM61("/M61/machine/last-error", "getLastOccuredError_M61");
getEndPointM61("/M61/machine/last-sync", "getLastOccuredError_M61");
getEndPointM61(
  "/M61/machine/occured-errors-with-preset",
  "getOccuredErrorsWithPresetSpecificMachine_M61"
);
getEndPointM61(
  "/M61/machine/production-runs",
  "getProductionRunsSpecificMachine_M61"
);
getEndPointM61(
  "/M61/machine/stopped/because-error",
  "getStoppedBecauseErrorSpecificMachine_M61"
);
getEndPointM61(
  "/M61/machine/stopped-not-because-error",
  "getStoppedNotBecauseOfErrorSpecificMachine_M61"
);
getEndPointM61(
  "/M61/stopped/on-feed-delay",
  "getTimeStoppedOnFeedDelaySpecificMachine_M61  "
);
getEndPointM61(
  "/M61/machine/target-weight",
  "getTargetWeightSpecificMachine_M61"
);
getEndPointM61(
  "/M61/machine/wait-for-more-scales-time",
  "getWaitForMoreScalesSpecificMachine_M61"
);
getEndPointM61(
  "/M61/machine/total/bags-dumped",
  "getTotalDumpedBagsSpecificMachine_M61"
);
getEndPointM61(
  "/M61/machine/total/weight-dumped",
  "getTotalDumpedWeightSpecificMachine_M61"
);
getEndPointM61(
  "/M61/machine/total/time-without-feed-delay",
  "getTotalTimeWithoutFeedDelaySpecificMachine_M61"
);

//Totals
getEndPointM61("/M61/total/bags-dumped", "getTotalBagsDumped_M61");
getEndPointM61(
  "/M61/total/bags-dumped-per-preset",
  "getTotalBagsDumpedPerPreset_M61"
);
getEndPointM61("/M61/total/weights-dumped", "getTotalWeightsDumped_M61");
getEndPointM61(
  "/M61/total/weights-dumped-per-preset",
  "getTotalWeightsDumpedPerPreset_M61"
);
getEndPointM61("/M61/total/errors", "getTotalErrors_M61");
getEndPointM61("/M61/total/errors/per-preset", "getTotalErrorsPerPreset_M61");
getEndPointM61("/M61/total/time-run", "getTotalTimeRun_M61");
getEndPointM61(
  "/M61/total/time-run-per-preset",
  "getTotalTimeRunPerPreset_M61"
);

//Weighters
getEndPointM61("/M61/weighter/types", "getWeighterTypes_M61");
getEndPointM61("/M61/weighter/ids", "getWeighterID_M61");
getEndPointM61("/M61/weighter/byNumber", "getSpecificWeighterByNumbers_M61");
getEndPointM61("/M61/weighter/byType", "getSpecificWeighterByTypes_M61");
