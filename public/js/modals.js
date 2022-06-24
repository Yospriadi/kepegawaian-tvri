var addEmpDataModal = `
        <div class="modal add-emp-modal fade" tabindex="-1">
            <form class="modal-dialog modal-dialog-centered" id="newEmp" method="POST">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">New Employee</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex gap-3">
                            <div class="form-floating mb-3">
                                <input type="text" name="first_name" required class="form-control" id="firstName" placeholder="First Name">
                                <label for="firstName">First Name</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" name="last_name" class="form-control" id="lastName" placeholder="Last Name">
                                <label for="lastName">Last Name</label>
                            </div>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" required name="email" class="form-control" id="email" placeholder="name@example.com">
                            <label for="email">Email address</label>
                        </div>
                        <div class="form-floating">
                            <select class="form-select" required name="rank" id="rank" aria-label="Rank">

                            </select>
                            <label for="rank">Rank</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-success">Add</button>
                    </div>
                </div>
            </form>
        </div>
        `;

var deleteEmpModal = `
    <div class="modal fade delete-emp-modal" tabindex="-1">
        <form class="modal-dialog modal-dialog-centered delete-emp-form">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Delete Employee</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column text-center">
                <i class="bi bi-x-circle text-circle delete-icon text-danger"></i>
                <h4 class="px-5 pb-5">Are you sure want to delete this data?</h4>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">ID</span>
                    <span id="id"><span>
                </div>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">Name</span>
                    <span id="username"><span>
                </div>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">Email</span>
                    <span id="email"><span>
                </div>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">Rank</span>
                    <span id="rank"><span>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-danger">Delete</button>
            </div>
            </div>
        </form>
    </div>
`

var editEmpModal = `
        <div class="modal edit-emp-modal fade" tabindex="-1">
            <form class="modal-dialog modal-dialog-centered" id="editEmp" method="POST">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">New Employee</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex gap-3">
                            <div class="form-floating mb-3">
                                <input type="text" name="first_name" required class="form-control" id="firstName" placeholder="First Name">
                                <label for="firstName">First Name</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" name="last_name" class="form-control" id="lastName" placeholder="Last Name">
                                <label for="lastName">Last Name</label>
                            </div>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" name="email" disabled class="form-control" id="email" placeholder="email@gmail.com">
                            <label for="email">Email address</label>
                        </div>
                        <div class="form-floating">
                            <select class="form-select" required name="rank" id="rank" aria-label="Rank">

                            </select>
                            <label for="rank">Rank</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </form>
        </div>
        `;

var setAdmEmpModal = `
    <div class="modal fade set-adm-emp-modal" tabindex="-1">
        <form class="modal-dialog modal-dialog-centered set-adm-emp-form" method="post">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Delete Employee</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column text-center">
                <i class="bi bi-person-plus-fill text-circle delete-icon text-success"></i>
                <h4 class="px-5 pb-5">Are you sure want to set this user as admin?</h4>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">ID</span>
                    <span id="id"><span>
                </div>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">Name</span>
                    <span id="username"><span>
                </div>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">Email</span>
                    <span id="email"><span>
                </div>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">Rank</span>
                    <span id="rank"><span>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-success">Yes</button>
            </div>
            </div>
        </form>
    </div>
`

var rmvAdmEmpModal = `
    <div class="modal fade rmv-adm-emp-modal" tabindex="-1">
        <form class="modal-dialog modal-dialog-centered rmv-adm-emp-form" method="post">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Delete Employee</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column text-center">
                <i class="bi bi-person-plus-fill text-circle delete-icon text-danger"></i>
                <h4 class="px-5 pb-5">Are you sure want to remove this user as admin?</h4>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">ID</span>
                    <span id="id"><span>
                </div>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">Name</span>
                    <span id="username"><span>
                </div>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">Email</span>
                    <span id="email"><span>
                </div>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">Rank</span>
                    <span id="rank"><span>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-danger">Remove</button>
            </div>
            </div>
        </form>
    </div>
`

