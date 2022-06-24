<div class="welcome-message text-center h5 py-2">
    Schedule on: <?= $data['date']; ?>
    <input hidden value="<?= $data['id']; ?>" type="text" class="schedule-identifier">
</div>

<table class="table table-light table-bordered table-striped schedule-details-table">
    <thead class="table-dark">
        <tr>
            <th>Division</th>
            <th>Handler</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>

    </tbody>
</table>