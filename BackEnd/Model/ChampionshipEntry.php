<?php

class ChampionshipEntry
{
// DB Stuff
    private $conn;
    private $table = 'championshipentry';

    //
    public $championshipEntryID;
    public $championshipEntryChampionshipID;
    public $championshipEntryTotalPoints;
    public $championshipEntryPosition;
    public $championshipEntryClass;
    public $championshipEntryDriverID;
    public $championshipEntryCarID;
    public $championshipEntryTeamID;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function createChampionshipEntry(): bool
    {
        $query = 'INSERT INTO championshipentry (
            championshipEntryChampionshipID,
            championshipEntryTotalPoints,
            championshipEntryPosition,
            championshipEntryClass,
            championshipEntryDriverID,
            championshipEntryCarID,
            championshipEntryTeamID)
        values (
            :championshipEntryChampionshipID, 
            :championshipEntryTotalPoints, 
            :championshipEntryPosition, 
            :championshipEntryClass,
            :championshipEntryDriverID,
            :championshipEntryCarID,
            :championshipEntryTeamID)';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data

        $this->championshipEntryChampionshipID = htmlspecialchars(strip_tags($this->championshipEntryChampionshipID));
        $this->championshipEntryTotalPoints = htmlspecialchars(strip_tags($this->championshipEntryTotalPoints));
        $this->championshipEntryPosition = htmlspecialchars(strip_tags($this->championshipEntryPosition));
        $this->championshipEntryClass = htmlspecialchars(strip_tags($this->championshipEntryClass));
        $this->championshipEntryDriverID = htmlspecialchars(strip_tags($this->championshipEntryDriverID));
        $this->championshipEntryCarID = htmlspecialchars(strip_tags($this->championshipEntryCarID));
        $this->championshipEntryTeamID = htmlspecialchars(strip_tags($this->championshipEntryTeamID));

        //Bind the dada
        $stmt->bindParam(':championshipEntryChampionshipID', $this->championshipEntryChampionshipID , PDO::PARAM_INT);
        $stmt->bindParam(':championshipEntryTotalPoints', $this->championshipEntryTotalPoints,PDO::PARAM_INT);
        $stmt->bindParam(':championshipEntryPosition', $this->championshipEntryPosition , PDO::PARAM_INT);
        $stmt->bindParam(':championshipEntryClass', $this->championshipEntryClass, PDO::PARAM_STR);
        $stmt->bindParam(':championshipEntryDriverID', $this->championshipEntryDriverID , PDO::PARAM_INT);
        $stmt->bindParam(':championshipEntryCarID', $this->championshipEntryCarID , PDO::PARAM_INT);
        $stmt->bindParam(':championshipEntryTeamID', $this->championshipEntryTeamID, PDO::PARAM_INT);

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
        $query = 'UPDATE championshipentry
        SET 
        championshipEntryTotalPoints = :championshipEntryTotalPoints
        WHERE
        championshipEntryID = :championshipEntryID ';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data

        $this->championshipEntryTotalPoints = htmlspecialchars(strip_tags($this->championshipEntryTotalPoints));
        $this->championshipEntryID = htmlspecialchars(strip_tags($this->championshipEntryID));

        //Bind the dada
        $stmt->bindParam(':championshipEntryTotalPoints', $this->championshipEntryTotalPoints);
        $stmt->bindParam(':championshipEntryID', $this->championshipEntryID);

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
        //Todo: Revisar la Query
        $query = 'SELECT * 
                  FROM championshipentry join car c on c.carID = championshipentry.championshipEntryCarID,
                       championshipentry join driver d on championshipentry.championshipEntryDriverID = d.driverID,
                       championshipentry join team t on championshipentry.teamID = t.teamID,
                       championshipentry join championship c2 on championshipentry.championshipentryChampionshipID = c2.championshipID               
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
        $this->championshipEntryClass = $row['championshipEntryClass'];
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

    public function getChampionshipEntriesByChampionshipID(){

        $query = 'select championshipEntryID,
                        teamName,
                        carNumber,
                        driverFirstName,
                        driverLastName, 
                        championshipEntryTotalPoints,
                        championshipEntryClass,
                        championshipEntryDriverID,
                        c.carManufacturer,
                        c.carID,
                        d.driverELO,
                        c2.championshipName
                from championshipentry
                join driver d on d.driverID = championshipentry.championshipEntryDriverID
                join car c on c.carID = championshipentry.championshipEntryCarID
                join championship c2 on c2.championshipID = championshipentry.championshipEntryChampionshipID
                join team t on t.teamID = c.carTeamID
                where championshipEntryChampionshipID = :championshipEntryChampionshipID
                order by championshipEntryTotalPoints desc ';
        //Prepare Statement

        $stmt = $this->conn->prepare($query);

        //Bind ID

        $stmt->bindParam(':championshipEntryChampionshipID', $this->championshipEntryChampionshipID);

        // Execute Query
        $stmt->execute();
        return $stmt;
    }


    public function updateTheChampionship($pointsScored){
        $query = 'UPDATE championshipentry
            SET championshipEntryTotalPoints = championshipEntryTotalPoints + :pointsScored
            where championshipEntryDriverID = :driverID and championshipEntryChampionshipID = :championshipID';

        $stmt = $this->conn->prepare($query);

        //Bind ID
        $stmt->bindValue(':driverID', $this->championshipEntryDriverID);
        $stmt->bindValue(':championshipID', $this->championshipEntryChampionshipID);
        $stmt->bindValue(':pointsScored', intval($pointsScored),PDO::PARAM_INT);
        // Execute Query

        $stmt->execute();
        return $stmt;
    }

    public function getChampionshipEntriesByDriverID()
    {

        $query = 'select championshipEntryID,
                        teamName,
                        carNumber,
                        driverFirstName,
                        driverLastName, 
                        championshipEntryTotalPoints,
                        championshipEntryClass,
                        championshipEntryDriverID,
                        c.carManufacturer,
                        c.carID,
                        d.driverELO,
                        c2.championshipName
                from championshipentry
                join driver d on d.driverID = championshipentry.championshipEntryDriverID
                join car c on c.carID = championshipentry.championshipEntryCarID
                join championship c2 on c2.championshipID = championshipentry.championshipEntryChampionshipID
                join team t on t.teamID = c.carTeamID
                where championshipEntryDriverID = :championshipEntryDriverID
                order by championshipEntryTotalPoints desc ';
        //Prepare Statement

        $stmt = $this->conn->prepare($query);

        //Bind ID

        $stmt->bindParam(':championshipEntryDriverID', $this->championshipEntryDriverID);

        // Execute Query
        $stmt->execute();
        return $stmt;
    }


}