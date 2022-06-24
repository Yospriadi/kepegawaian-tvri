<?php

class Login extends Controller {

    public function index() {
        if(isset($_SESSION['login'])) header("Location: ".BASE_URL);
        $this->view("login/index", ["header" => "Login"]);
    }

    public function login() {
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/login" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $response = [];
            $email = $_POST['email'];
            $password = $_POST['password'];
            $user = $this->model('Employee')->getEmployeeByEmail($email);
            if(!$user) {
                $response['ok'] = false;
                $response['error_message'] = "$email is not registered!";
                echo json_encode($response);
                exit;
            }
            if(!password_verify($password, $user['password'])){
                $response['ok'] = false;
                $response['error_message'] = "You entered the wrong password";
                echo json_encode($response);
                exit;
            }

            $_SESSION['id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['admin'] = $user['admin_level'];
            $_SESSION['rank'] = $user['rank'];
            $_SESSION['rank_name'] = $user['rank_name'];

            $response['ok'] = true;
            $response['message'] = 'Login success';
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL);
    }
}

?>