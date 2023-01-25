
CREATE DATABASE GT3Stats CHARACTER SET utf8 COLLATE utf8_general_ci;
USE GT3Stats;
CREATE TABLE Driver (
    driverID INTEGER UNSIGNED AUTO_INCREMENT,
    firstName VARCHAR(32) NOT NULL,
    lastName VARCHAR(32) NOT NULL,
    country VARCHAR(32) NOT NULL,
    dateOfBirth DATE,
    driverWebsite VARCHAR(64),
    driverTwitter VARCHAR(64),
    driverStatus VARCHAR(32),
    driverLicenseLevel VARCHAR(32),
    driverELO INTEGER, 
    CONSTRAINT Driver_PK PRIMARY KEY (driverID)
);
CREATE TABLE Team (
    teamID INTEGER UNSIGNED AUTO_INCREMENT,
    teamName VARCHAR(32) NOT NULL,
    teamOwner VARCHAR(32), 
    teamCountry VARCHAR(32),
    teamTwitter VARCHAR(32),
    teamWebsite VARCHAR(32),
    teamCarBrand VARCHAR(32),
    CONSTRAINT Team_PK PRIMARY KEY (teamID)
);
CREATE TABLE Car (
    carID INTEGER UNSIGNED AUTO_INCREMENT,
    manufacturer VARCHAR(32) NOT NULL ,
    number INTEGER NOT NULL,
    teamID INTEGER unsigned,
    class VARCHAR(32) NOT NULL,
    CONSTRAINT Car_PK PRIMARY KEY (carID),
    CONSTRAINT carID_teamID_FK FOREIGN KEY (teamID) REFERENCES Team (teamID)
);
CREATE TABLE Drives(
    driverID INTEGER UNSIGNED,
    carID INTEGER UNSIGNED,
    CONSTRAINT Drives_PK PRIMARY KEY (driverID, carID),
    CONSTRAINT driverID_FK FOREIGN KEY (driverID) REFERENCES Driver(driverID),
    CONSTRAINT carID_FK FOREIGN KEY (carID) REFERENCES Car(carID)
);
CREATE TABLE Championship(
    championshipID INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL ,
    season INTEGER NOT NULL ,
    country VARCHAR(32),
    website VARCHAR(32),
    twitter VARCHAR(32),
    facebook VARCHAR(32),
    youtube VARCHAR(32)
);
CREATE TABLE ChampionshipEntry(
    championshipEntryID INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
    championshipID INTEGER UNSIGNED,
    totalPoints INTEGER,
    position INTEGER,
    class VARCHAR(32),
    CONSTRAINT championshipID_FK FOREIGN KEY (championshipID) REFERENCES Championship(championshipID)
);
CREATE TABLE carClassification (
    championshipEntryID INTEGER UNSIGNED,
    carID INTEGER UNSIGNED,
    CONSTRAINT carClassification_PK PRIMARY KEY (carid,championshipentryid),
    CONSTRAINT championshipEntryID_Car_FK FOREIGN KEY (championshipEntryID) REFERENCES ChampionshipEntry(championshipEntryID),
    CONSTRAINT carID_Championship_FK FOREIGN KEY (carID) REFERENCES Car(carID)
);
CREATE TABLE driverClassification(
    championshipEntryID INTEGER UNSIGNED,
    driverID INTEGER UNSIGNED,
    CONSTRAINT driverClassification PRIMARY KEY (championshipEntryID,driverID),
    CONSTRAINT driverClassification_ChampionshipEntry_FK FOREIGN KEY (driverID) REFERENCES Driver(driverID),
    CONSTRAINT championshipEntry_diverClassification_FK FOREIGN KEY (championshipEntryID) REFERENCES ChampionshipEntry(championshipEntryID)
);
CREATE TABLE Race(
    raceID INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
    track VARCHAR(32) NOT NULL ,
    dateOfRace DATE,
    country VARCHAR(32) NOT NULL ,
    championshipID INTEGER UNSIGNED,
    CONSTRAINT race_Championship_FK FOREIGN KEY (championshipID) REFERENCES Championship(championshipID)
);
CREATE TABLE RaceResult(
    raceResultID INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
    carID INTEGER UNSIGNED,
    raceID INTEGER UNSIGNED,
    totalTime BIGINT,
    laps INTEGER,
    pointsScored INTEGER,
    eloChanged INTEGER,
    CONSTRAINT RaceResult_CarID_FK FOREIGN KEY (carID) REFERENCES Car(carID),
    CONSTRAINT RaceResult_RaceID_FK FOREIGN KEY (raceID) REFERENCES Race(raceID)
);
CREATE TABLE DriverScores (
    driverID INTEGER UNSIGNED,
    raceResultID INTEGER UNSIGNED,
    CONSTRAINT DriverScores_PK PRIMARY KEY (driverID,raceResultID),
    CONSTRAINT DriverID_RaceResultID_Fk FOREIGN KEY (driverID) REFERENCES Driver(driverID),
    CONSTRAINT RaceResultID_DriverID_FK FOREIGN KEY (raceResultID) REFERENCES RaceResult(raceResultID)
);