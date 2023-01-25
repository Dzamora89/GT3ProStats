<?php

class Car
{
// DB Stuff
    private $conn;
    private $table = 'car';

    //Todo: Test the API
    //Properties
    public $carID;
    public $manufacturer;
    public $teamID;
    public $number;
    public $classCar;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAllCar()
    {
        //Create Query
        $query = 'SELECT * 
                  FROM car join team on car.teamID = team.TeamID 
                  ORDER BY carID ASC';

        // Prepared Statement

        $stmt = $this->conn->prepare($query);

        // Execute Query
        $stmt->execute();
        return $stmt;
    }


    public function createCar(): bool
    {
        $query = 'INSERT INTO ' . $this->table . ' 
        SET 
        manufacturer = :manufacturer, 
        teamID = :teamID, 
        number = :number, 
        classCar = :classCar';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data

        $this->manufacturer = htmlspecialchars(strip_tags($this->manufacturer));
        $this->number = htmlspecialchars(strip_tags($this->number));
        $this->teamID = htmlspecialchars(strip_tags($this->teamID));
        $this->classCar = htmlspecialchars(strip_tags($this->classCar));


        //Bind the dada
        $stmt->bindParam(':manufacturer', $this->manufacturer);
        $stmt->bindParam(':number', $this->number);
        $stmt->bindParam(':teamID', $this->teamID);
        $stmt->bindParam(':classCar', $this->classCar);


        //Execute Query

        if ($stmt->execute()) {
            return true;
        } else {
            //Print error
            printf("Error: %s. \n ", $stmt->error);
            return false;
        }
    }

    public function updateCar(): bool
    {
        $query = 'UPDATE ' . $this->table . ' 
        SET 
        manufacturer = :manufacturer, 
        teamID = :teamID, 
        number = :number, 
        classCar = :classCar
        WHERE
        carID = :carID';

        //Statment
        $stmt = $this->conn->prepare($query);

        //Clean UP data

        $this->manufacturer = htmlspecialchars(strip_tags($this->manufacturer));
        $this->number = htmlspecialchars(strip_tags($this->number));
        $this->teamID = htmlspecialchars(strip_tags($this->teamID));
        $this->classCar = htmlspecialchars(strip_tags($this->classCar));
        $this->carID = htmlspecialchars(strip_tags($this->carID));

        //Bind the dada
        $stmt->bindParam(':manufacturer', $this->manufacturer);
        $stmt->bindParam(':number', $this->number);
        $stmt->bindParam(':teamID', $this->teamID);
        $stmt->bindParam(':classCar', $this->classCar);
        $stmt->bindParam(':carID', $this->carID);

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
    public function getCarByID(): void
    {
        $query = 'SELECT * 
                  FROM ' . $this->table . '
                  WHERE carID = :carID';
        //Prepare Statement

        $stmt = $this->conn->prepare($query);

        //Bind ID

        $stmt->bindParam(':carID', $this->carID);

        // Execute Query
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        //SetProperties
        $this->carID = $row['carID'];
        $this->manufacturer = $row['manufacturer'];
        $this->teamID = $row['teamID'];
        $this->classCar = $row['classCar'];
        $this->number = $row['number'];

    }


    public function deleteDriver(): bool
    {

        //Create the Query
        $query = 'DELETE FROM ' . $this->table . '
                WHERE carID = :carID';
        //Prepare Statment
        $stmt = $this->conn->prepare($query);

        //Clean Data
        $this->carID = htmlspecialchars(strip_tags($this->carID));

        //Bind Data
        $stmt->bindParam(':carID', $this->carID);

        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
}