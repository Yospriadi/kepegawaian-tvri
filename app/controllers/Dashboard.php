<?php

class Dashboard extends Controller {

    public function index() {
        if(empty($_SESSION))
            return header("Location: ".BASE_URL."/login");
        
        $schedule = $this->model('Schedule')->getTodaySchedule();
        $data['schedule'] = $schedule;

        $header["header"] = "Dashboard";
        $header["active"] = "Dashboard";
        $this->view('templates/header', $header);
        $this->view('dashboard/index', $data);
        $this->view('templates/footer');
    }

    public function logout() {
        session_destroy();
        unset($_SESSION);
        session_reset();
        header('Location: '.BASE_URL.'/login');
    }
}

?>