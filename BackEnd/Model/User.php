<?php

class User
{
    private $conn;
    public $username;
    public $password;
    public $token;
    public $intMax = 99999999;
    public $intmin = 11111111;
    public function __construct($db)
    {
        $this->conn = $db;
    }
    public function updateTheToken() {
        $query = 'UPDATE adminuser
                set token = :token
                where Username = :username and password = :password';
        $stmt = $this->conn->prepare($query);
        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->password = htmlspecialchars(strip_tags($this->password));

        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':password', $this->password);
        $random = rand($this->intmin, $this->intMax);
        $stmt->bindParam(':token', $random);
        $stmt->execute();
        return $random;

    }
    public function checkCredentials(){
        $query = 'select * 
                from adminuser 
                where Username = :username and password = :password';
        $stmt = $this->conn->prepare($query);


        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->password = htmlspecialchars(strip_tags($this->password));

        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':password', $this->password);

        $stmt->execute();
        return $stmt->rowCount();
    }

    public function checkToken(){
        $query = 'select * 
                from adminuser 
                where Username = :username and token = :token';
        $stmt = $this->conn->prepare($query);


        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->token = htmlspecialchars(strip_tags($this->token));

        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':token', $this->token);

        $stmt->execute();
        return $stmt->rowCount();
    }
}