<form class="col-md-6" id="changePasswordForm">
    <h6 class="fw-bold">Change Password:</h6>
    <div class="mb-3">
        <label for="currentPassword" class="form-label">Current Password: </label>
        <div class="input-group">
            <input type="password" required name="currentPassword" class="form-control" id="currentPassword"
                placeholder="Current password">
        </div>
    </div>
    <div class="mb-3">
        <label for="newPassword" class="form-label">New Password: </label>
        <div class="input-group">
            <input type="password" required name="newPassword" class="form-control" id="newPassword"
                placeholder="New password">
        </div>
    </div>
    <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password: </label>
        <div class="input-group">
            <input type="password" required name="confirmPassword" class="form-control" disabled id="confirmPassword"
                placeholder="Confirm password">
            <button type="button" class="btn btn-danger disabled" id="matchIndicator"><i
                    class="bi bi-x-circle"></i></button>
        </div>
    </div>
    <div class="col-auto d-flex justify-content-end">
        <button type="submit" class="btn btn-primary mb-3 disabled" id="submitChange">Save change</button>
    </div>
</form>