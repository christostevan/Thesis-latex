DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getAgentName_M70`(IN `ID` CHAR(5))
BEGIN
    SELECT `firstname`, `surname`
    FROM `CEN_M70_V1`.`serviceagents`
    WHERE `agentId` = `ID`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getAllAgentNames_M70`()
BEGIN
    SELECT `agentId`, `firstname`, `surname`
    FROM `CEN_M70_V1`.`serviceagents`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getAllComponentsAndAmoutOfCyclesSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN 
    SELECT `compType`, SUM(`nCycles`) AS nCycles_sum
    FROM `CEN_M70_V1`.`component`
    WHERE `machineID` = `ID`
    GROUP BY `compType`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getAllPresetsNamesMachines_M70`()
BEGIN
SELECT  `presetHash`,  `machineId`,  `name` FROM `cen_m70_v1`.`preset` ORDER BY `machineId` ASC, `name`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getAllPresetsSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN 
	SELECT * 
    FROM `CEN_M70_V1`.`Preset`
    WHERE `machineId` = `ID`
    ORDER BY `name` ASC; 
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getAllServiceIdsFromMachineId_M70`(
	IN `ID` CHAR(8)
)
BEGIN
	SELECT `serviceId`
    FROM `CEN_M70_V1`.`service` 
    WHERE `machineId` = `ID`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getAmountOfOverWeightsSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN 
	SELECT `machineId`, SUM(`nDiffs` - `allowedDiff`) AS amount_of_over_weight
    FROM `CEN_M70_V1`.`productionData` 
    WHERE `nDiffs` > `allowedDiff`
    AND `machineId` = `ID`
    GROUP BY `machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getAmountOfTimeScaleNotEmptySpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN
	SELECT TIME_TO_SEC(TIMEDIFF(ma.`updatedAt`, ma.`createdAt`))/60 AS `time_in_mins`
    FROM `CEN_M70_V1`.`machineactivity` ma
    JOIN `CEN_M70_V1`.`WeighingUnit` w 
    ON ma.`activityId` = w.`activityId`
    WHERE ma.`machineId` = `ID`
    AND nScaleNotEmpty <> 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getBagsDumpedWithPresetSpecificMachine_M70`(
	IN `ID` CHAR(8),
	IN `hash` LONGTEXT
)
BEGIN
    SELECT `presetHash`, COUNT(`bagCounter`) AS bag_count
    FROM `CEN_M70_V1`.`pd_bagger` p
    JOIN `CEN_M70_V1`.`preset` pr
    ON p.`machineId` = pr.`machineId`
    WHERE pr.`machineId` = `ID` AND pr.presetHash = `hash`
    GROUP BY pr.`presetHash`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getBPMSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN
    SELECT SUM(`ProductionData`.`nDumps`) AS `bags`, SUM(TIME_TO_SEC(TIMEDIFF(`MachineActivity`.`updatedAt`, `MachineActivity`.`createdAt`))/60) AS `minutes`
	FROM `CEN_M70_V1`.`MachineActivity` 
	JOIN `CEN_M70_V1`.`ProductionData` 
    ON `MachineActivity`.`machineId` = `ProductionData`.`machineId`
	WHERE `MachineActivity`.`activityId` = `ProductionData`.`activityId` 
    AND `MachineActivity`.`machineId` = `ID`
	AND `MachineActivity`.`activityType` = "production";


