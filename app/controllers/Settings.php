<?php 

class Settings extends Controller {
    public function index(){
        $header['active'] = '';
        $header['header'] = "Account Settings";

        $this->view('templates/header', $header);
        $this->view('settings/index');
        $this->view('templates/footer');
    }
}

?>