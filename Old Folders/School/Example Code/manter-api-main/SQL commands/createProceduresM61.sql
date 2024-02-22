DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getAllPresetsSpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN 
	SELECT * 
    FROM `CEN_M61_V1`.`Preset`
    WHERE `machineId` = `ID`
    ORDER BY `presetHash` ASC; 
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getAmountOfTimeScaleNotEmptySpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN
	SELECT ma.`updatedAt`, ma.`createdAt` 
    FROM `CEN_M61_V1`.`machineactivity` ma
    JOIN `CEN_M61_V1`.`WeighingUnit` w 
    ON ma.`activityId` = w.`activityId`
    WHERE ma.`machineId` = `ID`
    AND nScaleNotEmpty <> 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getBagsDumpedWithPresetSpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN 
	-- SELECT SEC_TO_TIME(SUM(TIME_TO_SEC())) 
    SELECT p.`machineId`, COUNT(`bagCounter`), pr.`presetHash`
    FROM `CEN_M61_V1t`.`pd_bagger` p
    JOIN `CEN_M61_V1t`.`preset` pr
    ON p.`machineId` = pr.`machineId`
    WHERE p.`machineId` = `ID`
    GROUP BY p.`machineId`, `presetHash`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getBPMSpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN
	-- SELECT ROUND(AVG(p.`nDumps` / (TIME_TO_SEC(timediff(m.`updatedAt`, m.`startDate`)) /60)), 1) as 'avgbpm'
    SELECT `ProductionData`.`nDumps`, `MachineActivity`.`updatedAt`, `MachineActivity`.`createdAt`
	FROM `CEN_M61_V1`.`MachineActivity` 
	JOIN `CEN_M61_V1`.`ProductionData` 
    ON `MachineActivity`.`machineId` = `ProductionData`.`machineId`
	WHERE `MachineActivity`.`activityId` = `ProductionData`.`activityId` 
	AND `MachineActivity`.`machineId` = `ProductionData`.`machineId`
    AND `MachineActivity`.`machineId` = `var`
	AND `MachineActivity`.`activityType` = "production";
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getDetectedNumberOfDifferencepecificMachine_M61`(IN `ID` CHAR(8), IN `baggerId` INT(10))
BEGIN
	SELECT `machineId`, `nDiffs`
    FROM `CEN_M61_V1`.`productionData` 
    WHERE `machineId` = `ID`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getDiffsSpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN
	SELECT `minDiff`, `maxDiff`, `nDiffs`, `nMaxDiff` 
    FROM `CEN_M61_V1`.`ProductionData` 
    WHERE `machineId` = `ID`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getDumpedWeightsWithPreset_M61`(IN `ID` CHAR(8))
BEGIN 
	SELECT `machineId`, SUM(`tdumpedWeight`), `presetHash`
    FROM `CEN_M61_V1`.`productionData`
    WHERE `machineId` = `ID`
    AND `presetHash` <> 0
    GROUP BY  `presetHash`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getErrorDescriptionSpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN 
    SELECT `Error`.`errorId`, `Error`.`createdAt`, `ErrorDescription`.`description`, `ErrorDescription`.`severity` FROM `CEN_M61_V1`.`Error`
    JOIN `ErrorDescription` ON `Error`.`errorDescriptionId` = `ErrorDescription`.`errorDescriptionId` WHERE `Error`.`machineId` = var 
    ORDER BY `Error`.`createdAt` DESC;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getHowMuchBagsToGoIntoWhichBaggerSpecificMachine_M61`(IN `ID` CHAR(8), IN `baggerId` INT(10))
BEGIN
	SELECT `machineId`, `baggerN`, SUM(`bagCounter`)
    FROM `CEN_M61_V1`.`pd_bagger` 
    WHERE `machineId` = `ID`
    GROUP BY `baggerN`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getHowMuchWeightsToGoIntoWhichBaggerSpecificMachine_M61`(IN `ID` CHAR(8), IN `baggerId` INT(10))