END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getCountStoppedBecauseOfErrorSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN
SELECT activityId, COUNT(*) AS total_number FROM `CEN_M70_V1`.`productiondata` p 
	JOIN `CEN_M70_V1`.`error` e
	ON p.`machineId` = e.`machineId`
	WHERE p.`machineId` = `ID`
	AND `eCode` <> 0
	GROUP BY activityId;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getDetailsOfProductionSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN 
	SELECT *
    FROM `CEN_M70_V1`.`productiondata` 
    WHERE `machineID` = `ID`
    ORDER BY createdAt desc;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getDetectedNumberOfDifferencepecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN
	SELECT `unitId`, `nDiffs`
    FROM `CEN_M70_V1`.`productionData` p 
    JOIN `CEN_M70_V1`.`weighingunit` d
    ON p.`machineId` = d.`machineId`
    WHERE p.`machineId` = `ID` AND `nDiffs` <> 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getDiffsSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN
	SELECT *
    FROM `CEN_M70_V1`.`ProductionData` 
    WHERE `machineId` = `ID`
    ORDER BY createdAt DESC;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getDumpedWeightsWithPreset_M70`(
	IN `ID` CHAR(8),
	IN `hash` LONGTEXT
)
BEGIN 
	SELECT pd.`presetHash`, SUM(`tdumpedWeight`) AS `tdumpedWeight`
    FROM `CEN_M70_V1`.`productionData` pd
    JOIN `CEN_M70_V1`.`preset`p
    ON p.`machineId` = pd.`machineId`
    WHERE pd.`machineId` = `ID` AND pd.`presetHash` = `hash`
    GROUP BY pd.`presetHash`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getErrorDescriptionSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN 
	SELECT *
    FROM `CEN_M70_V1`.`error` 
    WHERE `Error`.`machineID` = `ID`
    ORDER BY `createdAt` ASC;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getErrorTimestampSpecificMachineByECode`(
	IN `ID` CHAR(8),
	IN `CODE` INT
)
BEGIN
	SELECT e.createdAt 
	FROM `error` e 
	WHERE e.machineId = `ID` 
	AND e.eCode = `CODE`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getHowMuchBagsToGoIntoWhichBaggerSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN
	SELECT  `baggerN`, SUM(`bagCounter`) AS `how_much_bags`
    FROM `CEN_M70_V1`.`pd_bagger` 
    WHERE `machineId` = `ID`
    GROUP BY `baggerN`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getHowMuchWeightsToGoIntoWhichBaggerSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN
	SELECT `baggerN`, SUM(`tDumpedWeight`) AS tdumpedWeight_sum
    FROM `CEN_M70_V1`.`pd_bagger` pd
    JOIN `CEN_M70_V1`.`productiondata` pr
    ON pd.`machineId` = pr.`machineId`
    WHERE pd.`machineId` = `ID`
    GROUP BY `baggerN`
    ORDER BY `baggerN`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getLastActivitySpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN 
	SELECT `machineId`, `updatedAt` AS last_time_used 
    FROM `CEN_M70_V1`.`machineactivity`
    WHERE machineId = ID
    ORDER BY `updatedAt` DESC
    LIMIT 1; 
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getLastOccuredError_M70`(
	IN `ID` CHAR(8)
)
BEGIN 
    SELECT DISTINCT p.createdAt AS time_stamp, e.eCode, d.`description` 
	 FROM `CEN_M70_V1`.`productiondata` p 
	 JOIN `CEN_M70_V1`.`error` e
	 ON p.`machineId` = e.`machineId`
	 JOIN `CEN_M70_V1`.`errordescription` d
	 ON e.eCode = d.eCode
	 WHERE p.`machineId` = `ID`
	 AND e.eCode <> 0
	 AND e.`function` <> "void Weigher::reset()"
	 AND e.`function` <> "virtual bool I_SubSystem::resetActions()"
	 ORDER BY time_stamp DESC
	 LIMIT 1;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getLastSyncSpecificMachine_M70`(IN `ID` CHAR(8))
BEGIN 
	SELECT `machineId`, `lastSync`
    FROM `CEN_M70_V1`.`machine` 
    WHERE `machineID` = `ID`
    ORDER BY `lastSync` DESC
    LIMIT 1;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getListOfProductionRunsSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN 
	SELECT *
    FROM `CEN_M70_V1`.`productiondata` 
    WHERE `machineID` = `ID`
    ORDER BY createdAt DESC;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getMachineActivityByMachineId`(
	IN `machineIdParam` CHAR(8)
)
BEGIN
 SELECT *
    FROM `CEN_M70_V1`.`machineactivity`
    WHERE `machineId` = `machineIdParam`
    ORDER BY `createdAt` DESC ;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getMaintenanceOverviewSpecificMAchine_M70`(IN `ID` CHAR(8))
