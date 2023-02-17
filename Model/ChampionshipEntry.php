<?php

class ChampionshipEntry
{
// DB Stuff
    private $conn;
    private $table = 'championshipEntry';

    //
    public $championshipEntryID;
    public $championshipEntryChampionshipID;
    public $championshipEntryTotalPoints;
    public $championshipEntryPosition;
    public $championshipEntryClass;
    public $championshipEntryDriverID;
    public $championshipEntryCarID;
    public $championshipEntryTeamID;

    public function __constructor($db)
    {
        $this->conn = $db;
    }

    public function createChampionshipEntry(): bool
    {
        $query = 'INSERT INTO ' . $this->table . ' 
        SET 
        championshipEntryChampionshipID = :championshipEntryChampionshipID, 
        championshipEntryTotalPoints = :championshipEntryTotalPoints, 
        championshipEntryPosition = :championshipEntryPosition, 
        class = :class,
        driverID = :driverID,
        carID = :carID,
        teamID = :teamID';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data

        $this->championshipEntryChampionshipID = htmlspecialchars(strip_tags($this->championshipEntryChampionshipID));
        $this->championshipEntryTotalPoints = htmlspecialchars(strip_tags($this->championshipEntryTotalPoints));
        $this->championshipEntryPosition = htmlspecialchars(strip_tags($this->championshipEntryPosition));
        $this->class = htmlspecialchars(strip_tags($this->class));
        $this->driverID = htmlspecialchars(strip_tags($this->driverID));
        $this->carID = htmlspecialchars(strip_tags($this->carID));
        $this->teamID = htmlspecialchars(strip_tags($this->teamID));

        //Bind the dada
        $stmt->bindParam(':championshipEntryChampionshipID', $this->championshipEntryChampionshipID);
        $stmt->bindParam(':championshipEntryTotalPoints', $this->championshipEntryTotalPoints);
        $stmt->bindParam(':championshipEntryPosition', $this->championshipEntryPosition);
        $stmt->bindParam(':class', $this->class);
        $stmt->bindParam(':driverID', $this->driverID);
        $stmt->bindParam(':carID', $this->carID);
        $stmt->bindParam(':teamID', $this->teamID);

        //Execute Query

        if ($stmt->execute()) {
            return true;
        } else {
            //Print error
            printf("Error: %s. \n ", $stmt->error);
            return false;
        }
    }

    public function updateChampionshipEntry(): bool
    {
        $query = 'UPDATE ' . $this->table . ' 
        SET 
        championshipEntryTotalPoints = :championshipEntryTotalPoints, 
        championshipEntryPosition = :championshipEntryPosition, 
        class = :class
        WHERE
        championshipEntryID = :championshipEntryID';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data

        $this->championshipEntryTotalPoints = htmlspecialchars(strip_tags($this->championshipEntryTotalPoints));
        $this->championshipEntryPosition = htmlspecialchars(strip_tags($this->championshipEntryPosition));
        $this->class = htmlspecialchars(strip_tags($this->class));
        $this->championshipEntryID = htmlspecialchars(strip_tags($this->championshipEntryID));
        $this->driverID = htmlspecialchars(strip_tags($this->driverID));
        $this->carID = htmlspecialchars(strip_tags($this->carID));
        $this->teamID = htmlspecialchars(strip_tags($this->teamID));

        //Bind the dada
        $stmt->bindParam(':championshipEntryTotalPoints', $this->championshipEntryTotalPoints);
        $stmt->bindParam(':championshipEntryPosition', $this->championshipEntryPosition);
        $stmt->bindParam(':class', $this->class);
        $stmt->bindParam(':championshipEntryID', $this->championshipEntryID);
        $stmt->bindParam(':driverID', $this->driverID);
        $stmt->bindParam(':carID', $this->carID);
        $stmt->bindParam(':teamID', $this->teamID);

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
    public function getChampionshipEntryByID(): void
    {
        $query = 'SELECT * 
                  FROM championshipentry join car c on c.carID = championshipentry.carID,
                       championshipentry join driver d on championshipentry.driverID = d.driverID,
                       championshipentry join team t on championshipentry.teamID = t.teamID,
                       championshipentry join championship c2 on championshipentry.championshipID = c2.championshipID               
                  WHERE ChampionshipEntryID = :ChampionshipEntryID';
        //Prepare Statement

        $stmt = $this->conn->prepare($query);

        //Bind ID

        $stmt->bindParam(':ChampionshipEntryID', $this->ChampionshipEntryID);

        // Execute Query
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        //SetProperties
        $this->championshipEntryChampionshipID = $row['championshipEntryChampionshipID'];
        $this->championshipEntryID = $row['championshipEntryID'];
        $this->class = $row['class'];
        $this->championshipEntryPosition = $row['championshipEntryPosition'];
        $this->championshipEntryTotalPoints = $row['championshipEntryTotalPoints'];

    }


    public function deleteChampionshipEntry(): bool
    {

        //Create the Query
        $query = 'DELETE FROM ' . $this->table . '
                WHERE championshipEntryID = :championshipEntryID';
        //Prepare Statment
        $stmt = $this->conn->prepare($query);

        //Clean Data
        $this->championshipEntryID = htmlspecialchars(strip_tags($this->championshipEntryID));

        //Bind Data
        $stmt->bindParam(':championshipEntryID', $this->championshipEntryID);

        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
}