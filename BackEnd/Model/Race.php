<?php

class Race
{
    // DB Stuff
    private $conn;
    private $table = 'race';


    // Properties
    public $raceID;
    public $raceTrack;
    public $raceDateOfRace;
    public $raceCountry;
    public $raceChampionshipID;
    public $raceDuration;
    public $raceEventName;
    public $raceYoutubeLink;
    public $raceResultLink;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function createRace(): bool
    {
        $query = 'INSERT INTO ' . $this->table . ' 
        SET 
        raceTrack = :raceTrack,
        raceDateOfRace = :raceDateOfRace,
        raceCountry = :raceCountry,
        raceChampionshipID = :raceChampionshipID,
        raceDuration = :raceDuration,
        raceEventName = :raceEventName,
        raceYoutubeLink = :raceYoutubeLink,
        raceResultLink = :raceResultLink';

        //Statement
        $stmt = $this->conn->prepare($query);

        //Clean UP data

        $this->raceTrack = htmlspecialchars(strip_tags($this->raceTrack));
        $this->raceCountry = htmlspecialchars(strip_tags($this->raceCountry));
        $this->raceDateOfRace = htmlspecialchars(strip_tags($this->raceDateOfRace));
        $this->raceChampionshipID = htmlspecialchars(strip_tags($this->raceChampionshipID));
        $this->raceDuration = htmlspecialchars(strip_tags($this->raceDuration));
        $this->raceEventName = htmlspecialchars(strip_tags($this->raceEventName));
        $this->raceYoutubeLink = htmlspecialchars(strip_tags($this->raceYoutubeLink));
        $this->raceResultLink = htmlspecialchars(strip_tags($this->raceResultLink));


        //Bind the dada
        $stmt->bindParam(':raceTrack', $this->raceTrack);
        $stmt->bindParam(':raceCountry', $this->raceCountry);
        $stmt->bindParam(':raceDateOfRace', $this->raceDateOfRace);
        $stmt->bindParam(':raceChampionshipID', $this->raceChampionshipID);
        $stmt->bindParam(':raceDuration', $this->raceDuration);
        $stmt->bindParam(':raceEventName', $this->raceEventName);
        $stmt->bindParam(':raceYoutubeLink', $this->raceYoutubeLink);
        $stmt->bindParam(':raceResultLink', $this->raceResultLink);


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
        $query = 'UPDATE race
        SET 
        raceTrack = :raceTrack,
        raceDateOfRace = :raceDateOfRace,
        raceCountry = :raceCountry,
        raceChampionshipID = :raceChampionshipID,
        raceDuration = :raceDuration,
        raceEventName = :raceEventName,
        raceYoutubeLink = :raceYoutubeLink,
        raceResultLink = :raceResultLink
        WHERE
        raceID = :raceID';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data
        $this->raceID = htmlspecialchars(strip_tags($this->raceID));
        $this->raceTrack = htmlspecialchars(strip_tags($this->raceTrack));
        $this->raceCountry = htmlspecialchars(strip_tags($this->raceCountry));
        $this->raceDateOfRace = htmlspecialchars(strip_tags($this->raceDateOfRace));
        $this->raceChampionshipID = htmlspecialchars(strip_tags($this->raceChampionshipID));
        $this->raceDuration = htmlspecialchars(strip_tags($this->raceDuration));
        $this->raceEventName = htmlspecialchars(strip_tags($this->raceEventName));
        $this->raceYoutubeLink = htmlspecialchars(strip_tags($this->raceYoutubeLink));
        $this->raceResultLink = htmlspecialchars(strip_tags($this->raceResultLink));

        //Bind the dada
        $stmt->bindParam(':raceID', $this->raceID);
        $stmt->bindParam(':raceTrack', $this->raceTrack);
        $stmt->bindParam(':raceCountry', $this->raceCountry);
        $stmt->bindParam(':raceDateOfRace', $this->raceDateOfRace);
        $stmt->bindParam(':raceChampionshipID', $this->raceChampionshipID);
        $stmt->bindParam(':raceDuration', $this->raceDuration);
        $stmt->bindParam(':raceEventName', $this->raceEventName);
        $stmt->bindParam(':raceYoutubeLink', $this->raceYoutubeLink);
        $stmt->bindParam(':raceResultLink', $this->raceResultLink);


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
        $this->raceTrack = $row['raceTrack'];
        $this->raceChampionshipID = $row['raceChampionshipID'];
        $this->raceCountry = $row['raceCountry'];
        $this->raceDateOfRace = $row['raceDateOfRace'];
        $this->raceDuration = $row['raceDuration'];
        $this->raceEventName = $row['raceEventName'];
        $this->raceYoutubeLink = $row['raceYoutubeLink'];
        $this->raceResultLink = $row['raceResultLink'];
    }

    public function getRaceBychampionshipID()
    {
        $query = 'SELECT * 
                  FROM ' . $this->table . '
                  WHERE raceChampionshipID = :raceChampionshipID';
        //Prepare Statement

        $stmt = $this->conn->prepare($query);

        //Bind ID

        $stmt->bindParam(':raceChampionshipID', $this->raceChampionshipID);
        $stmt->execute();
        return $stmt;
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

    public function getAllRaces()
    {
        //Create the Query
        $query = 'SELECT * FROM race r JOIN championship c ON r.raceChampionshipID = c.ChampionshipID
                ORDER BY raceDateOfRace';
        //Prepare Statment
        $stmt = $this->conn->prepare($query);


        // Execute Query
        $stmt->execute();
        return $stmt;
    }
}
