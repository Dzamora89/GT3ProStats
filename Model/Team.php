<?php

class Team
{
// DB Stuff
    private $conn;
    private $table = 'team';

    //Team properties
    public $teamID;
    public $teamName;
    public $teamOwner;
    public $teamCountry;
    public $teamTwitterURL;
    public $teamWebsite;
    public $teamCarBrand;


    // Constructor with DB
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //Todo CRUD

    public function getAllTeam()
    {
        //Create Query
        $query = 'SELECT * 
                  FROM ' . $this->table . '
                  ORDER BY teamID ASC';

        // Prepared Statement

        $stmt = $this->conn->prepare($query);

        // Execute Query
        $stmt->execute();
        return $stmt;
    }


    public function createTeam(): bool
    {
        $query = 'INSERT INTO ' . $this->table . ' 
        SET 
        teamName = :teamName,
        teamOwner = :teamOwner,
        teamCountry = :teamCountry,
        teamTwitterURL = :teamTwitterURL,
        teamWebsite = :teamWebsite,
        teamCarBrand = :teamCarBrand';

        //Statement
        $stmt = $this->conn->prepare($query);

        //Clean UP data

        $this->teamName = htmlspecialchars(strip_tags($this->teamName));
        $this->teamOwner = htmlspecialchars(strip_tags($this->teamOwner));
        $this->teamCountry = htmlspecialchars(strip_tags($this->teamCountry));
        $this->teamTwitterURL = htmlspecialchars(strip_tags($this->teamTwitterURL));
        $this->teamWebsite = htmlspecialchars(strip_tags($this->teamWebsite));
        $this->teamCarBrand = htmlspecialchars(strip_tags($this->teamCarBrand));
        //Bind the dada


        $stmt->bindParam(':teamName', $this->teamName);
        $stmt->bindParam(':teamOwner', $this->teamOwner);
        $stmt->bindParam(':teamCountry', $this->teamCountry);
        $stmt->bindParam(':teamTwitterURL', $this->teamTwitterURL);
        $stmt->bindParam(':teamWebsite', $this->teamWebsite);
        $stmt->bindParam(':teamCarBrand', $this->teamCarBrand);

        //Execute Query

        if ($stmt->execute()) {
            return true;
        } else {
            //Print error
            printf("Error: %s. \n ", $stmt->error);
            return false;
        }
    }

    public function updateTeam(): bool
    {
        $query = 'UPDATE ' . $this->table . ' 
        SET 
        teamName = :teamName,
        teamOwner = :teamOwner,
        teamCountry = :teamCountry,
        teamTwitterURL = :teamTwitterURL,
        teamWebsite = :teamWebsite,
        teamCarBrand = :teamCarBrand
        WHERE
        teamID = :teamID';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data
        $this->teamID = htmlspecialchars(strip_tags($this->teamID));
        $this->teamName = htmlspecialchars(strip_tags($this->teamName));
        $this->teamOwner = htmlspecialchars(strip_tags($this->teamOwner));
        $this->teamCountry = htmlspecialchars(strip_tags($this->teamCountry));
        $this->teamTwitterURL = htmlspecialchars(strip_tags($this->teamTwitterURL));
        $this->teamWebsite = htmlspecialchars(strip_tags($this->teamWebsite));
        $this->teamCarBrand = htmlspecialchars(strip_tags($this->teamCarBrand));

        //Bind the dada
        $stmt->bindParam(':teamID', $this->teamID);
        $stmt->bindParam(':teamName', $this->teamName);
        $stmt->bindParam(':teamOwner', $this->teamOwner);
        $stmt->bindParam(':teamCountry', $this->teamCountry);
        $stmt->bindParam(':teamTwitterURL', $this->teamTwitterURL);
        $stmt->bindParam(':teamWebsite', $this->teamWebsite);
        $stmt->bindParam(':teamCarBrand', $this->teamCarBrand);

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
    public function getTeamByID(): void
    {
        $query = 'SELECT * 
                  FROM ' . $this->table . '
                  WHERE teamID = :teamID';
        //Prepare Statement

        $stmt = $this->conn->prepare($query);

        //Bind ID

        $stmt->bindParam(':teamID', $this->teamID);

        // Execute Query
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        //SetProperties
        $this->teamID = $row['teamID'];
        $this->teamName = $row['teamName'];
        $this->teamOwner = $row['teamOwner'];
        $this->teamCountry = $row['teamCountry'];
        $this->teamTwitterURL = $row['teamTwitterURL'];
        $this->teamWebsite = $row['teamWebsite'];
        $this->teamCarBrand = $row['teamCarBrand'];


    }


    public function deleteTeam(): bool
    {

        //Create the Query
        $query = 'DELETE FROM ' . $this->table . '
                WHERE teamID = :teamID';
        //Prepare Statment
        $stmt = $this->conn->prepare($query);

        //Clean Data
        $this->teamID = htmlspecialchars(strip_tags($this->teamID));

        //Bind Data
        $stmt->bindParam(':teamID', $this->teamID);

        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

}