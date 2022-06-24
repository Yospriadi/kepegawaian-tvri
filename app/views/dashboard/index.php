<div class="welcome-message text-center h5 py-2">
    Today Schedule
</div>
<?php if(!empty($data['schedule'])): ?>
<table class="table table-light table-bordered table-striped">
    <thead class="table-dark">
        <tr>
            <th>#</th>
            <th>Division</th>
            <th>Handler</th>
        </tr>
    </thead>
    <tbody>
        <?php $i = 1; ?>
        <?php foreach($data['schedule'] as $schedule): ?>
        <tr>
            <td><?= $i++; ?></td>
            <td><?= $schedule['division_name']; ?></td>
            <td><?= $schedule['employee_name']; ?></td>
        </tr>
        <?php endforeach; ?>
    </tbody>
</table>
<?php else: ?>
<div class="w-100 h-100 d-flex empty-page">
    No schedule available today!
</div>
<?php endif; ?>