var addDivDataModal = `
    <div class="modal fade add-div-modal" tabindex="-1">
        <form class="modal-dialog modal-dialog-centered add-div-form">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add New Division</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="form-floating mb-3">
                    <input type="text" name="division-name" required class="form-control" id="division-name" placeholder="name@example.com">
                    <label for="division-name">Division Name</label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-success">Add</button>
            </div>
            </div>
        </form>
    </div>
`
var deleteDivModal = `
    <div class="modal fade delete-div-modal" tabindex="-1">
        <form class="modal-dialog modal-dialog-centered delete-div-form">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Delete Division</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column text-center">
                <i class="bi bi-x-circle text-circle delete-icon text-danger"></i>
                <h4 class="px-5 pb-2">Are you sure want to delete this data?</h4>
                <h5 class="division-name"><div class="alert alert-info"> </div></h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-danger">Delete</button>
            </div>
            </div>
        </form>
    </div>
`

var addScheduleModal = `
    <div class="modal fade add-sch-modal" tabindex="-1">
        <form class="modal-dialog modal-dialog-centered add-sch-form">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">New Schedule</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="schedule-date" class="col-form-label"><strong>Schedule Date :</strong></label>
                    <input type="date" name="schedule-date" class="form-control schedule-date" id="schedule-date">
                </div>
                <div class="mb-3">
                    <div class="row">
                        <div class="col-md-6">
                            <label for="" class="col-form-label"><strong>Auto assign :</strong></label>
                            <div class="ms-3 form-check">
                                <input class="form-check-input" name="auto-assign" type="checkbox" id="auto-assign" checked >
                                <label class="form-check-label" for="auto-assign">
                                    Auto assign
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary">New</button>
            </div>
            </div>
        </form>
    </div>
`

var deleteSchModal = `
    <div class="modal fade delete-sch-modal" tabindex="-1">
        <form class="modal-dialog modal-dialog-centered delete-sch-form">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Delete Schedule</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column text-center">
                <i class="bi bi-x-circle text-circle delete-icon text-danger"></i>
                <h4 class="px-5 pb-2">Are you sure want to delete this data?</h4>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">ID</span>
                    <span id="id"><span>
                </div>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">Date</span>
                    <span id="date"><span>
                </div>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">Handlers</span>
                    <span id="total-handler"><span>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-danger">Delete</button>
            </div>
            </div>
        </form>
    </div>
`

var schDetailsAssignModal = `
    <div class="modal fade assign-sch-modal" tabindex="-1">
        <form class="modal-dialog modal-dialog-centered assign-sch-form">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Assign Employees</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="form-floating mb-3">
                    <input type="text" name="date" required class="form-control assign-sch-details-date" id="date" placeholder="Date: ">
                    <label for="date">Date: </label>
                </div>
                <div class="form-floating mb-3">
                    <select name="employee_names" class="form-select" aria-label="Employee Name" id="employee_names">

                    </select>                  
                    <label for="employee_names">Select Employee</label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-success">Assign</button>
            </div>
            </div>
        </form>
    </div>
`

var removeSchModal = `
    <div class="modal fade remove-sch-modal" tabindex="-1">
        <form class="modal-dialog modal-dialog-centered remove-sch-form">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Remove Assignment</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column text-center">
                <i class="bi bi-x-circle text-circle delete-icon text-danger"></i>
                <h4 class="px-5 pb-2">Are you sure want to remove assignment for this user?</h4>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">Division</span>
                    <span id="division"><span>
                </div>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">Handler</span>
                    <span id="handler"><span>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-danger">Remove</button>
            </div>
            </div>
        </form>
    </div>
`

var unsetRankModal = `
    <div class="modal fade unset-rank-modal" tabindex="-1">
        <form class="modal-dialog modal-dialog-centered unset-rank-form">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Remove Rank</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column text-center">
                <i class="bi bi-x-circle text-circle delete-icon text-danger"></i>
                <h4 class="px-5 pb-2">Are you sure want to remove this rank?</h4>
                <span class="badge bg-info mb-3">All employee in this rank will be auto-set to Staff rank!</span>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">ID</span>
                    <span id="id"><span>
                </div>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">Rank</span>
                    <span id="rank"><span>
                </div>
                <div class="d-flex justify-content-between delete-data-list px-5">
                    <span class="fw-bold">Total Employees</span>
                    <span id="total-employees"><span>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-danger">Unset</button>
            </div>
            </div>
        </form>
    </div>
`

