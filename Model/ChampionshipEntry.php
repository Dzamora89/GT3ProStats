<?php

class ChampionshipEntry
{
// DB Stuff
    private $conn;
    private $table = 'championshipEntry';

    //
    public $championshipEntryID;
    public $championshipID;
    public $totalPoints;
    public $position;
    public $class;

    public function __constructor($db)
    {
        $this->conn = $db;
    }

    public function createChampionshipEntry(): bool
    {
        $query = 'INSERT INTO ' . $this->table . ' 
        SET 
        championshipID = :championshipID, 
        totalPoints = :totalPoints, 
        position = :position, 
        class = :class';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data

        $this->championshipID = htmlspecialchars(strip_tags($this->championshipID));
        $this->totalPoints = htmlspecialchars(strip_tags($this->totalPoints));
        $this->position = htmlspecialchars(strip_tags($this->position));
        $this->class = htmlspecialchars(strip_tags($this->class));


        //Bind the dada
        $stmt->bindParam(':championshipID', $this->championshipID);
        $stmt->bindParam(':totalPoints', $this->totalPoints);
        $stmt->bindParam(':position', $this->position);
        $stmt->bindParam(':class', $this->class);


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
        totalPoints = :totalPoints, 
        position = :position, 
        class = :class
        WHERE
        championshipEntryID = :championshipEntryID';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data

        $this->totalPoints = htmlspecialchars(strip_tags($this->totalPoints));
        $this->position = htmlspecialchars(strip_tags($this->position));
        $this->class = htmlspecialchars(strip_tags($this->class));
        $this->championshipEntryID = htmlspecialchars(strip_tags($this->championshipEntryID));

        //Bind the dada
        $stmt->bindParam(':totalPoints', $this->totalPoints);
        $stmt->bindParam(':position', $this->position);
        $stmt->bindParam(':class', $this->class);
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
        $query = 'SELECT * 
                  FROM ' . $this->table . '
                  WHERE ChampionshipEntryID = :ChampionshipEntryID';
        //Prepare Statement

        $stmt = $this->conn->prepare($query);

        //Bind ID

        $stmt->bindParam(':ChampionshipEntryID', $this->ChampionshipEntryID);

        // Execute Query
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        //SetProperties
        $this->championshipID = $row['championshipID'];
        $this->championshipEntryID = $row['championshipEntryID'];
        $this->class = $row['class'];
        $this->position = $row['position'];
        $this->totalPoints = $row['totalPoints'];

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