BEGIN
	SELECT `baggerN`, SUM(`tDumpedWeight`)
    FROM `CEN_M61_V1`.`pd_bagger` pd
    JOIN `CEN_M61_V1`.`productiondata` pr
    ON pd.`machineId` = pr.`machineId`
    WHERE pd.`machineId` = `ID`
    GROUP BY `baggerN`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getLastActivitySpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN 
	SELECT `machineId`, `lastSync` AS last_time_used 
    FROM `CEN_M61_V1`.`machine`
    WHERE machineId = ID
    ORDER BY `lastSync` DESC
    LIMIT 1; 
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getLastOccuredError_M61`(IN `ID` CHAR(8))
BEGIN 
	SELECT * 
    FROM `CEN_M61_V1`.`Error` 
    WHERE `Error`.`machineId` = `ID` AND
    `errorId` = (SELECT `errorId` FROM `Error` ORDER BY `createdAt` DESC LIMIT 1);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getLastSyncSpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN 
	SELECT `machineId`, `lastSync`
    FROM `CEN_M61_V1`.`machine` 
    WHERE `machineID` = `ID`
    ORDER BY `lastSync` DESC
    LIMIT 1;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getOccuredErrorsWithPresetSpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN 
	SELECT * 
    FROM `CEN_M61_V1`.`error` e
    JOIN `CEN_M61_V1`.`preset` p 
    ON e.`machineId` = p.`machineId`
    WHERE e.`machineId` = ID; 
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getProductionRunsSpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN 
	SELECT *
    FROM `CEN_M61_V1`.`productiondata` 
    WHERE `machineID` = `ID`
    ORDER BY `activityId` ASC;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getSpecificWeighterByNumbers_M61`(IN `ID` CHAR(8))
BEGIN
	SELECT *
    FROM `CEN_M61_V1`.`Machine` 
    WHERE `machineId` = `ID`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getSpecificWeighterByTypes_M61`(IN `type` VARCHAR(30))
BEGIN
	SELECT *
    FROM `CEN_M61_V1`.`Machine` 
    WHERE `machineType` = `type`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getStoppedBecauseErrorSpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN 
	SELECT * 
    FROM `CEN_M61_V1`.`productiondata` p 
    JOIN `CEN_M61_V1`.`error` e
    ON p.`machineId` = e.`machineId`
    WHERE p.`machineId` = `ID`
    AND e.`createdAt` = p.`createdAt`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getStoppedNotBecauseOfErrorSpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN 
	SELECT * 
    FROM `CEN_M61_V1`.`productiondata` p 
    JOIN `CEN_M61_V1`.`error` e
    ON p.`machineId` = e.`machineId`
    WHERE p.`machineId` = `ID`
    AND e.`createdAt` <> p.`createdAt`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTargetWeightSpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN 
	SELECT `machineId`, SUM(`targetWeight`) 
    FROM `CEN_M61_V1`.`Preset`
    WHERE `machineId` = ID
    GROUP BY `machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTimeStoppedOnFeedDelaySpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN 
    SELECT m.`machineId`, COUNT(m.`machineId`) AS time_stopped
    FROM `CEN_M61_V1`.`productiondata` p 
    JOIN `CEN_M61_V1`.`machineactivity` m ON p.`machineId` = m.`machineId`
    WHERE p.`machineId` = 'ID'
    AND p.`feedDelay` <> 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalBagsDumped_M61`()
BEGIN
    SELECT `machineId`, COUNT(`bagCounter`)
    FROM `CEN_M61_V1`.`pd_bagger`
    GROUP BY `machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalBagsDumpedPerPreset_M61`()
BEGIN
    SELECT pr.`machineId`, `presetHash`, COUNT(`bagCounter`)
    FROM `CEN_M61_V1`.`pd_bagger` p
    JOIN `CEN_M61_V1`.`preset` pr
    ON p.`machineId` = pr.`machineId`
    GROUP BY pr.`machineId`, pr.`presetHash`
    ORDER BY `machineId` ASC;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalDumpedBagsSpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN
	SELECT `machineId`, SUM(`baggerN`) 
    FROM `CEN_M61_V1`.`PD_Bagger` 
    WHERE `machineId` = `ID`
    GROUP BY `machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalDumpedWeightSpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN
	SELECT `machineId`, `tDumpedWeight` as total_dumped_weight
    FROM `CEN_M61_V1`.`ProductionData` 
    WHERE `machineId` = `ID`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalErrors_M61`()
BEGIN
    SELECT `machineId`, COUNT(`errorId`)
    FROM `CEN_M61_V1`.`error`
    GROUP BY `machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalErrorsPerPreset_M61`()
BEGIN
    SELECT p.`presetHash`, COUNT(`errorId`)
    FROM `CEN_M61_V1`.`error` e
    JOIN  `CEN_M61_V1`.`preset` p
    ON e.`machineId` = p.`machineId`
    GROUP BY p.`presetHash`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalPresetTimeSpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN 
	-- SELECT SEC_TO_TIME(SUM(TIME_TO_SEC())) 
    SELECT ma.`createdAt`, ma.`updatedAt`
    FROM `CEN_M61_V1`.`machineActivity` ma 
    JOIN `CEN_M61_V1`.`preset` p 
    ON ma.`machineId` = p.`machineId`
    WHERE `machineId` = `ID`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalTimeRun_M61`()
