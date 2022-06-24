<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css"
        integrity="sha512-10/jx2EXwxxWqCLX/hHth/vu2KY3jCF70dCQB8TSgNjbCVAC/8vai53GfMDrO2Emgwccf2pJqxct9ehpzG+MTw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />


    <link href="<?= BASE_URL; ?>/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="<?= BASE_URL; ?>/public/css/datatables.min.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>/public/css/flatpickr.min.css">
    <link rel="stylesheet" href="<?= BASE_URL; ?>/public/css/flatpickr-dark.css">
    <link rel="stylesheet" href="<?= BASE_URL; ?>/public/css/style.css">
    <title>TVRI Management - <?= $data['header']; ?></title>
</head>

<body>

    <div class="sidebar-container">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <img src="<?= BASE_URL; ?>/images/logo.png" alt="" srcset="">
            </div>
            <div class="sidebar-label">Management</div>
        </div>
        <div class="sidebar-body">
            <a href="<?= BASE_URL; ?>" class="sidebar-link <?= $data['active'] == 'Dashboard' ? "active" : ''; ?>">
                <i class="fa fa-tachometer sidebar-link-icon" aria-hidden="true"></i> <span
                    class="sidebar-link-text">Dashboard</span>
            </a>
            <a href="<?= BASE_URL ?>/employees"
                class="sidebar-link  <?= $data['active'] == 'Employees' ? "active" : ''; ?>">
                <i class="fa fa-users sidebar-link-icon"></i> <span class="sidebar-link-text">Employees</span>
            </a>
            <a href="<?= BASE_URL ?>/divisions"
                class="sidebar-link <?= $data['active'] == "Divisions" ? "active" : ""; ?>">
                <i class="bi bi-person-rolodex sidebar-link-icon"></i> <span class="sidebar-link-text">Divisions</span>
            </a>
            <?php if($_SESSION['admin'] > 0): ?>
            <a href="<?= BASE_URL ?>/schedules"
                class="sidebar-link <?= $data['active'] == "Schedules" ? "active" : ""; ?>">
                <i class="bi bi-calendar-week sidebar-link-icon"></i> <span class="sidebar-link-text">Schedules</span>
            </a>
            <a href="<?= BASE_URL ?>/ranks" class="sidebar-link <?= $data['active'] == "Ranks" ? "active" : ""; ?>">
                <i class="bi bi-trophy-fill sidebar-link-icon"></i> <span class="sidebar-link-text">Ranks</span>
            </a>
            <?php endif; ?>

        </div>
        <div class="sidebar-footer">
            <div class="profile">
                <div class="sidebar-profile-image">
                    <img src="<?= BASE_URL; ?>/images/user.png" alt="Default user profile.">
                </div>
                <div class="sidebar-user-profile">
                    <span class="profile-name"><?= $_SESSION['username']; ?></span>
                    <span class="profile-rank"><?= $_SESSION['rank_name'] ?></span>
                </div>
                <a href="<?= BASE_URL; ?>/settings" class="icon-action"><i class="bi bi-gear"></i></a>
                <a href="<?= BASE_URL; ?>/dashboard/logout" class="icon-action"><i class="bi bi-box-arrow-left"></i></a>
            </div>
            <div class="alt-icon-action">
                <a href="<?= BASE_URL; ?>/settings" class="icon-action"><i class="bi bi-gear"></i></a>
            </div>
            <div class="alt-icon-action">
                <a href="<?= BASE_URL; ?>/dashboard/logout" class="icon-action"><i class="bi bi-box-arrow-left"></i></a>
            </div>
        </div>
        <div class="copyright">
            &copy; 2021 - 2022
        </div>
    </div>


    <div class="content-container">
        <header>
            <button class="sidebar-toggle"><i class="fa-solid fa-bars"></i></button>
            <h4><?= $data['header']; ?></h4>
            <h5 class="pe-3"><?= date_format(new DateTime(), "D, d F Y") ?></h5>
        </header>
        <div class="content">
            <div class="alert-placeholder"></div>