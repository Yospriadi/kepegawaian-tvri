<?php

class Employees extends Controller {
    public function index() {
        if(empty($_SESSION))
            return header("Location: ".BASE_URL."/login");
        
        $header["header"] = "Employees";
        $header["active"] = "Employees";

        $this->view("templates/header", $header);
        $this->view("employees/index");
        $this->view("templates/footer");
    }

    public function all() {
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && (rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/employees" || rtrim($_SERVER['HTTP_REFERER'], '/ ') == BASE_URL.'/schedules') && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $employees = $this->model('Employee')->getAllEmployee();
            $response['admin_level'] = $this->model('Employee')->getAdminLevel($_SESSION['id'])['admin_level'];
            $response['data'] = $employees;
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL.'/employees');
    }

    public function ranks() {
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/employees" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $ranks = $this->model('Employee')->getAvailableRanks();
            $response = $ranks;
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL.'/employees');
    }

    public function new(){
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/employees" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $data['first_name'] = $_POST['first_name'];
            $data['last_name'] = $_POST['last_name'];
            $data['email'] = $_POST['email'];
            $data['rank'] = $_POST['rank'];
            $response = $this->model('Employee')->addNewEmployee($data);
            $response['message'] = "Success adding new employee data.";
            echo json_encode($response);
            exit;
        }
    }

    public function delete() {
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/employees" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $id = $_POST['id'];
            $response = $this->model('Employee')->deleteEmployeeById($id);
            $response['message'] = "Selected employee deleted.";
            echo json_encode($response);
            exit;
        }
    }

    public function updatepassword(){
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/settings" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $oldPassword = $_POST['oldPassword'];
            $newpassword = $_POST['newPassword'];
            $id = $_SESSION['id'];
            $result = $this->model('Employee')->verifyPassword($id, $oldPassword);
            if(!$result){
                $response['status'] = false;
                $response["message"] = "You entered the wrong password";
                echo json_encode($response);
                exit;
            }
            $response['status'] = $this->model('Employee')->changePassword($id, $newpassword);
            $response['message'] = "Password changed!";
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL."/settings");
    }

    public function setadmin(){
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/employees" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $id = $_POST['id'];
            $response['status'] = $this->model('Employee')->setAdmin($id);
            $response['message'] = "Added new admin";
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL."/employees");
    }

    public function removeadmin(){
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/employees" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $id = $_POST['id'];
            $response['status'] = $this->model('Employee')->removeAdmin($id);
            $response['message'] = "Removing admin success!";
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL."/employees");
    }

    public function edit(){
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/employees" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $id = $_POST['id'];
            $data['first_name'] = $_POST['first_name'];
            $data['last_name'] = $_POST['last_name'];
            $data['rank'] = $_POST['rank'];
            $response['status'] = $this->model("Employee")->update($id, $data);
            $response['message'] = "Employee data edited!";
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL."/employees");
    }
}

?>