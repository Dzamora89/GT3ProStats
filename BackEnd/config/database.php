<?php

class Database
{
    // DB Parameters
    private $host ='db5013031510.hosting-data.io';
    private $db_name = 'dbs10941529';
    private $username = 'dbu719089';
    private $password = 'GT3Develpment';
    private $conn;

    //Db connect

    public function connect()
    {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                'mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $exception) {
            echo 'connection error' . $exception->getMessage();
        }
        return $this->conn;
    }
}
