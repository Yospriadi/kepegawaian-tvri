<?php 

class Schedules extends Controller {
    public function index() {
        if(!$_SESSION['admin'])
            header("Location: ".BASE_URL);
        $header["header"] = "Schedules";
        $header["active"] = "Schedules";
        $this->view('templates/header', $header);
        $this->view('schedules/index');
        $this->view('templates/footer');
    }

    public function all() {
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/schedules" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $schedules = $this->model('Schedule')->getAllSchedules();
            $response['data'] = $schedules;
            $response['y_admin'] = $_SESSION['admin'];
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL."/schedules");
    }

    public function new() {
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/schedules" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $response = $this->model('Schedule')->addSchedule($_POST['date']);
            $response['message'] = "New schedule has been added";
            $createdSchedule = $this->model('Schedule')->getLatestCreatedSchedule();
            if($_POST['auto']== 'true'){
                $this->model('Schedule')->reschedule($createdSchedule['id']);
            }
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL."/schedules");
    }

    public function details() {
        if(!$_SESSION['admin'])
            header("Location: ".BASE_URL);
        if($_SERVER['REQUEST_METHOD'] != 'POST')
            header("Location: ".BASE_URL);
        $header["header"] = "Schedules";
        $header["active"] = "Schedules";
        $id = $_POST['schId'];
        $schedule = $this->model('Schedule')->getScheduleDate($id); 
        $data['unassignedDivisions'] = $this->model('Schedule')->getUnassignedDivisions($id);
        $data['assignedDivisions'] = $this->model('Schedule')->getAssignedDivisions($id);
        $data['date'] = $schedule['date'];
        $data['id'] = $id;
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/schedules/details" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            echo json_encode($data);
            exit;
        }
        $this->view('templates/header', $header);
        $this->view('schedules/details', $data);
        $this->view('templates/footer');
    }

    public function unassignedemployees(){
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/schedules/details" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $id = $_POST['id'];
            $response = $this->model('Schedule')->getUnassignedEmployees($id);
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL);
    }

    public function assign(){
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/schedules/details" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $scheduleId = $_POST['scheduleId'];
            $employeeId = $_POST['employeeId'];
            $divisionId = $_POST['divisionId'];
            $response = $this->model('Schedule')->assignSchedule($scheduleId, $employeeId, $divisionId);
            $response['message'] = "Employee has been assigned to this schedule!";
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL."/schedules");
    }

    public function unassign() {
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/schedules/details" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $scheduleId = $_POST['scheduleId'];
            $employeeId = $_POST['employeeId'];
            $divisionId = $_POST['divisionId'];
            $response = $this->model('Schedule')->unassignSchedule($scheduleId, $employeeId, $divisionId);
            $response['message'] = "Employee has been remove from this schedule!";
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL."/schedules");
    }

    public function delete(){
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/schedules" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $id = $_POST['id'];
            $response = $this->model('Schedule')->deleteSchedule($id);
            $response['message'] = "Selected schedule deleted!";
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL."/schedules");
    }
}

?>