$(document).ready(function(){

});

var url;

function normalCheck(){
    var row = $('#check').datagrid('getSelected');
    if (row){
        $('#check-dlg').dialog('open').dialog('center').dialog('setTitle','待审核');
        $('#fm').form('load',row);
        url = 'update_user.php?id='+row.id;
    }
}

function multipleCheck(){
    var row = $('#check').datagrid('getSelected');
    if (row){
        $('#check-dlg').dialog('open').dialog('center').dialog('setTitle','待审核');
        $('#fm').form('load',row);
        url = 'update_user.php?id='+row.id;
    }
}

function checkPass(){
    var row = $('#check').datagrid('getSelected');
    if (row){
        $('#check-dlg').dialog('close');
    }
}