BEGIN
    -- SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(TIMESTAMPDIFF(SECOND, `createdAt`, `endDate`)))) AS total_time
    SELECT `createdAt`, `lastSync`
    FROM `CEN_M61_V1`.`machine`
    GROUP BY `machineId`; 
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalTimeRunPerPreset_M61`()
BEGIN
    SELECT pr.`presetHash`, m.`createdAt`, m.`updatedAt`
    FROM `CEN_M61_V1`.`machineactivity` m
    JOIN `CEN_M61_V1`.`preset` pr ON pr.`machineId` = m.`machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalTimeWithoutFeedDelaySpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN 
    SELECT m.`machineId`, m.`createdAt`, m.`updatedAt` 
    FROM `CEN_M61_V1`.`productiondata` p 
    JOIN `CEN_M61_V1`.`machineactivity` m ON p.`machineId` = m.`machineId`
    WHERE p.`machineId` = 'ID'
    AND p.`feedDelay` = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalWeightsDumped_M61`()
BEGIN
    SELECT `machineId`, COUNT(`tDumpedWeight`)
    FROM `CEN_M61_V1`.`productiondata`
    GROUP BY `machineId`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getTotalWeightsDumpedPerPreset_M61`()
BEGIN
    SELECT pr.`machineId`, pr.`presetHash`, COUNT(`tDumpedWeight`)
    FROM `CEN_M61_V1`.`productiondata` p
    JOIN `CEN_M61_V1`.`preset` pr
    ON p.`machineId` = pr.`machineId`
    GROUP BY pr.`machineId`, pr.`presetHash`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getWaitForMoreScalesSpecificMachine_M61`(IN `ID` CHAR(8))
BEGIN
	SELECT `nWaitForMoreScales` 
    FROM `CEN_M61_V1`.`ProductionData` 
    WHERE `machineId` = `ID`;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getWeighterID_M61`()
BEGIN
	SELECT `machineID` AS `Machine ID` 
    FROM `CEN_M61_V1`.`Machine` 
    ORDER BY `machineID` ASC;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`Manter`@`%` PROCEDURE `getWeighterTypes_M61`()
BEGIN
	SELECT `machineType` 
    FROM `CEN_M61_V1`.`Machine` 
    ORDER BY `machineType` ASC;
END$$
DELIMITER ;
