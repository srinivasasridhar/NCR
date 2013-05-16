
//WebSQL

var isNew = "1";
var updateId = "0";



var showEdit;
 
var showNew = function () {
    var box = Ext.getCmp('addNewForm');
    box.show();

    var btn = Ext.getCmp('btnSubmit');
    btn.show();

    var list = Ext.getCmp('list');
    list.hide();

    var btnBack = Ext.getCmp('btnBack');
    btnBack.setHidden(false);

    var btnAdd = Ext.getCmp('btnAdd');
    btnAdd.setHidden(true);

    var btnSync = Ext.getCmp('SyncBtn');
    btnSync.setHidden(true);
}

var hideNew = function () {
    var addBox = Ext.getCmp('addNewForm');
    addBox.hide();
    var btn = Ext.getCmp('btnSubmit');
    btn.hide();

    var list = Ext.getCmp('list');
    list.show();


    var btnBack = Ext.getCmp('btnBack');
    btnBack.setHidden(true);

    var btnSync = Ext.getCmp('SyncBtn');
    btnSync.setHidden(false);

    var btnAdd = Ext.getCmp('btnAdd');
    btnAdd.setHidden(false);
}

var deleteRow = function (id) {
    Ext.Msg.confirm("Delete", "Are you sure?", function (btn) {
        if (btn == 'yes') {
            db.transaction(function (tx) {
                tx.executeSql('DELETE FROM tblNCRDetails WHERE id=\'' + id + '\'');
                showTable();
            });
        }
    });
}

var showTable = function () {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM tblNCRDetails', [], function (tx, results) {
            var len = results.rows.length, i;
            
            var list = Ext.getCmp('list');
            list.setHidden(false);

            var btnSync = Ext.getCmp('SyncBtn');
            if (len > 0) btnSync.setHidden(false); else btnSync.setHidden(true);


            var tbl = '<table>';
            tbl += '<tr>';
            tbl += '<th>&nbsp;</th>';
            tbl += '<th><p>Subject</p></th>';
            tbl += '<th><p>Priority</p></th>';
            tbl += '<th><p>SBU</p></th>';
            tbl += '<th>&nbsp;</th>';
            tbl += '</tr>';

            for (i = 0; i < len; i++) {
                tbl += '<tr>';
                tbl += '<td><a href="#" onclick="showEdit(\'' + results.rows.item(i).id + '\')" class="classnameActive">Edit &nbsp;<img src="edit.png"/></p></td>';
                tbl += '<td><p>' + results.rows.item(i).subject + '</p></td>';
                tbl += '<td><p>' + results.rows.item(i).priority + '</p></td>';
                tbl += '<td><p>' + results.rows.item(i).sbu + '</p></td>';
                tbl += '<td><a href="#" onclick="deleteRow(\'' + results.rows.item(i).id + '\')" class="classname">Delete  &nbsp;<img src="delete.gif"/></p></td>';
                tbl += '</tr>';

            }
            tbl += '</table>';
            list.setHtml(tbl);
        }, null)
    });
}
//End of WebSQL

