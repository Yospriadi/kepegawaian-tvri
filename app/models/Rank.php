<?php 

class Rank {
    private $table = 'ranks';
    private $db;

    public function __construct()
    {
        $this->db = new Database;
    }

    public function getAllRanks(){
        $this->db->query("SELECT ranks.id, ranks.name , COUNT(employees.id) employee_count FROM ranks LEFT JOIN employees
                        ON employees.rank = ranks.id GROUP BY ranks.id;");
        return $this->db->resultSet();
    }

    public function updateRankName($id, $newName){
        $this->db->query("UPDATE ranks SET name = :newName WHERE id = :id");
        $this->db->bind("newName", $newName);
        $this->db->bind("id", $id);
        return $this->db->execute();
    }

    public function unsetRank($id){
        $this->db->query("UPDATE ranks SET name = null WHERE id = :id");
        $this->db->bind("id", $id);
        $this->db->execute();

        $this->db->query("UPDATE employees SET rank = 10 WHERE rank = :id");
        $this->db->bind("id", $id);
        return $this->db->execute();
    }
}

?>