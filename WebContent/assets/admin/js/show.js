$(document).ready(function(){

});



// Publish functions
function publishSearch(){
    $('#pubilsh-search-dlg').dialog('open').dialog('center');
}

function publishDelete(){
    var row = $('#publish').datagrid('getSelected');
    if(row){
        $.messager.confirm('删除文章','你确认删除该文章？'+row.id,function(r){
            if (r){
                alert('ok');
            }
        });
    }
}


//-----------------------------------------------------------------------------------
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
