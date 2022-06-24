var alertPlaceholder = $('.alert-placeholder')

var datatableOptions = (optional = {}) => {
    var options = {
        dom: "<'d-flex w-100 justify-content-between align-items-middle pb-3'<'d-flex clear gap-2'B>f><'clear'>rt<'d-flex justify-content-between'ip>",
        pagingType: 'full_numbers',
        responsive: true,
        language: {
            paginate: {
                first: '<i class="bi bi-chevron-double-left"></i>',
                last: '<i class="bi bi-chevron-double-right"></i>',
                previous: '<i class="bi bi-chevron-left"></i>',
                next: '<i class="bi bi-chevron-right"></i>'
            }
        }
    }
    if (optional.ordering)
        options.ordering = optional.ordering
    if (optional.order)
        options.order = optional.order
    if (optional.orderFixed)
        options.orderFixed = optional.orderFixed
    if (optional.initComplete)
        options.initComplete = optional.initComplete;
    if (optional.ajax)
        options.ajax = optional.ajax;
    if (optional.rowId)
        options.rowId = optional.rowId;
    if (optional.columns)
        options.columns = optional.columns;
    if (optional.buttons)
        options.buttons = optional.buttons;
    if (optional.preDrawCallback)
        options.preDrawCallback = optional.preDrawCallback;
    if (optional.columnDefs)
        options.columnDefs = optional.columnDefs
    return options;
};

// EMPLOYEE TABLE

var employeeTableButtons = [
    buttons = [
        {
            text: '+',
            className: 'add-emp-button',
            init: function (dt, node) {
                node.removeClass('btn-secondary')
                node.addClass('btn-primary')
            },
            action: function (e, dt, node) {
                $('body').append(addEmpDataModal);
                var addEmpModal = $('.add-emp-modal');
                var modal = new bootstrap.Modal(addEmpModal);
                addEmpModal.on('hidden.bs.modal', removeModalCallback);
                $.post({
                    url: base_url + "/employees/ranks",
                    dataType: 'json',
                    success: function (data) {
                        data.forEach(el => {
                            addEmpModal.find('#rank').append(`<option value="${el.id}">${el.name}</option>`);
                        });
                    }
                })
                $('form#newEmp').submit(function (e) {
                    e.preventDefault()
                    var form = new FormData(e.target)
                    $.post({
                        url: base_url + "/employees/new",
                        dataType: 'json',
                        data: { first_name: form.get('first_name'), last_name: form.get('last_name'), email: form.get('email'), rank: form.get('rank') },
                        success: function (response) {
                            if (response.status) {
                                alert(alertPlaceholder, response.message, response.status ? 'success' : 'danger');
                                return dt.ajax.reload(null, false)
                            }
                            alert(alertPlaceholder, getErrorMessage(response.error_code), response.ok ? 'success' : 'danger');
                        },
                        error: function (response) {
                            alert(alertPlaceholder, "Something went wrong when do this action.", 'danger');
                        }
                    })
                    modal.hide();
                })
                modal.show()
            }
        }
    ]
]

var employeeTableAjax = {
    url: base_url + "/employees/all",
    type: "POST",
    dataSrc: 'data'
}

var employeeTableColumns = [
    {
        data: null, title: "Name", width: '30%', render: function (data, type, row, meta) {
            var output = data.username
            if (data.admin_level > 0 && meta.settings.json.admin_level > 0)
                output += `  <span class="badge bg-danger badge-sm">Admin</span>`
            return output;
        }
    },
    {
        data: 'email', title: 'Email',
        render: function (data, type, row, meta) {
            if (!meta.settings.json.admin_level)
                return ''
            return data;
        }
    },
    { data: 'rank_name', title: "Rank", width: '30%%', orderable: false },
    {
        data: null,
        render: function (data, type, row, meta) {
            var output = `
                <div class="dropdown">
                    <button class="btn btn-sm btn-primary dropdown-toggle" type="button" id="employeeActions" data-bs-toggle="dropdown" aria-expanded="false">
                        Action
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="employeeActions">
            `;
            var y_level = meta.settings.json.admin_level;
            if (y_level > 0) {
                if (y_level == 10 && data.admin_level == 10)
                    return output += '<li><a role="button" class="dropdown-item emp-edit-btn">Edit</a></li></ul></div>'
                if (y_level <= data.admin_level)
                    return '-';
                if (y_level > data.admin_level)
                    output += `<li><a role="button" class="dropdown-item emp-edit-btn">Edit</a></li>
                                <li><a role="button" class="dropdown-item emp-dlt-btn">Delete</a></li>`
                if (y_level == 10)
                    if (data.admin_level < 1)
                        output += `<li><a role="button" class="dropdown-item emp-set-adm-btn">Set as admin</a></li>`;
                    else
                        output += `<li><a role="button" class="dropdown-item emp-rmv-adm-btn">Remove admin</a></li>`;
                output += `</ul></div>`
                return output;
            }
            return '-'
        },
        title: "Action",
        orderable: false,
        searchable: false
    },
    { data: 'rank', bVisible: false, searchable: false }
]

