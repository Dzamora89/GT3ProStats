<?php

class RaceResult
{
// DB Stuff
    private $conn;
    private string $table = 'raceResult';


    // Properties

    public int $raceResultID;
    public int $carID;
    public int $raceID;
    public int $totalTime;
    public int $laps;
    public int $pointScored;
    public int $eloChanged;


    public function __constructor($db): void
    {
        $this->conn = $db;
    }

    // Todo: Looks if it needs to get use
    public function getAllRaceResult()
    {
        //Create Query
        $query = 'SELECT * 
                  FROM ' . $this->table . '
                  ORDER BY raceResultID ASC';

        // Prepared Statement

        $stmt = $this->conn->prepare($query);

        // Execute Query
        $stmt->execute();
        return $stmt;
    }


    public function createRaceResult(): bool
    {
        $query = 'INSERT INTO ' . $this->table . ' 
        SET 
        carID = :carID, 
        raceID = :raceID, 
        totalTime = :totalTime, 
        laps = :laps,
        pointScored = :pointScored,
        eloChanged = :eloChanged';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data

        $this->carID = htmlspecialchars(strip_tags($this->carID));
        $this->raceID = htmlspecialchars(strip_tags($this->raceID));
        $this->totalTime = htmlspecialchars(strip_tags($this->totalTime));
        $this->laps = htmlspecialchars(strip_tags($this->laps));
        $this->pointScored = htmlspecialchars(strip_tags($this->pointScored));
        $this->eloChanged = htmlspecialchars(strip_tags($this->eloChanged));

        //Bind the dada
        $stmt->bindParam(':carID', $this->carID);
        $stmt->bindParam(':raceID', $this->raceID);
        $stmt->bindParam(':totalTime', $this->totalTime);
        $stmt->bindParam(':laps', $this->laps);
        $stmt->bindParam(':pointScored', $this->pointScored);
        $stmt->bindParam(':eloChanged', $this->eloChanged);

        //Execute Query

        if ($stmt->execute()) {
            return true;
        } else {
            //Print error
            printf("Error: %s. \n ", $stmt->error);
            return false;
        }
    }

    public function updateRaceResult(): bool
    {
        $query = 'UPDATE ' . $this->table . ' 
        SET 
        carID = :carID, 
        raceID = :raceID, 
        totalTime = :totalTime, 
        laps = :laps,
        pointScored = :pointScored,
        eloChanged = :eloChanged
        WHERE
        raceResultID = :raceResultID';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data
        $this->raceResultID = htmlspecialchars(strip_tags($this->raceResultID));
        $this->carID = htmlspecialchars(strip_tags($this->carID));
        $this->raceID = htmlspecialchars(strip_tags($this->raceID));
        $this->totalTime = htmlspecialchars(strip_tags($this->totalTime));
        $this->laps = htmlspecialchars(strip_tags($this->laps));
        $this->pointScored = htmlspecialchars(strip_tags($this->pointScored));
        $this->eloChanged = htmlspecialchars(strip_tags($this->eloChanged));

        //Bind the dada
        $stmt->bindParam(':raceResultID', $this->raceResultID);
        $stmt->bindParam(':carID', $this->carID);
        $stmt->bindParam(':raceID', $this->raceID);
        $stmt->bindParam(':totalTime', $this->totalTime);
        $stmt->bindParam(':laps', $this->laps);
        $stmt->bindParam(':pointScored', $this->pointScored);
        $stmt->bindParam(':eloChanged', $this->eloChanged);

        //Execute Query

        if ($stmt->execute()) {
            return true;
        } else {
            //Print error
            printf("Error: %s. \n ", $stmt->error);
            return false;
        }
    }

    // Get Single Object
    public function getRaceResultByID(): void
    {
        $query = 'SELECT * 
                  FROM ' . $this->table . '
                  WHERE raceResultID = :raceResultID';
        //Prepare Statement

        $stmt = $this->conn->prepare($query);

        //Bind ID

        $stmt->bindParam(':raceResultID', $this->raceResultID);

        // Execute Query
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        //SetProperties
        $this->raceResultID = $row['raceResultID'];
        $this->carID = $row['carID'];
        $this->raceID = $row['raceID'];
        $this->totalTime = $row['totalTime'];
        $this->laps = $row['laps'];
        $this->pointScored = $row['pointScored'];
        $this->eloChanged = $row['eloChanged'];


    }


    public function deleteRaceResult(): bool
    {

        //Create the Query
        $query = 'DELETE FROM ' . $this->table . '
                WHERE raceResultID = :raceResultID';
        //Prepare Statment
        $stmt = $this->conn->prepare($query);

        //Clean Data
        $this->raceResultID = htmlspecialchars(strip_tags($this->raceResultID));

        //Bind Data
        $stmt->bindParam(':raceResultID', $this->raceResultID);

        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
}