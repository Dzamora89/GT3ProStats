<?php

class ChampionshipEntryJOIN
{
// DB Stuff
    private $conn;
    private $table = 'championshipEntry';

    public $championshipEntryID;

    public $totalPoints;
    public $position;
    public $class;



    // Car Stuff
    public $carID;
    public $manufacturer;
    public $number;
    public $classCar;

    // Team Data
    public $teamID;
    public $teamName;
    public $teamOwner;
    public $teamCountry;
    public $teamTwitter;
    public $teamWebsite;
    public $teamCarBrand;
    // Driver Data
    public $driverID;
    public $firstName;
    public $lastName;
    public $driverCountry;
    public $dateOfBirth;
    public $driverWebsite;
    public $driverTwitter;
    public $driverStatus;
    public $driverLicenseLevel;
    public $driverELO;

    //Championship Stuff
    public $championshipID;
    //TODO La clase
}