BEGIN 
	SELECT * 
    FROM `CEN_M70_V1`.`Service` 
    WHERE `machineID` = `ID`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getMostUsedPresetsSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN
    SELECT p.name AS preset_name, pd.presetHash, COUNT(*) AS times_used
    FROM `CEN_M70_V1`.`productiondata` pd
    INNER JOIN `preset` p ON p.presetHash = pd.presetHash
    WHERE pd.`machineID` = `ID` AND pd.presetHash <> ""
    GROUP BY pd.presetHash, p.name
    ORDER BY times_used DESC
    LIMIT 5;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getNumberOfTimesPresetIsRunSpecificMachine_M70`(
	IN `ID` CHAR(8),
	IN `hash` LONGTEXT
)
BEGIN 
	SELECT COUNT(*) AS times_used
    FROM `CEN_M70_V1`.`productiondata` 
    WHERE `machineID` = `ID`
    AND `presetHash` = `hash`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getOccuredErrorsWithPresetSpecificMachine_M70`(
	IN `ID` CHAR(8),
	IN `hash` LONGTEXT
)
BEGIN 
	SELECT e.`errorId`, e.`eCode`, p.`presetHash`, e.`description`, `severity`, `function`
    FROM `CEN_M70_V1`.`error` e
    JOIN `CEN_M70_V1`.`preset` p 
    ON e.`machineId` = p.`machineId`
    WHERE e.`machineId` = `ID` AND p.presetHash = `hash`; 
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getPresetDetailsSpecificMachineSpecificPreset_M70`(
	IN `ID` CHAR(8),
	IN `hash` LONGTEXT
)
BEGIN
    SELECT *
    FROM `CEN_M70_V1`.`Preset`
    WHERE `machineId` = `ID` AND `presetHash` = `hash`
    ORDER BY `presetHash` ASC;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getPresetDuringErrorTimeStamp`(
	IN `ID` CHAR(8),
	IN `TIME` TIMESTAMP
)
BEGIN
	SELECT p.presetHash, p.createdAt
  	FROM `cen_m70_v1`.preset p
  	WHERE p.machineId = `ID`
   AND p.createdAt <= `TIME`
  	ORDER BY p.createdAt DESC LIMIT 1;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getProductionDataByMachineId`(
	IN `machineIdParam` CHAR(8)
)
BEGIN
    SELECT *
    FROM `CEN_M70_V1`.`productiondata`
    WHERE `machineId` = `machineIdParam`
    ORDER BY `createdAt` DESC;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getProductionDataJoinMachineActivityDataOfPreset_M70_Overview`()
BEGIN
SELECT t.`machineId`, t.`presethash`, t.`nDumps`, t.`tDumpedWeight`, t.`totalCounter`, t.`run-started`, t.`run-finished`
	FROM (
		SELECT pd.`machineId`, pd.`presethash`, pd.`nDumps`, pd.`tDumpedWeight`, pd.`totalCounter`, 
		       ma.`createdAt` AS `run-started`, ma.`updatedAt` AS `run-finished`, 
		       ROW_NUMBER() OVER (PARTITION BY pd.`machineId` ORDER BY ma.`updatedAt` DESC) as rn
		FROM `CEN_M70_V1`.`productiondata` pd
		JOIN `cen_m70_v1`.`machineactivity` ma ON pd.`machineId` = ma.`machineId` AND pd.`createdAt` = ma.`updatedAt`
		WHERE pd.`presethash` IS NOT NULL AND pd.`presethash` <> ''
	) t
	WHERE t.rn <= 15
	ORDER BY t.`machineId`, t.`run-finished` DESC;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getServiceComponentSpecificMachine_M70`(IN `ID` CHAR(8))
BEGIN
	SELECT *
    FROM `CEN_M70_V1`.`servicecomponent` 
    WHERE `machineId` = `ID`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getServices`()
BEGIN
	SELECT s.serviceId, s.machineId, s.serviceAgent, s.serviceDescription, s.createdAt, sc.compN, sc.compType FROM `cen_m70_v1`.`service` s
	JOIN `cen_m70_v1`.`servicecomponent` sc WHERE s.serviceId = sc.serviceId;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getSpecificWeighterByNumbers_M70`(IN `ID` CHAR(8))
BEGIN
	SELECT *
    FROM `CEN_M70_V1`.`Machine` 
    WHERE `machineId` = `ID`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getSpecificWeighterByTypes_M70`(IN `type` VARCHAR(30))
