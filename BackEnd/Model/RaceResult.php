<?php

class RaceResult
{
// DB Stuff
    private $conn;
    private string $table = 'raceResult';


    // Properties

    public  $raceResultID;
    public  $raceResultCarID;
    public  $raceresultRaceID;
    public  $raceResultDriverID;
    public  $raceresultGap;
    public  $raceresultLaps;
    public  $raceresultPointsScored;
    public  $raceresultEloChanged;
    public  $raceresultPosition;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Todo: Looks if it needs to get use
    public function getAllRaceResult()
    {
        //Create Query
        $query = 'SELECT * 
                  FROM raceresult join race r on raceresult.raceresultRaceID = r.raceID
                  join championship c on c.championshipID = r.raceChampionshipID
                  ORDER BY raceDateOfRace desc ';

        // Prepared Statement

        $stmt = $this->conn->prepare($query);

        // Execute Query
        $stmt->execute();
        return $stmt;
    }


    public function createRaceResult(): bool
    {
        $query = 'INSERT INTO raceresult (
                        raceresultCarID,
                        raceresultRaceID,
                        raceresultDriverID,
                        raceresultGap,
                        raceresultLaps,
                        raceresultPointsScored,
                        raceresultEloChanged,
                        raceresultPosition
                        ) values (
                        :raceresultCarID,
                        :raceresultRaceID,
                        :raceresultDriverID,
                        :raceresultGap,
                        :raceresultLaps,
                        :raceresultPointsScored,
                        :raceresultEloChanged,
                        :raceresultPosition
                        ) ';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data

        $this->raceResultCarID = htmlspecialchars(strip_tags($this->raceResultCarID));
        $this->raceresultRaceID = htmlspecialchars(strip_tags($this->raceresultRaceID));
        $this->raceResultDriverID = htmlspecialchars(strip_tags($this->raceResultDriverID));
        $this->raceresultGap = htmlspecialchars(strip_tags($this->raceresultGap));
        $this->raceresultLaps = htmlspecialchars(strip_tags($this->raceresultLaps));
        $this->raceresultPointsScored = htmlspecialchars(strip_tags($this->raceresultPointsScored));
        $this->raceresultEloChanged = htmlspecialchars(strip_tags($this->raceresultEloChanged));
        $this->raceresultPosition = htmlspecialchars(strip_tags($this->raceresultPosition));

        //Bind the dada
        $stmt->bindParam(':raceresultCarID', $this->raceResultCarID);
        $stmt->bindParam(':raceresultRaceID', $this->raceresultRaceID);
        $stmt->bindParam(':raceresultDriverID', $this->raceResultDriverID);
        $stmt->bindParam(':raceresultGap', $this->raceresultGap);
        $stmt->bindParam(':raceresultLaps', $this->raceresultLaps);
        $stmt->bindParam(':raceresultPointsScored', $this->raceresultPointsScored);
        $stmt->bindParam(':raceresultEloChanged', $this->raceresultEloChanged);
        $stmt->bindParam(':raceresultPosition', $this->raceresultPosition);

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
        $query = 'UPDATE raceresult 
        SET 
        raceresultGap = :raceresultGap, 
        raceResultLaps = :raceResultLaps,
        raceresultPointsScored = :raceResultPointScored,
        raceResultEloChanged = :raceResultEloChanged,
        raceresultPosition = :raceresultPosition
        WHERE
        raceResultID = :raceResultID';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data
        $this->raceResultID = htmlspecialchars(strip_tags($this->raceResultID));
        $this->raceResultCarID = htmlspecialchars(strip_tags($this->raceResultCarID));
        $this->raceresultRaceID = htmlspecialchars(strip_tags($this->raceresultRaceID));
        $this->raceResultDriverID = htmlspecialchars(strip_tags($this->raceResultDriverID));
        $this->raceresultGap = htmlspecialchars(strip_tags($this->raceresultGap));
        $this->raceresultLaps = htmlspecialchars(strip_tags($this->raceresultLaps));
        $this->raceresultPointsScored = htmlspecialchars(strip_tags($this->raceresultPointsScored));
        $this->raceresultEloChanged = htmlspecialchars(strip_tags($this->raceresultEloChanged));
        $this->raceresultPosition = htmlspecialchars(strip_tags($this->raceresultPosition));

        //Bind the dada
        $stmt->bindParam(':raceResultID', $this->raceResultID);
        $stmt->bindParam(':raceresultGap', $this->raceresultGap);
        $stmt->bindParam(':raceResultLaps', $this->raceresultLaps);
        $stmt->bindParam(':raceResultPointScored', $this->raceresultPointsScored);
        $stmt->bindParam(':raceResultEloChanged', $this->raceresultEloChanged);
        $stmt->bindParam(':raceresultPosition', $this->raceresultPosition);

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
    public function getRaceResultByRaceID()
    {
        $query = 'SELECT * 
                  FROM raceresult join car c on c.carID = raceresult.raceresultCarID
                    join driver d on d.driverID = raceresult.raceresultDriverID
                    join race r on raceresult.raceresultRaceID = r.raceID
                  WHERE raceresultRaceID = :raceresultRaceID
                  ORDER BY raceresultPosition asc ';
        //Prepare Statement

        $stmt = $this->conn->prepare($query);

        //Bind ID

        $stmt->bindParam(':raceresultRaceID', $this->raceresultRaceID);

        // Execute Query
        $stmt->execute();
        return $stmt;
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

    public function getRaceResultByDriverID()
    {
        $query = 'SELECT * 
                  FROM raceresult join car c on c.carID = raceresult.raceresultCarID
                    join driver d on d.driverID = raceresult.raceresultDriverID
                    join race r on raceresult.raceresultRaceID = r.raceID
                    join championship c2 on r.raceChampionshipID = c2.championshipID
                  WHERE raceresultDriverID = :raceresultDriverID
                  ORDER BY raceDateOfRace';
        //Prepare Statement

        $stmt = $this->conn->prepare($query);

        //Bind ID

        $stmt->bindParam(':raceresultDriverID', $this->raceResultDriverID);

        // Execute Query
        $stmt->execute();
        return $stmt;
    }
}