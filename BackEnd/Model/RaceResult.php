<?php

class RaceResult
{
    // DB Stuff
    private $conn;
    private string $table = 'raceResult';


    // Properties

    public  $raceResultID;
    public  $raceResultCarID;
    public  $raceResultRaceID;
    public  $raceResultDriverID;
    public  $raceResultGap;
    public  $raceResultLaps;
    public  $raceResultPointsScored;
    public  $raceResultEloChanged;
    public  $raceResultPosition;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Todo: Looks if it needs to get use
    public function getAllRaceResult()
    {
        //Create Query
        $query = 'SELECT * 
                  FROM raceResult join race r on raceResult.raceResultRaceID = r.raceID
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
        $query = 'INSERT INTO racerRsult (
                        raceResultCarID,
                        raceResultRaceID,
                        raceResultDriverID,
                        raceResultGap,
                        raceResultLaps,
                        raceResultPointsScored,
                        raceResultEloChanged,
                        raceResultPosition
                        ) values (
                        :raceResultCarID,
                        :raceResultRaceID,
                        :raceResultDriverID,
                        :raceResultGap,
                        :raceResultLaps,
                        :raceResultPointsScored,
                        :raceResultEloChanged,
                        :raceResultPosition
                        ) ';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data

        $this->raceResultCarID = htmlspecialchars(strip_tags($this->raceResultCarID));
        $this->raceResultRaceID = htmlspecialchars(strip_tags($this->raceResultRaceID));
        $this->raceResultDriverID = htmlspecialchars(strip_tags($this->raceResultDriverID));
        $this->raceResultGap = htmlspecialchars(strip_tags($this->raceResultGap));
        $this->raceResultLaps = htmlspecialchars(strip_tags($this->raceResultLaps));
        $this->raceResultPointsScored = htmlspecialchars(strip_tags($this->raceResultPointsScored));
        $this->raceResultEloChanged = htmlspecialchars(strip_tags($this->raceResultEloChanged));
        $this->raceResultPosition = htmlspecialchars(strip_tags($this->raceResultPosition));

        //Bind the dada
        $stmt->bindParam(':raceResultCarID', $this->raceResultCarID);
        $stmt->bindParam(':raceResultRaceID', $this->raceResultRaceID);
        $stmt->bindParam(':raceResultDriverID', $this->raceResultDriverID);
        $stmt->bindParam(':raceResultGap', $this->raceResultGap);
        $stmt->bindParam(':raceResultLaps', $this->raceResultLaps);
        $stmt->bindParam(':raceResultPointsScored', $this->raceResultPointsScored);
        $stmt->bindParam(':raceResultEloChanged', $this->raceResultEloChanged);
        $stmt->bindParam(':raceResultPosition', $this->raceResultPosition);

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
        $query = 'UPDATE raceResult 
        SET 
        raceResultGap = :raceResultGap, 
        raceResultLaps = :raceResultLaps,
        raceresultPointsScored = :raceResultPointScored,
        raceResultEloChanged = :raceResultEloChanged,
        raceResultPosition = :raceresultPosition
        WHERE
        raceResultID = :raceResultID';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data
        $this->raceResultID = htmlspecialchars(strip_tags($this->raceResultID));
        $this->raceResultCarID = htmlspecialchars(strip_tags($this->raceResultCarID));
        $this->raceResultRaceID = htmlspecialchars(strip_tags($this->raceResultRaceID));
        $this->raceResultDriverID = htmlspecialchars(strip_tags($this->raceResultDriverID));
        $this->raceResultGap = htmlspecialchars(strip_tags($this->raceResultGap));
        $this->raceResultLaps = htmlspecialchars(strip_tags($this->raceResultLaps));
        $this->raceResultPointsScored = htmlspecialchars(strip_tags($this->raceResultPointsScored));
        $this->raceResultEloChanged = htmlspecialchars(strip_tags($this->raceResultEloChanged));
        $this->raceResultPosition = htmlspecialchars(strip_tags($this->raceResultPosition));

        //Bind the dada
        $stmt->bindParam(':raceResultID', $this->raceResultID);
        $stmt->bindParam(':raceResultGap', $this->raceResultGap);
        $stmt->bindParam(':raceResultLaps', $this->raceResultLaps);
        $stmt->bindParam(':raceResultPointScored', $this->raceResultPointsScored);
        $stmt->bindParam(':raceResultEloChanged', $this->raceResultEloChanged);
        $stmt->bindParam(':raceResultPosition', $this->raceResultPosition);

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
                  FROM raceResult join car c on c.carID = raceResult.raceResultCarID
                    join driver d on d.driverID = raceResult.raceresultDriverID
                    join race r on raceResult.raceResultRaceID = r.raceID
                  WHERE raceResultRaceID = :raceResultRaceID
                  ORDER BY raceResultPosition asc ';
        //Prepare Statement

        $stmt = $this->conn->prepare($query);

        //Bind ID

        $stmt->bindParam(':raceResultRaceID', $this->raceResultRaceID);

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
                  FROM raceResult join car c on c.carID = raceResult.raceResultCarID
                    join driver d on d.driverID = raceResult.raceResultDriverID
                    join race r on raceResult.raceResultRaceID = r.raceID
                    join championship c2 on r.raceChampionshipID = c2.championshipID
                  WHERE raceResultDriverID = :raceResultDriverID
                  ORDER BY raceDateOfRace';
        //Prepare Statement

        $stmt = $this->conn->prepare($query);

        //Bind ID

        $stmt->bindParam(':raceResultDriverID', $this->raceResultDriverID);

        // Execute Query
        $stmt->execute();
        return $stmt;
    }
}