BEGIN
	SELECT *
    FROM `CEN_M70_V1`.`Machine` 
    WHERE `machineType` = `type`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getStoppedBecauseErrorSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN 
    SELECT DISTINCT p.createdAt AS time_stamp, e.eCode, d.`description` 
	 FROM `CEN_M70_V1`.`productiondata` p 
	 JOIN `CEN_M70_V1`.`error` e
	 ON p.`machineId` = e.`machineId`
	 JOIN `CEN_M70_V1`.`errordescription` d
	 ON e.eCode = d.eCode
	 WHERE p.`machineId` = `ID`
	 AND e.eCode <> 0
	 AND e.`function` <> "void Weigher::reset()"
	 AND e.`function` <> "virtual bool I_SubSystem::resetActions()"
	 ORDER BY time_stamp DESC
	 LIMIT 15;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getStoppedNotBecauseOfErrorSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN 
   SELECT DISTINCT activityId, presetHash, eCode, e.`function`, p.createdAt AS time_stamp
   FROM `CEN_M70_V1`.`productiondata` p 
   JOIN `CEN_M70_V1`.`error` e
   ON p.`machineId` = e.`machineId`
   WHERE p.`machineId` = `ID`
   AND eCode = 0
   ORDER BY time_stamp DESC
   LIMIT 5;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTargetWeightpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN 
	SELECT `machineId`, SUM(`targetWeight`) AS targetWeight_sum
    FROM `CEN_M70_V1`.`Preset`
    WHERE `machineId` = ID
    GROUP BY `machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTimeStoppedOnFeedDelaySpecificMachine`(
	IN `ID` CHAR(8)
)
BEGIN 
    SELECT m.`machineId`, COUNT(m.`machineId`) AS time_stopped
    FROM `CEN_M70_V1`.`productiondata` p 
    JOIN `CEN_M70_V1`.`machineactivity` m ON p.`machineId` = m.`machineId`
    WHERE p.`machineId` = 'ID'
	 AND p.feedDelay <> 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalBagsDumped_M70_showOvertime`()
BEGIN
    SELECT `machineId`, SUM(`bagCounter`) AS `bagsDumped`
    FROM `CEN_M70_V1`.`pd_bagger`
    GROUP BY `machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalBagsDumpedJoinMachineType_M70`()
BEGIN
    SELECT pb.`machineId` AS `machineId`, m.`machineType` AS `machineType`, SUM(pb.`bagCounter`) AS `bagsDumped`
    FROM `CEN_M70_V1`.`pd_bagger` pb
    JOIN `cen_m70_v1`.`machine` m ON pb.`machineId` = m.`machineId`
    GROUP BY pb.`machineId`, m.`machineType`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalBagsDumpedPerPreset_M70_showOvertime`()
BEGIN
    SELECT pr.`machineId`, `presetHash`, COUNT(`bagCounter`)
    FROM `CEN_M70_V1`.`pd_bagger` p
    JOIN `CEN_M70_V1`.`preset` pr
    ON p.`machineId` = pr.`machineId`
    GROUP BY pr.`machineId`, pr.`presetHash`
    ORDER BY `machineId` ASC;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalDumpedBagsSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN
	SELECT `machineId`, SUM(`bagCounter`) AS `bagCounter`
    FROM `CEN_M70_V1`.`PD_Bagger` 
    WHERE `machineId` = `ID`
    GROUP BY `machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalDumpedWeightSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN
	SELECT `machineId`, SUM(`tDumpedWeight`) as total_dumped_weight
    FROM `CEN_M70_V1`.`ProductionData` 
    WHERE `machineId` = `ID`
	 GROUP BY `machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalErrors_M70_showOvertime`()
BEGIN
    SELECT `machineId`, COUNT(`errorId`) AS `countedErrorId`
    FROM `CEN_M70_V1`.`error`
    GROUP BY `machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalErrorsForEachOccuredError_M70_showOverTime`()
BEGIN
    SELECT `machineId`, `eCode`, COUNT(`errorId`) AS `countedErrorId`
    FROM `CEN_M70_V1`.`error`
    GROUP BY `eCode`, `machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalErrorsForEachOccuredErrorJoinMachineType_M70`()
BEGIN
  SELECT e.`machineId` AS `machineId`,m.`machineType` AS `machineType`, e.`eCode` AS `eCode`, COUNT(e.`errorId`) AS `countedErrorId`
    FROM `CEN_M70_V1`.`error` e
    JOIN `cen_m70_v1`.`machine` m ON e.`machineId` = m.`machineId`
    GROUP BY e.`machineId`, e.`eCode`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalErrorsForEachOccuredErrorPerPreset_M70_showOverTime`()
BEGIN
    SELECT e.`machineId`, `eCode`, COUNT(e.`errorId`)
    FROM `CEN_M70_V1`.`error` e
    JOIN `CEN_M70_V1`.`preset` p
    ON e.`machineId` = p.`machineId`
    GROUP BY `eCode`, `machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalErrorsJoinMachineType_M70`()
