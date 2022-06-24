<?php 

class Division {
    private $table = "divisions";
    private $db;

    public function __construct()
    {
        $this->db = new Database;
    }

    public function getAllDivisions(){
        $this->db->query("SELECT * FROM $this->table");
        return $this->db->resultSet();
    }

    public function addNewDivision($division_name){
        $this->db->query("INSERT INTO divisions(name) VALUES(:name)");
        $this->db->bind("name", $division_name);
        return $this->db->execute();
    }

    public function deleteDivisionById($id){
        $this->db->query("DELETE FROM divisions WHERE id = :id");
        $this->db->bind("id", $id);
        return $this->db->execute();
    }
}

?>