var employeeTableInit = function (settings, json) {
    if (!json.admin_level) {
        settings._buttons[0].inst.s.buttons[0].inserter.remove()
        settings.aoColumns[1].bVisible = false
        settings.aoColumns[3].bVisible = false
    }
}

// DIVISION TABLE

var divisionTableButtons = [
    buttons = [
        {
            text: '+',
            className: 'add-div-button',
            init: function (dt, node) {
                node.removeClass('btn-secondary')
                node.addClass('btn-primary')
            },
            action: function (e, dt, node) {
                $('body').append(addDivDataModal);
                var addDivModal = $('.add-div-modal')
                var modal = new bootstrap.Modal(addDivModal);
                addDivModal.on('hidden.bs.modal', removeModalCallback);
                $('.add-div-form').submit(function (e) {
                    e.preventDefault();
                    var data = new FormData(e.target);
                    $.post({
                        url: base_url + "/divisions/new",
                        dataType: 'json',
                        data: { name: data.get('division-name') },
                        success: function (response) {
                            if (response.status) {
                                alert(alertPlaceholder, response.message, response.status ? 'success' : 'danger');
                                return dt.ajax.reload(null, false)
                            }
                            alert(alertPlaceholder, getErrorMessage(response.error_code), response.ok ? 'success' : 'danger');
                        },
                        error: function (response) {
                            alert(alertPlaceholder, "Something went wrong when do this action.", 'danger');
                        }
                    })
                    modal.hide()
                })
                modal.show();
            }
        }
    ]
]

var divisionTableAjax = {
    url: base_url + "/divisions/all",
    type: "POST",
    dataSrc: 'data'
}

var divisionTableColumns = [
    {
        data: null,
        render: function (data, type, row, meta) {
            return meta.row + 1;
        },
        title: "#",
        width: '50px'
    },
    { data: 'name', title: "Name" },
    {
        data: null,
        render: function (data, type, row, meta) {
            if (!meta.settings.json.admin_level)
                return ''
            return `<button data-key='${data.id}' class='btn btn-sm btn-danger div-dlt-btn'>Delete</button>`
        },
        title: "Action",
        orderable: false,
        searchable: false
    }
]

var divisionTableInit = function (settings, json) {
    if (!json.admin_level) {
        settings._buttons[0].inst.s.buttons[0].inserter.remove()
        settings.aoColumns[2].bVisible = false
    }
}

// SCHEDULE TABLE

var scheduleTableButtons = [
    buttons = [
        {
            text: '+',
            className: 'add-sch-button',
            init: function (dt, node) {
                node.removeClass('btn-secondary')
                node.addClass('btn-primary')
            },
            action: function (e, dt, node, config) {
                $('body').append(addScheduleModal);
                var schModal = $('.add-sch-modal');
                var modal = new bootstrap.Modal(schModal);
                schModal.on('hidden.bs.modal', removeModalCallback);
                var schDate = flatpickr('.schedule-date', {
                    dateFormat: 'D, d M Y',
                    defaultDate: new Date(),
                    minDate: new Date()
                })
                $('.add-sch-form').submit(function (e) {
                    e.preventDefault();
                    var data = new FormData(e.target);
                    var date = flatpickr.formatDate(new Date(schDate.selectedDates), 'Y-m-d');
                    if (!!data.get('auto-assign')) {

                    }

                    $.post({
                        url: base_url + "/schedules/new",
                        data: { auto: !!data.get('auto-assign'), date: date },
                        dataType: 'json',
                        success: function (response) {
                            if (response.status) {
                                alert(alertPlaceholder, response.message, response.status ? 'success' : 'danger');
                                return dt.ajax.reload(null, false)
                            }
                            alert(alertPlaceholder, response.error_code == '23000' ? "There is already schedule with this date!" : '', response.ok ? 'success' : 'danger');
                        },
                        error: function (response) {
                            alert(alertPlaceholder, "Something went wrong when do this action.", 'danger');
                        }
                    })
                    modal.hide();
                })
                modal.show();
            }
        }
    ]
]

var scheduleTableAjax = {
    url: base_url + "/schedules/all",
    type: "POST",
    dataSrc: 'data'
}

var scheduleTableColumns = [
    {
        data: 'date', title: "Date", width: '50%', type: 'date', orderable: false,
        render(data) {
            return `${moment(data).format('ddd, DD MMMM YYYY')}`
        }
    },
    {
        data: 't_employee_assigned', title: "Total Handler", orderable: false
    },
    {
        data: null,
        orderable: false,
        searchable: false,
        title: 'Action',
        render: function (data, type, row, meta) {
            var buttons = `
                <form action="${base_url}/schedules/details" method="post">
                    <input name="schId" value="${data.id}" hidden></input>
                    <button type="submit" class="btn btn-sm btn-primary btn-vw-sch">Details</button>
            `
            if (moment(data.date).diff(new Date().toISOString(), 'days') >= 0 || meta.settings.json.y_admin == 10)
                buttons += `<button type="button" class="btn btn-sm btn-danger btn-dlt-sch">Delete</button>`
            buttons += '</form>';
            return buttons;
        }
    }
]