BEGIN
    SELECT e.`machineId` AS `machineId`, m.`machineType` AS `machineType`, COUNT(e.`errorId`) AS `countedErrorId`
    FROM `CEN_M70_V1`.`error` e
    JOIN `cen_m70_v1`.`machine` m ON e.`machineId` = m.`machineId`
    GROUP BY e.`machineId`, m.`machineType`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalErrorsPerPreset_M70_showOvertime`()
BEGIN
    SELECT e.`machineId`, p.`presetHash`, COUNT(`errorId`)
    FROM `CEN_M70_V1`.`error` e
    JOIN  `CEN_M70_V1`.`preset` p
    ON e.`machineId` = p.`machineId`
    GROUP BY p.`presetHash`, e.`machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalPresetTimeSpecificMachine_M70`(
	IN `ID` CHAR(8),
	IN `hash` LONGTEXT
)
BEGIN 
	-- SELECT SEC_TO_TIME(SUM(TIME_TO_SEC())) 
    SELECT p.`presetHash`, SUM(TIME_TO_SEC(TIMEDIFF(ma.`createdAt`, ma.`updatedAt`)))/3600 AS `hours`
    FROM `CEN_M70_V1`.`machineActivity` ma 
    JOIN `CEN_M70_V1`.`preset` p 
    ON ma.`machineId` = p.`machineId`
    WHERE ma.`machineId` = `ID` AND p.`presetHash` = `hash`
    GROUP BY p.presetHash;

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalTimeRun_M70_showOvertime`()
BEGIN
    SELECT `machineId`, MIN(`createdAt`) `createdAt`, MAX(`updatedAt`) `updatedAt`
    FROM `CEN_M70_V1`.`machineactivity`
    GROUP BY `machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalTimeRunPerPreset_M70_showOvertime`()
BEGIN
    SELECT pr.`machineId`, pr.`name`, pr.`presetHash`, m.`createdAt`, m.`updatedAt`
    FROM `CEN_M70_V1`.`machineactivity` m
    JOIN `CEN_M70_V1`.`preset` pr 
   ON pr.`machineId` = m.`machineId`
   JOIN (SELECT `machineId`, MAX(`updatedAt`) `updatedAt`, MIN(`createdAt`) `createdAt` FROM `CEN_M70_V1`.`machineactivity` GROUP BY `machineId`) m1
     ON m.`machineId` = m1.`machineId` AND m.`updatedAt` = m1.`updatedAt`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalTimeRunSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN
    SELECT MIN(`createdAt`) `createdAt`, MAX(`updatedAt`) `updatedAt`, TIMEDIFF(MAX(`updatedAt`), MIN(`createdAt`)) AS total_time
    FROM `CEN_M70_V1`.`machineactivity`
    WHERE `machineId` = `ID`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalTimeWithoutFeedDelaySpecificMachine`(IN `ID` CHAR(8))
BEGIN 
    SELECT m.`machineId`, m.`createdAt`, m.`updatedAt` 
    FROM `CEN_M70_V1`.`productiondata` p 
    JOIN `CEN_M70_V1`.`machineactivity` m ON p.`machineId` = m.`machineId`
    WHERE p.`machineId` = 'ID'
    AND p.`feedDelay` = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalWeightsDumped_M70_showOvertime`()
BEGIN
    SELECT `machineId`, SUM(`tDumpedWeight`) AS `dumpedWeight`
    FROM `CEN_M70_V1`.`productiondata`
    GROUP BY `machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalWeightsDumpedJoinMachineType_M70_showOverTime`()
BEGIN
    SELECT pd.`machineId` AS `machineId`, m.`machineType` AS `machineType`, SUM(pd.`tDumpedWeight`) AS `dumpedWeight`
    FROM `CEN_M70_V1`.`productiondata` pd
    JOIN `cen_m70_v1`.`machine` m ON pd.`machineId` = m.`machineId`
    GROUP BY pd.`machineId`, m.`machineType`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalWeightsDumpedperPreset_M70_showOvertime`()
BEGIN
    SELECT pr.`machineId`, pr.`presetHash`, SUM(`tDumpedWeight`)
    FROM `CEN_M70_V1`.`productiondata` p
    JOIN `CEN_M70_V1`.`preset` pr
    ON p.`machineId` = pr.`machineId`
    GROUP BY pr.`machineId`, pr.`presetHash`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getWaitForMoreScalesSpecificMachine_M70`(
	IN `ID` CHAR(8)
)
BEGIN
	SELECT SUM(`nWaitForMoreScales`) AS nWaitForMoreScales
    FROM `CEN_M70_V1`.`ProductionData` 
    WHERE `machineId` = `ID`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getWeighterID_M70`()
BEGIN
	SELECT `machineID` AS `Machine ID`, `machineType`
    FROM `CEN_M70_V1`.`Machine` 
    ORDER BY `machineID` ASC;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getWeighterTypes_M70`()
BEGIN
	SELECT `machineType` 
    FROM `CEN_M70_V1`.`Machine` 
    ORDER BY `machineType` ASC;
END$$
DELIMITER ;
