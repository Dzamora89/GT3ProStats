<?php

class Championship
{
// DB Stuff
    private $conn;
    private $table = 'championship';


    //Properties
    public $championshipID;
    public $name;
    public $country;
    public $website;
    public $twitter;
    public $facebook;
    public $youtube;
    public $season;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAllChampionship()
    {
        //Create Query
        $query = 'SELECT * 
                  FROM ' . $this->table . '
                  ORDER BY championshipID ASC';

        // Prepared Statement

        $stmt = $this->conn->prepare($query);

        // Execute Query
        $stmt->execute();
        return $stmt;
    }

    public function createChampionship(): bool
    {
        $query = 'INSERT INTO ' . $this->table . ' 
        SET 
        name = :name, 
        country = :country, 
        website = :website, 
        twitter = :twitter,
        facebook = :facebook,
        youtube = :youtube,
        season = :season';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->country = htmlspecialchars(strip_tags($this->country));
        $this->website = htmlspecialchars(strip_tags($this->website));
        $this->twitter = htmlspecialchars(strip_tags($this->twitter));
        $this->facebook = htmlspecialchars(strip_tags($this->facebook));
        $this->youtube = htmlspecialchars(strip_tags($this->youtube));
        $this->season = htmlspecialchars(strip_tags($this->season));

        //Bind the dada
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':country', $this->country);
        $stmt->bindParam(':website', $this->website);
        $stmt->bindParam(':twitter', $this->twitter);
        $stmt->bindParam(':facebook', $this->facebook);
        $stmt->bindParam(':youtube', $this->youtube);
        $stmt->bindParam(':season', $this->season);

        //Execute Query

        if ($stmt->execute()) {
            return true;
        } else {
            //Print error
            printf("Error: %s. \n ", $stmt->error);
            return false;
        }
    }

    public function updateChampionship(): bool
    {
        $query = 'UPDATE ' . $this->table . ' 
        SET 
        name = :name, 
        country = :country, 
        website = :website, 
        twitter = :twitter,
        facebook = :facebook,
        youtube = :youtube,
        season = :season
        WHERE
        championshipID = :championshipID';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data
        $this->championshipID = htmlspecialchars(strip_tags($this->championshipID));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->country = htmlspecialchars(strip_tags($this->country));
        $this->website = htmlspecialchars(strip_tags($this->website));
        $this->twitter = htmlspecialchars(strip_tags($this->twitter));
        $this->facebook = htmlspecialchars(strip_tags($this->facebook));
        $this->youtube = htmlspecialchars(strip_tags($this->youtube));
        $this->season = htmlspecialchars(strip_tags($this->season));

        //Bind the dada
        $stmt->bindParam('championshipID', $this->championshipID);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':country', $this->country);
        $stmt->bindParam(':website', $this->website);
        $stmt->bindParam(':twitter', $this->twitter);
        $stmt->bindParam(':facebook', $this->facebook);
        $stmt->bindParam(':youtube', $this->youtube);
        $stmt->bindParam(':season', $this->season);


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
    public function getChampionshipByID(): void
    {
        $query = 'SELECT * 
                  FROM ' . $this->table . '
                  WHERE championshipID = :championshipID';
        //Prepare Statement

        $stmt = $this->conn->prepare($query);

        //Bind ID

        $stmt->bindParam(':championshipID', $this->championshipID);

        // Execute Query
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        //SetProperties
        $this->championshipID = $row['championshipID'];
        $this->name = $row['name'];
        $this->country = $row['country'];
        $this->website = $row['website'];
        $this->twitter = $row['twitter'];
        $this->facebook = $row['facebook'];
        $this->youtube = $row['youtube'];
        $this->season = $row['season'];

    }


    public function deleteChampionship(): bool
    {

        //Create the Query
        $query = 'DELETE FROM ' . $this->table . '
                WHERE championshipID = :championshipID';
        //Prepare Statment
        $stmt = $this->conn->prepare($query);

        //Clean Data
        $this->championshipID = htmlspecialchars(strip_tags($this->championshipID));

        //Bind Data
        $stmt->bindParam(':championshipID', $this->championshipID);

        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
}