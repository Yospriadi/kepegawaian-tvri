<?php 

class Schedule {
    private $table = 'schedules';
    private $db;

    public function __construct()
    {
        $this->db = new Database;
    }

    public function getTodaySchedule(){
        $this->db->query("SELECT CONCAT(first_name, ' ', last_name) employee_name, name division_name FROM schedules
                        JOIN assignments ON schedules.id = assignments.id
                        LEFT JOIN employees ON employees.id = employee_id
                        LEFT JOIN divisions ON divisions.id = division_id WHERE schedules.date = DATE(NOW());");;
        return $this->db->resultSet();
    }

    public function getAllSchedules(){
        $this->db->query("SELECT schedules.id, date, COUNT(assignments.id) t_employee_assigned FROM schedules
                        LEFT JOIN assignments ON assignments.id = schedules.id GROUP BY schedules.id ORDER BY date DESC;");
        return $this->db->resultSet();
    }

    public function addSchedule($date) {
        if(!$date)
            $date = date('Y-m-d');
        $this->db->query("INSERT INTO schedules(date) VALUES (:date)");
        $this->db->bind("date", $date, PDO::PARAM_STR);
        return $this->db->execute();
    }

    public function getLatestCreatedSchedule() {
        $this->db->query("SELECT MAX(id) id FROM schedules");
        return $this->db->single();
    }

    public function getScheduleId($date) {
        $this->db->query("SELECT id FROM schedules WHERE date = $date");
        return $this->db->single();
    }

    public function getScheduleDate($id){
        $this->db->query("SELECT DATE_FORMAT(date, '%a, %d %M %Y') date FROM schedules WHERE id = $id");
        return $this->db->single();
    }

    public function reschedule($id) {
        $this->db->query("DELETE FROM assignments WHERE id = :id");
        $this->db->bind("id", $id);
        $this->db->execute();
        $this->db->query("CALL scheduler(:id)");
        $this->db->bind("id", $id);
        return $this->db->execute();
    }

    public function getUnassignedDivisions($id){
        $this->db->query("SELECT id, name FROM divisions WHERE id NOT IN (SELECT division_id FROM assignments
                        JOIN schedules ON schedules.id = assignments.id WHERE schedules.id = :id);");
        $this->db->bind("id", $id);
        return $this->db->resultSet();
    }

    public function getAssignedDivisions($id){
        $this->db->query("SELECT division_id, employees.id, CONCAT(first_name, ' ', last_name) username, divisions.name FROM
                        assignments JOIN employees ON employee_id = employees.id JOIN divisions
                        ON division_id = divisions.id AND assignments.id = :id;");
        $this->db->bind("id", $id);
        return $this->db->resultSet();
    }

    public function getUnassignedEmployees($id) {
        $this->db->query("SELECT employees.id, CONCAT(first_name, ' ', last_name) username FROM employees
                        WHERE id NOT IN (SELECT employee_id FROM assignments WHERE id = :id)");
        $this->db->bind("id", $id);
        return $this->db->resultSet();
    }

    public function deleteSchedule($id){
        $this->db->query("DELETE FROM schedules WHERE id = :id");
        $this->db->bind("id", $id);
        return $this->db->execute();
    }

    public function assignSchedule($scheduleId, $employeeId, $divisionId){
        $this->db->query("INSERT INTO assignments VALUES(:schedule, :employee, :division)");
        $this->db->bind("schedule", $scheduleId);
        $this->db->bind("employee", $employeeId);
        $this->db->bind("division", $divisionId);
        return $this->db->execute();
    }

    public function unassignSchedule($scheduleId, $employeeId, $divisionId) {
        $this->db->query("DELETE FROM assignments WHERE id = :scheduleId AND employee_id = :employeeId AND division_id = :divisionId");
        $this->db->bind("scheduleId", $scheduleId);
        $this->db->bind("employeeId", $employeeId);
        $this->db->bind("divisionId", $divisionId);
        return $this->db->execute();
    }
}

?>