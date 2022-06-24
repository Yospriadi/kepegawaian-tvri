<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="<?= BASE_URL; ?>/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="<?= BASE_URL; ?>/css/login-page.css">
    <title>TVRI Management - Login</title>
</head>

<body class="text-center">
    <div class="form-signin">
        <form method="POST">
            <img class="mb-4" src="<?= BASE_URL; ?>/images/logo.png" alt="TVRI Logo" width="72" height="57">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
            <div class="flasher">

            </div>
            <div class="form-floating">
                <input type="email" class="form-control" name="email" required id="floatingInput"
                    placeholder="Email Address">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" name="password" required id="floatingPassword"
                    placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2021–2022</p>
        </form>
    </div>

    <script src="<?= BASE_URL; ?>/js/jquery-3.6.0.min.js"></script>
    <script src="<?= BASE_URL; ?>/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous">
    </script>
    <script src="<?= BASE_URL; ?>/js/utils.js"></script>
    <script src="<?= BASE_URL; ?>/js/login-page.js"></script>
</body>

</html>