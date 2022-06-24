$(function () {
    var alertPlaceholder = $('.alert-placeholder');

    var sidebarToggler = $('.sidebar-toggle');
    var sidebar = $('.sidebar-container');

    sidebarToggler.click(function (e) {
        sidebar.toggleClass('close');
    })

    var employeeTable = $('.employee-table').DataTable(datatableOptions({
        rowId: "id",
        ajax: employeeTableAjax,
        buttons: employeeTableButtons,
        columns: employeeTableColumns,
        initComplete: employeeTableInit,
        orderFixed: [4, 'asc']
    }));

    $('.employee-table').on('click', '.emp-dlt-btn', function (e) {
        var data = employeeTable.row($(this).parents('tr')).data()
        $('body').append(deleteEmpModal);
        var empModal = $('.delete-emp-modal')
        var modal = new bootstrap.Modal(empModal);
        empModal.on('hidden.bs.modal', removeModalCallback)
        empModal.find('#id').text(data.id)
        empModal.find('#username').text(data.username)
        empModal.find('#email').text(data.email)
        empModal.find('#rank').text(data.rank_name)
        $('.delete-emp-form').submit(function (e) {
            console.log('submit')
            e.preventDefault()
            $.post({
                url: 'http://localhost/kepegawaian-tvri/employees/delete',
                dataType: 'json',
                data: { id: data.id },
                success: function (response) {
                    if (response.status) {
                        alert(alertPlaceholder, response.message, response.status ? 'success' : 'danger');
                        return employeeTable.ajax.reload(null, false)
                    }
                    alert(alertPlaceholder, getErrorMessage(response.error_code), response.ok ? 'success' : 'danger');
                },
                error: function () {
                    alert(alertPlaceholder, "Something went wrong do this action.", 'danger');
                }
            })
            modal.hide();
        })
        modal.show()
    });

    $('.employee-table').on('click', '.emp-set-adm-btn', function (e) {
        $('body').append(setAdmEmpModal);
        var setAdmModal = $('.set-adm-emp-modal');
        var modal = new bootstrap.Modal(setAdmModal);
        var data = employeeTable.row($(this).parents('tr')).data()
        setAdmModal.on('hidden.bs.modal', removeModalCallback)
        setAdmModal.find('#id').text(data.id)
        setAdmModal.find('#username').text(data.username)
        setAdmModal.find('#email').text(data.email)
        setAdmModal.find('#rank').text(data.rank_name)
        $('.set-adm-emp-form').submit(function (e) {
            console.log('cl')
            e.preventDefault()
            $.post({
                url: base_url + "/employees/setadmin",
                dataType: 'json',
                data: { id: data.id },
                success: function (response) {
                    if (response.status) {
                        alert(alertPlaceholder, response.message, response.status ? 'success' : 'danger');
                        return employeeTable.ajax.reload(null, false)
                    }
                    alert(alertPlaceholder, getErrorMessage(response.error_code), response.ok ? 'success' : 'danger');
                },
                error: function () {
                    alert(alertPlaceholder, "Something went wrong do this action.", 'danger');
                }
            })
            modal.hide()
        })
        modal.show()
    })

    $('.employee-table').on('click', '.emp-rmv-adm-btn', function (e) {
        $('body').append(rmvAdmEmpModal);
        var rmvAdmModal = $('.rmv-adm-emp-modal');
        var modal = new bootstrap.Modal(rmvAdmModal);
        var data = employeeTable.row($(this).parents('tr')).data()
        rmvAdmModal.on('hidden.bs.modal', removeModalCallback)
        rmvAdmModal.find('#id').text(data.id)
        rmvAdmModal.find('#username').text(data.username)
        rmvAdmModal.find('#email').text(data.email)
        rmvAdmModal.find('#rank').text(data.rank_name)
        $('.rmv-adm-emp-form').submit(function (e) {
            e.preventDefault()
            $.post({
                url: base_url + "/employees/removeadmin",
                dataType: 'json',
                data: { id: data.id },
                success: function (response) {
                    if (response.status) {
                        alert(alertPlaceholder, response.message, response.status ? 'success' : 'danger');
                        return employeeTable.ajax.reload(null, false)
                    }
                    alert(alertPlaceholder, getErrorMessage(response.error_code), response.ok ? 'success' : 'danger');
                },
                error: function () {
                    alert(alertPlaceholder, "Something went wrong do this action.", 'danger');
                }
            })
            modal.hide()
        })
        modal.show()
    })

    $('.employee-table').on('click', '.emp-edit-btn', function (e) {
        $('body').append(editEmpModal);
        var editEmpData = $('.edit-emp-modal');
        var modal = new bootstrap.Modal(editEmpData);
        var data = employeeTable.row($(this).parents('tr')).data()
        editEmpData.on('hidden.bs.modal', removeModalCallback)
        editEmpData.find('#firstName').val(data.username.split(' ')[0])
        editEmpData.find('#lastName').val(data.username.split(' ')[1])
        editEmpData.find('#email').val(data.email)
        var ranksSelect = editEmpData.find('#rank')
        var rankName = data.rank_name;
        $.post({
            url: base_url + "/employees/ranks",
            dataType: 'json',
            success: function (data) {
                data.forEach(el => {
                    ranksSelect.append(`<option value="${el.id}" ${el.name == rankName ? "selected" : ""}>${el.name}</option>`);
                });
            }
        })
        $('form#editEmp').submit(function (e) {
            e.preventDefault();
            var formData = new FormData(e.target);
            console.log(data.id)
            $.post({
                url: base_url + "/employees/edit",
                dataType: 'json',
                data: { id: data.id, first_name: formData.get('first_name'), last_name: formData.get('last_name'), rank: formData.get('rank') },
                success: function (response) {
                    if (response.status) {
                        alert(alertPlaceholder, response.message, response.status ? 'success' : 'danger');
                        return employeeTable.ajax.reload(null, false)
                    }
                    alert(alertPlaceholder, getErrorMessage(response.error_code), response.ok ? 'success' : 'danger');
                },
                error: function () {
                    alert(alertPlaceholder, "Something went wrong do this action.", 'danger');
                }
            })
            modal.hide()
        })
        modal.show()
    })

    var divisionTable = $('.division-table').DataTable(datatableOptions({
        rowId: 'id',
        buttons: divisionTableButtons,
        ajax: divisionTableAjax,
        columns: divisionTableColumns,
        initComplete: divisionTableInit
    }))

    $('.division-table').on('click', '.div-dlt-btn', function (e) {
        var data = divisionTable.row($(this).parents('tr')).data()
        $('body').append(deleteDivModal);
        var divModal = $('.delete-div-modal');
        var modal = new bootstrap.Modal(divModal);
        divModal.on('hidden.bs.modal', removeModalCallback);
        $('.division-name').children('div').text(data.name)
        $('.delete-div-form').submit(function (e) {
            e.preventDefault()
            $.post({
                url: base_url + '/divisions/delete',
                dataType: 'json',
                data: { id: data.id },
                success: function (response) {
                    if (response.status) {
                        alert(alertPlaceholder, response.message, response.status ? 'success' : 'danger');
                        return divisionTable.ajax.reload(null, false)
                    }
                    alert(alertPlaceholder, getErrorMessage(response.error_code), response.ok ? 'success' : 'danger');
                },
                error: function () {
                    alert(alertPlaceholder, "Something went wrong when do this action.", 'danger');
                }
            })
            modal.hide();
        })
        modal.show();
    })

    // Schedule

    $.fn.dataTable.moment('ddd, DD MMMM YYYY')

    var scheduleTable = $('.schedule-table').DataTable(datatableOptions({
        ajax: scheduleTableAjax,
        columns: scheduleTableColumns,
        order: [[0, 'desc']],
        buttons: scheduleTableButtons,
        rowId: 'id',
        ordering: false,
    }))

    $('.schedule-table').on('click', '.btn-dlt-sch', function (e) {
        var data = scheduleTable.row($(this).parents('tr')).data()
        $('body').append(deleteSchModal);
        var schModal = $('.delete-sch-modal')
        var modal = new bootstrap.Modal(schModal);
        schModal.on('hidden.bs.modal', removeModalCallback)
        $('span#id').text(data.id);
        $('span#date').text(moment(data.date).format('ddd, DD MMMM YYYY'))
        $('span#total-handler').text(data.t_employee_assigned)
        $('.delete-sch-form').submit(function (e) {
            e.preventDefault()
            $.post({
                url: base_url + '/schedules/delete',
                data: { id: data.id },
                dataType: 'json',
                success: function (response) {
                    if (response.status) {
                        alert(alertPlaceholder, response.message, response.status ? 'success' : 'danger');
                        return scheduleTable.ajax.reload(null, false)
                    }
                    alert(alertPlaceholder, getErrorMessage(response.error_code), response.ok ? 'success' : 'danger');
                },
                error: function () {
                    alert(alertPlaceholder, "Something went wrong when do this action.", 'danger');
                }
            })
            modal.hide()
        })
        modal.show()
    })

    function reloadScheduleTable() {
        $.post({
            url: base_url + "/schedules/details",
            data: {
                schId: $('.schedule-identifier').val()
            },
            dataType: 'json',
            success: function (response) {
                var table_body = $('.schedule-details-table').children('tbody');
                table_body.html('');
                console.log(response)
                if (!response.unassignedDivisions.length && !response.assignedDivisions.length)
                    return table_body.append(`
                        <tr>
                            <td colspan="100%">
                                There is no division to assign!
                            </td>
                        </tr>
                    `)
                response.unassignedDivisions.forEach(e => {
                    if (moment(new Date(response.date).toISOString()).diff(new Date().toISOString(), 'days') < 0)
                        table_body.append(`
                        <tr data-div="${e.id}">
                            <td>${e.name}</td>
                            <td>${e.username ? e.username : "<i>Empty</i>"}</td>
                            <td> - </td>
                        </tr>
                        `)
                    else
                        table_body.append(`
                        <tr data-div="${e.id}">
                            <td>${e.name}</td>
                            <td>${e.username ? e.username : "<i>Empty</i>"}</td>
                            <td><button type="button" class="btn btn-sm btn-success btn-assign">Assign</button></td>
                        </tr>
                    `)
                })
                response.assignedDivisions.forEach(e => {
                    if (moment(new Date(response.date).toISOString()).diff(new Date().toISOString(), 'days') < 0)
                        table_body.append(`
                        <tr data-div="${e.id}">
                            <td>${e.name}</td>
                            <td>${e.username ? e.username : "<i>Empty</i>"}</td>
                            <td> - </td>
                        </tr>
                        `)
                    else
                        table_body.append(`
                        <tr data-div="${e.division_id}" data-emp="${e.id}">
                            <td class="div-name">${e.name}</td>
                            <td class="emp-name">${e.username}</td>
                            <td><button type="button" class="btn btn-sm btn-danger btn-remove">Remove</button></td>
                        </tr>
                    `)
                })
            }
        })
    }

    if ($('table').hasClass('schedule-details-table'))
        reloadScheduleTable()

    $('.schedule-details-table').on('click', '.btn-assign', function (e) {
        var row = $(this).parents('tr');
        var divId = row.attr('data-div');
        var schId = $('.schedule-identifier').val()
        var date = $('.welcome-message').text().split(':')[1];
        $('body').append(schDetailsAssignModal);
        var schDtlModal = $('.assign-sch-modal');
        var modal = new bootstrap.Modal(schDtlModal);

        $('.assign-sch-details-date').val(date)
        $('.assign-sch-details-date').attr('disabled', 1)

        schDtlModal.on('hidden.bs.modal', removeModalCallback);

        $('.assign-sch-form').submit(function (e) {
            e.preventDefault()
            var data = new FormData(e.target);
            $.post({
                url: base_url + '/schedules/assign',
                data: { scheduleId: schId, divisionId: divId, employeeId: data.get('employee_names') },
                dataType: 'json',
                success: function (response) {
                    if (response.status) {
                        alert(alertPlaceholder, response.message, response.status ? 'success' : 'danger');
                        return reloadScheduleTable()
                    }
                    alert(alertPlaceholder, getErrorMessage(response.error_code), response.ok ? 'success' : 'danger');
                },
                error: function () {
                    alert(alertPlaceholder, "Something went wrong when do this action.", 'danger');
                }
            })
            modal.hide();
        })

        $.post({
            url: base_url + "/schedules/unassignedemployees",
            data: { id: schId },
            dataType: "json",
            success: function (response) {
                if (!response.length) {
                    $('select#employee_names').append(`<option selected>No employees found to assign</option>`)
                    $('button[type="submit"]').attr("disabled", 1);
                    return;
                }
                response.forEach(d => {
                    $('select#employee_names').append(`<option value="${d.id}">${d.username}</option>`)
                });
            },
            error: function (response) {
                console.log(response)
            }
        })

        modal.show()
    })

    $('.schedule-details-table').on('click', '.btn-remove', function (e) {
        var row = $(this).parents('tr');
        var divId = row.attr('data-div');
        var empId = row.attr('data-emp');
        var schId = $('.schedule-identifier').val()

        var divName = row.children('td.div-name').text();
        var empName = row.children('td.emp-name').text()
        console.log(empName)

        $('body').append(removeSchModal);
        var schModal = $('.remove-sch-modal');
        var modal = new bootstrap.Modal(schModal);
        schModal.on('hidden.bs.modal', removeModalCallback);

        $('span#division').text(divName);
        $('span#handler').text(empName)

        $('.remove-sch-form').submit(function (e) {
            e.preventDefault()
            $.post({
                url: base_url + '/schedules/unassign',
                data: { scheduleId: schId, employeeId: empId, divisionId: divId },
                dataType: "json",
                success: function (response) {
                    if (response.status) {
                        alert(alertPlaceholder, response.message, response.status ? 'success' : 'danger');
                        return reloadScheduleTable()
                    }
                    alert(alertPlaceholder, getErrorMessage(response.error_code), response.ok ? 'success' : 'danger');
                },
                error: function () {
                    alert(alertPlaceholder, "Something went wrong when do this action.", 'danger');
                }
            })
            modal.hide();
        })
        modal.show()
    })

    function resetChangePassForm() {
        matchIndicator.html('<i class= "bi bi-x-circle" ></i >');
        matchIndicator.removeClass('btn-success');
        matchIndicator.addClass('btn-danger');
        confirmPasswordInput.prop('disabled', true);
        matchIndicator.addClass('disabled');
        submitButton.addClass('disabled');
    }

    $('#changePasswordForm').submit(function (e) {
        e.preventDefault();
        var data = new FormData(e.target);
        var currentPassword = data.get('currentPassword');
        var newPassword = data.get('newPassword');
        var form = $(this);
        $.post({
            url: base_url + "/employees/updatepassword",
            data: { oldPassword: currentPassword, newPassword: newPassword },
            dataType: 'json',
            success: function (response) {
                if (response.status) {
                    alert(alertPlaceholder, response.message, response.status ? 'success' : 'danger');
                    form.trigger('reset')
                    resetChangePassForm()
                    return;
                }
                if (!response.status & response.error_code == null)
                    return alert(alertPlaceholder, response.message, response.ok ? 'success' : 'danger');
                alert(alertPlaceholder, getErrorMessage(response.error_code), response.ok ? 'success' : 'danger');
            },
            error: function () {
                alert(alertPlaceholder, "Something went wrong when do this action.", 'danger');
            }
        })
    })


    var confirmPasswordInput = $('input#confirmPassword');
    var matchIndicator = $('button#matchIndicator');
    var submitButton = $('button#submitChange');
    var newPass;

    $('input#newPassword').on('keyup', function (e) {
        newPass = $(this).val()
        if (!newPass) {
            confirmPasswordInput.prop('disabled', true);
            matchIndicator.addClass('disabled');
        }
        else {
            confirmPasswordInput.prop('disabled', false);
            matchIndicator.removeClass('disabled')
        }
    })

    $('input#confirmPassword').on('keyup', function (e) {
        var val = $(this).val();
        if (val == newPass) {
            matchIndicator.html('<i class="bi bi-check-circle"></i>');
            matchIndicator.removeClass('btn-danger');
            matchIndicator.addClass('btn-success');
            submitButton.removeClass('disabled');
        } else {
            matchIndicator.html('<i class= "bi bi-x-circle" ></i >');
            matchIndicator.removeClass('btn-success');
            matchIndicator.addClass('btn-danger');
            submitButton.addClass('disabled');
        }
    })

    function reloadRanksTable() {
        $('table.table-ranks').find('tbody').html('')
        $.post({
            url: base_url + "/ranks/all",
            dataType: 'json',
            success: function (response) {
                var tbody = $('.table-ranks').find('tbody');
                response.data.forEach(e => {

                    var output = '';
                    output += `
                        <tr data-key="${e.id}">
                            <td>${e.id}</td>
                            <td>${e.name ? e.name : '-'}</td>
                            <td>${e.employee_count}</td>
                            <td>
                    `
                    if (response.a_level == 10) {
                        output += `<button class="btn btn-sm btn-primary btn-change-rank-name">Change</button> `
                        if (e.name && e.id != 10)
                            output += `<button class="btn btn-sm btn-danger btn-unset-rank-name">Unset</button>`
                    } else {
                        if (response.y_level < e.id) {
                            output += `<button class="btn btn-sm btn-primary btn-change-rank-name">Change</button> `
                            if (e.name && e.id != 10)
                                output += `<button class="btn btn-sm btn-danger btn-unset-rank-name">Unset</button>`
                        } else
                            output += '-'
                    }
                    output += "</td>"
                    tbody.append(output);
                })
            }
        })
    }

    if ($('table').hasClass('table-ranks'))
        reloadRanksTable()

    var bName;

    $('.table-ranks').on('click', '.btn-change-rank-name', function (e) {
        var row = $(this).parents('tr');
        var id = row.find('td:first-child()').text()
        var tdName = row.find('td:nth-child(2)');
        tdName.prop('contenteditable', true);
        var cell, range;
        if (window.getSelection && document.createRange) {
            range = document.createRange()
            range.selectNodeContents(tdName.get(0));
            cell = window.getSelection()
            cell.removeAllRanges()
            cell.addRange(range)
        } else if (document.body.createTextRange) {
            range = document.body.createTextRange()
            range.moveToElementText(tdName.get(0))
            range.select();
        }
        alert(alertPlaceholder, "Editing rank id " + id + ", press <strong>ESC</strong> to cancel.", 'success');
        bName = tdName.text()
    })

    $('.table-ranks').on('focusout', 'td:nth-child(2)', function (e) {
        $(this).prop('contenteditable', false)
    })

    $('.table-ranks').on('keydown', 'td:nth-child(2)', function (e) {
        var id = $(this).parents('tr').find('td:first-child()').text()
        var td = $(this).parents('tr').find('td:nth-child(2)');
        if (e.key == 'Escape') {
            td.text(bName)
            td.prop('contenteditable', false)
            alert(alertPlaceholder, "Edit canceled", 'danger')
            return false;
        } else if (e.key == 'Enter') {
            if (bName == '') {
                td.text(bName)
                td.prop('contenteditable', false)
                alert(alertPlaceholder, "Edit canceled", 'danger')
                return false;
            } else if (bName != td.text()) {
                $.post({
                    url: base_url + "/ranks/update",
                    data: { id: id, newName: td.text() },
                    dataType: 'json',
                    success: function (response) {
                        if (response.status) {
                            alert(alertPlaceholder, response.message, response.status ? 'success' : 'danger');
                            td.prop('contenteditable', false)
                            reloadRanksTable()
                            return;
                        }
                        alert(alertPlaceholder, getErrorMessage(response.error_code), response.ok ? 'success' : 'danger');
                    },
                    error: function () {
                        alert(alertPlaceholder, "Something went wrong when do this action.", 'danger');
                    }
                })
            }
            return false;
        }
    })


    $('.table-ranks').on('click', '.btn-unset-rank-name', function (e) {
        $('body').append(unsetRankModal);
        var tr = $(this).parents('tr');
        var id = tr.find('td:first-child()').text()
        var name = tr.find('td:nth-child(2)').text()
        var count = tr.find('td:nth-child(3)').text()
        var unsetModal = $('.unset-rank-modal');
        var modal = new bootstrap.Modal(unsetModal);
        unsetModal.on('hidden.bs.modal', removeModalCallback);
        unsetModal.find('#id').text(id)
        unsetModal.find('#rank').text(name);
        unsetModal.find('#total-employees').text(count)

        $('.unset-rank-form').submit(function (e) {
            e.preventDefault()
            var form = new FormData(e.target);
            $.post({
                url: base_url + "/ranks/unset",
                data: { id: id },
                dataType: 'json',
                success: function (response) {
                    if (response.status) {
                        alert(alertPlaceholder, response.message, response.status ? 'success' : 'danger');
                        reloadRanksTable()
                        return;
                    }
                    alert(alertPlaceholder, getErrorMessage(response.error_code), response.ok ? 'success' : 'danger');
                },
                error: function () {
                    alert(alertPlaceholder, "Something went wrong when do this action.", 'danger');
                }
            })
            modal.hide()
        })

        modal.show()
    })
})

