<?php
    
class Divisions extends Controller {

    public function index() {
        if(empty($_SESSION))
            return header("Location: ".BASE_URL."/login");
        
        $header["header"] = "Divisions";
        $header["active"] = "Divisions";
        
        $this->view('templates/header', $header);
        $this->view("divisions/index");
        $this->view('templates/footer');
    }

    public function all() {
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/divisions" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $divisions = $this->model('Division')->getAllDivisions();
            $data['admin_level'] = $this->model('Employee')->getAdminLevel($_SESSION['id'])['admin_level'];
            $data['data'] = $divisions;
            echo json_encode($data);
            exit;
        }
        header("Location: ".BASE_URL."/divisions");
    }

    public function new (){
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/divisions" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $name = $_POST['name'];
            $response = $this->model('Division')->addNewDivision($name);
            $response['message'] = "Success adding new division";
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL."/divisions");   
    }

    public function delete() {
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/divisions" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $id = $_POST['id'];
            $response = $this->model('Division')->deleteDivisionById($id);
            $response['message'] = "Division delete success.";
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL."/divisions");   
    }
}
?>