//Sencha Touch --> Start
Ext.application(
{ viewport: {
    autoMaximize: true
}, name: 'Incident',
    launch: function () {

    var SyncClick = function()
                    {
                    /*
                    if (Ext.device.Connection.isOnline()) {Ext.Msg.alert('You are currently connected via ' + Ext.device.Connection.getType());} 
                    else {    Ext.Msg.alert('You are not currently connected');}
                    */
                        if (navigator.onLine) {
                            Ext.Msg.alert('You are currently online');
                        } else {
                            Ext.Msg.alert('You are not currently connected to internet');
                    }
                    Ext.device.notification.vibrate();
                    }


        var formPanel = Ext.create('Ext.form.Panel', {
            fullscreen: true,
            layout: 'vbox', align: 'center', pack: 'center',
            id: 'addNew',
            items: [
            { xtype: 'titlebar', title: 'Offline NCR (POC)', docked: 'top',
                items:
                [
                { xtype: 'button', id: 'btnAdd', iconMask: true, align: 'right', iconCls: 'add', 
                    handler: 
                        function()
                        { 
                        showNew(); 
                         formPanel.setValues({
                                subject: '',
                                desc: '',
                                priority: '',
                                sbu: '',
                                severity: '',
                                isUpdate: '0'
                            });
                        }
                    },
                { html: '<div class="x-button-icon settings x-icon-mask" style="float:left"></div><div style="float:left">Sync</div>', id: 'SyncBtn', handler: SyncClick },
                { xtype: 'button', id: 'btnBack', iconMask: true, align: 'left', ui: 'back', text: 'Back', handler: hideNew, hidden: true }
                
                ]
                },
            
            { id: 'list', html: '<div><center><h1>No Records found.</h1></center></div>', showAnimation: 'flip', showAnimation: 'slideIn', hideAnimation: 'slideOut' },
            
            {
                xtype: 'fieldset', hidden: 'true', id: 'addNewForm',
                showAnimation: 'flip',
                hideAnimation: 'flip',
                items:
                [
                 { xtype: 'textfield', name: 'subject', label: 'Subject', placeHolder: 'Subject of NCR', labelWidth: '40%' },

                { xtype: 'selectfield', name: 'priority',
                    label: 'Priority ', labelWidth: '40%',
                    options: [
                            { text: 'Low', value: 'Low' },
                            { text: 'Medium', value: 'Medium' },
                            { text: 'High', value: 'High' }
                            ]
                },
                { xtype: 'selectfield', name: 'sbu', id:'sbu',
                    label: 'SBU', labelWidth: '40%',
                    options: [
                            /*{ text: 'INDIA', value: '1' },
                            { text: 'SEA', value: '3' },
                            { text: 'SEOB', value: '5' },
                            { text: 'SETL', value: '6' },
                            { text: 'SWEAS', value: '2' },
                            { text: 'SWECO', value: '4' },
                            { text: 'SWESA', value: '7' }*/
                            {text: 'INDIA', value: 'INDIA' },
                            { text: 'SEA', value: 'SEA' },
                            { text: 'SEOB', value: 'SEOB' },
                            { text: 'SETL', value: 'SETL' },
                            { text: 'SWEAS', value: 'SWEAS' },
                            { text: 'SWECO', value: 'SWECO' },
                            { text: 'SWESA', value: 'SWESA' }
                            ]
                },
                { xtype: 'selectfield', name: 'severity', id:'severity',
                    label: 'Severity of Defect', labelWidth: '40%',
                    options: [
                            /*
                            { text: 'OMS-Commissioning', value: '0' },
                            { text: 'OMS-Service', value: '2' },
                            { text: 'Project-Civil work', value: '3' },
                            { text: 'Project-Commissioning', value: '6' },
                            { text: 'Project-Installation', value: '7' }*/
                              {text: 'OMS-Commissioning', value: 'OMS-Commissioning' },
                            { text: 'OMS-Service', value: 'OMS-Service' },
                            { text: 'Project-Civil work', value: 'Project-Civil work' },
                            { text: 'Project-Commissioning', value: 'Project-Commissioning' },
                            { text: 'Project-Installation', value: 'Project-Installation' }
                            ]
                },
                { xtype: 'textareafield', name: 'desc', label: 'Description', placeHolder: 'Description', labelWidth: '40%' },
                { xtype: 'textareafield', name: 'isUpdate', label: 'Description', placeHolder: 'Description', labelWidth: '40%', hidden: true, value: '0' }

                ]
            },
    { xtype: 'panel', items: [{ xtype: 'button', name: 'Submit', text: 'Submit', id: 'btnSubmit', hidden: 'true', showAnimation: 'slideIn', hideAnimation: 'slideOut',
        handler: function () {
            var formVals = JSON.stringify(formPanel.getValues(), null, 2);
            var vals = Ext.JSON.decode(formVals);



            if (vals.isUpdate == "0") {
                var count;
                db.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM tblNCRDetails', [], function (tx, results) {
                        count = results.rows.length;
                    }, null)
                });
                db.transaction(function (tx) {
                    tx.executeSql('INSERT INTO tblNCRDetails (id, subject,priority,sbu,severity,desc) VALUES ("' + (parseInt(count, 10) + 1) + '","' + vals.subject + '","' + vals.priority + '","' + vals.sbu + '","' + vals.severity + '","' + vals.desc + '")');
                });
                showTable();
            }
            if (vals.isUpdate != "0") {
                db.transaction(function (tx) {
                    tx.executeSql('UPDATE tblNCRDetails SET subject=\'' + vals.subject + '\', priority=\'' + vals.priority + '\', sbu=\'' + vals.sbu + '\', severity= \'' + vals.severity + '\', desc= \'' + vals.desc + '\'  WHERE id =\'' + vals.isUpdate + '\'');
                    //vals.isUpdate = "0";
                    formPanel.setValues({
                        subject: '',
                        desc: '',
                        priority: '',
                        sbu: '',
                        severity: '',
                        isUpdate: '0'
                    });
                });
                showTable();

            }
            hideNew();
        }



    }], align: 'center'
    }
    ]
        });

        /*
        var options = '';
        var sbu = Ext.getCmp('sbu');
        var severity = Ext.getCmp('severity');

        for (i = 1; i <= 1000; i++) 
        {
            options += '{text:' + i + ',value:' + i + '},';
        }
        options = Ext.decode('[' + options+ ']');
                sbu.setOptions(options);
        severity.setOptions(options);
        */
        showTable();



        showEdit = function (id) {
            db.transaction(function (tx) {

                tx.executeSql('SELECT * FROM tblNCRDetails Where id="' + id + '"', [], function (tx, results) {
                    if (results.rows.length > 0) {
                        formPanel.setValues({
                            subject: results.rows.item(0).subject,
                            desc: results.rows.item(0).desc,
                            priority: results.rows.item(0).priority,
                            sbu: results.rows.item(0).sbu,
                            severity: results.rows.item(0).severity,
                            isUpdate: id
                        });
                        showNew();

                    }

                }, null)
            });
        }



    }
});

