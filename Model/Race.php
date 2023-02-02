<?php

class Race
{
    // DB Stuff
    private $conn;
    private $table = 'race';


    // Properties
    public $raceID;
    public $track;
    public $dateOfRace;
    public $country;
    public $championshipID;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function createRace(): bool
    {
        $query = 'INSERT INTO ' . $this->table . ' 
        SET 
        track = :track,
        dateOfRace = :dateOfRace,
        country = :country,
        championshipID = :championshipID
        ';

        //Statement
        $stmt = $this->conn->prepare($query);

        //Clean UP data

        $this->track = htmlspecialchars(strip_tags($this->track));
        $this->country = htmlspecialchars(strip_tags($this->country));
        $this->dateOfRace = htmlspecialchars(strip_tags($this->dateOfRace));
        $this->championshipID = htmlspecialchars(strip_tags($this->championshipID));


        //Bind the dada
        $stmt->bindParam(':track', $this->track);
        $stmt->bindParam(':country', $this->country);
        $stmt->bindParam(':dateOfRace', $this->dateOfRace);
        $stmt->bindParam(':championshipID', $this->championshipID);


        //Execute Query

        if ($stmt->execute()) {
            return true;
        } else {
            //Print error
            printf("Error: %s. \n ", $stmt->error);
            return false;
        }
    }

    public function updateRace(): bool
    {
        $query = 'UPDATE ' . $this->table . ' 
        SET 
        track = :track,
        dateOfRace = :dateOfRace,
        country = :country,
        championshipID = :championshipID
        WHERE
        raceID = :raceID';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data
        $this->raceID = htmlspecialchars(strip_tags($this->raceID));
        $this->track = htmlspecialchars(strip_tags($this->track));
        $this->country = htmlspecialchars(strip_tags($this->country));
        $this->dateOfRace = htmlspecialchars(strip_tags($this->dateOfRace));
        $this->championshipID = htmlspecialchars(strip_tags($this->championshipID));

        //Bind the dada
        $stmt->bindParam(':raceID', $this->raceID);
        $stmt->bindParam(':track', $this->track);
        $stmt->bindParam(':country', $this->country);
        $stmt->bindParam(':dateOfRace', $this->dateOfRace);
        $stmt->bindParam(':championshipID', $this->championshipID);

        //Execute Query

        if ($stmt->execute()) {
            return true;
        } else {
            //Print error
            printf("Error: %s. \n ", $stmt->error);
            return false;
        }
    }

    public function getRaceByID(): void
    {
        $query = 'SELECT * 
                  FROM ' . $this->table . '
                  WHERE raceID = :raceID';
        //Prepare Statement

        $stmt = $this->conn->prepare($query);

        //Bind ID

        $stmt->bindParam(':raceID', $this->raceID);

        // Execute Query
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        //SetProperties
        $this->raceID = $row['raceID'];
        $this->track = $row['track'];
        $this->championshipID = $row['championshipID'];
        $this->country = $row['country'];
        $this->dateOfRace = $row['dateOfRace'];
    }

    public function deleteRace(): bool
    {

        //Create the Query
        $query = 'DELETE FROM ' . $this->table . '
                WHERE raceID = :raceID';
        //Prepare Statment
        $stmt = $this->conn->prepare($query);

        //Clean Data
        $this->raceID = htmlspecialchars(strip_tags($this->raceID));

        //Bind Data
        $stmt->bindParam(':raceID', $this->raceID);

        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

    public function tenNextRaces()
    {
        //Create the Query
        $query = 'SELECT * FROM ' . $this->table . '
                ORDER BY dateOfRace	
                limit 10';
        //Prepare Statment
        $stmt = $this->conn->prepare($query);


        // Execute Query
        $stmt->execute();
        return $stmt;
    }
}