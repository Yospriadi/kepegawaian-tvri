<?php 

class Employee {
    private $table = "employees";
    private $db;

    public function __construct()
    {
        $this->db = new Database;
    }

    public function getAllEmployee() {
        $this->db->query("SELECT employees.id, CONCAT(first_name, ' ', last_name) username, email, rank, ranks.name rank_name, admin_level FROM $this->table JOIN ranks ON ranks.id = rank");
        return $this->db->resultSet();
    }

    public function getEmployeeByEmail($email) {
        $this->db->query("SELECT employees.id, CONCAT(first_name, ' ', last_name) username, email, password, rank, ranks.name rank_name, admin_level FROM $this->table JOIN ranks ON ranks.id = rank WHERE email = :email");
        $this->db->bind('email', $email);
        return $this->db->single();
    }

    public function getAdminLevel($id) {
        $this->db->query("SELECT admin_level FROM $this->table WHERE id = :id");
        $this->db->bind("id", $id);
        return $this->db->single();
    }
    
    public function getRankNameById($id) {
        $this->db->query("SELECT name FROM ranks WHERE id = :id");
        $this->db->bind("id", $id);
        return $this->db->single();
    }

    public function getAvailableRanks() {
        $this->db->query("SELECT * FROM ranks WHERE name IS NOT NULL ORDER BY id");
        return $this->db->resultSet();
    }

    public function addNewEmployee($data = []) {
        $this->db->query("INSERT INTO employees(first_name, last_name, email, rank) VALUES (:first_name, :last_name, :email, :rank)");
        $this->db->bind("first_name", $data['first_name']);
        $this->db->bind('last_name', $data['last_name']);
        $this->db->bind("email", $data['email']);
        $this->db->bind("rank", $data['ank']);
        return $this->db->execute();
    }

    public function deleteEmployeeById($id) {
        $this->db->query("DELETE FROM employees WHERE id = :id");
        $this->db->bind("id", $id);
        return $this->db->execute();
    }

    public function verifyPassword($id, $password) {
        $this->db->query("SELECT password FROM employees WHERE id = :id");
        $this->db->bind("id", $id);
        $result = $this->db->single();
        if(!password_verify($password, $result['password']))
            return false;
        return true;
    }

    public function changePassword($id, $password) {
        $password = password_hash($password, PASSWORD_BCRYPT);
        $this->db->query("UPDATE employees SET password = :password WHERE id = :id");
        $this->db->bind("id", $id);
        $this->db->bind("password", $password);
        return $this->db->execute();
    }

    public function setAdmin($id){
        $this->db->query("UPDATE employees SET admin_level = 1 WHERE id = :id");
        $this->db->bind("id", $id);
        return $this->db->execute();
    }

    public function removeAdmin($id){
        $this->db->query("UPDATE employees SET admin_level = 0 WHERE id = :id");
        $this->db->bind("id", $id);
        return $this->db->execute();
    }

    public function update($id, $data = []){
        if(empty($data))
            return false;
        $this->db->query("UPDATE employees SET first_name = :firstName, last_name = :lastName, rank = :rank WHERE id = :id");
        $this->db->bind("firstName", $data['first_name']);
        $this->db->bind("lastName", $data['last_name']);
        $this->db->bind("rank", $data['rank']);
        $this->db->bind("id", $id);
        return $this->db->execute();
    }
}
?>