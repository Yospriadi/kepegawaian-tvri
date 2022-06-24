<?php 

class Ranks extends Controller {
    public function index(){
        if(!$_SESSION['admin'])
            header("Location: ".BASE_URL);
        $header["header"] = "Ranks";
        $header["active"] = "Ranks";
        
        $this->view('templates/header', $header);
        $this->view('ranks/index');
        $this->view('templates/footer');
    }

    public function update(){
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/ranks" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $id = $_POST['id'];
            $newName = $_POST['newName'];
            $response['status'] = $this->model("Rank")->updateRankName($id, $newName);
            $response['message'] = "Rank updated";
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL);
    }

    public function all(){
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/ranks" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $data['y_level'] = $_SESSION['rank'];
            $data['a_level'] = $_SESSION['admin'];
            $data['data'] = $this->model('Rank')->getAllRanks();
            echo json_encode($data);
            exit;
        }
        header("Location: ".BASE_URL);
    }

    public function unset(){
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_SERVER['HTTP_REFERER']) && rtrim($_SERVER['HTTP_REFERER'], '/ ')==BASE_URL."/ranks" && $_SERVER['REQUEST_METHOD'] == 'POST'){
            $id = $_POST['id'];
            $response['status'] = $this->model("Rank")->unsetRank($id);
            $response['message'] = "Success unset the rank.";
            echo json_encode($response);
            exit;
        }
        header("Location: ".BASE_URL);
    }
}

?>