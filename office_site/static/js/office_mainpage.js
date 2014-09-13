var xmlhttp = null;
var item_count = 0;
var page_item_count = 5;
var req;
var value1;
var flag = true;
// window.onload = loadXmlhttp();
function loadpage(pagenum)
{
    if(window.XMLHttpRequest)
    {
        req=new XMLHttpRequest();
    }else if(window.ActiveXObject)
    {
        req=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(req)
    {
        //alert("name="+value1+"&page="+pagenum+"&pageItemCount="+page_item_count);
        req.open("GET","/search_ByName?name="+value1+"&page="+pagenum+"&pageItemCount="+page_item_count,true);
        req.onreadystatechange=show_table
        req.send();
    }
}
function show_table()
{
    if(req.readyState == 4 && req.status == 200) {
        var text = req.responseText
        var data = eval('(' + text + ')')
        var tbody2 = "";
        if (data != "") {
            $.each(data, function (n, value) {
                //alert(n + ' ' + value);
                var trs = "";
                trs += "<tr id=\"tr_"+value.workid+"\"><td>" + value.workid + "</td><td>" + value.name + "</td><td>" + value.region + "</td><td>" + value.phone + "</td><td>" + value.description + "</td>";
                trs += "<td><a href=\"/toModifyItem\?workid="+value.workid+"&name="+value.name+"&region="+value.region+"&phone="+value.phone+"&description="+value.description+"\"><i class=\"fa fa-pencil-square-o\"></i></a></td>"
                trs += "<td><a href=\"javascript:del_item("+value.workid+")\"><i class=\"fa fa-times\"></i></a></td></tr>"
                tbody2 += trs;
            });
            $("#search_content").html(tbody2)
            $("#result1").show()
        }else {
            tbody2="<strong>not exist.</strong>";
            $("#search_content").html(tbody2)
        }
    }
}
//load search form
function loadXmlhttp(search_num)
{
    var req;
    if(window.XMLHttpRequest)
    {
        req=new XMLHttpRequest();
    }else if(window.ActiveXObject)
    {
        req=new ActiveXObject("MSXML2.XMLHTTP.3.0");
    }
    if(req)
    {
        req.open("GET","/item_search?find="+search_num,true);
        req.onreadystatechange=function()
        {
            if(req.readyState == 4 && req.status == 200)
            {
                    //alert(req.responseText)
                    document.getElementById("search_window").innerHTML = req.responseText
            }
        }
        req.send();
    }
}
function search_byname()
{
    value1 = document.getElementById("search_text").value;
    //alert(value1)
    if(window.XMLHttpRequest)
    {
        req=new XMLHttpRequest();
    }else if(window.ActiveXObject)
    {
        req=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(req)
    {
        req.open("GET","/search_ByName?name="+value1+"&pageItemCount="+page_item_count,true);
        req.onreadystatechange=function show_table()
        {
            if(req.readyState == 4 && req.status == 200) {
                var text = req.responseText
                var data = eval('(' + text + ')')
                var tbody2 = "";
                if (data != "") {
                    $.each(data, function (n, value) {
                        if(n==0){
                            if(value%page_item_count==0) item_count = value/page_item_count;
                            else item_count = value/page_item_count+1;
                            //alert("num:"+value+",pageCount:"+item_count)
                            var num_list = "<ul class=\"ul_pages\">";
                            for(var i=1;i<=item_count;i++)
                                num_list += "<li ><a href=\"javascript:loadpage("+i+")\" > "+i+"</a></li>"
                            num_list += "</ul>"
                            $("#pagecount").html(num_list)
                        }
                        else {
                            var trs = "";
                            trs += "<tr id=\"tr_"+value.workid+"\"><td>" + value.workid + "</td><td>" + value.name + "</td><td>" + value.region + "</td><td>" + value.phone + "</td><td>" + value.description + "</td>";
                            trs += "<td><a href=\"/toModifyItem\?workid=" + value.workid + "&name=" + value.name + "&region=" + value.region + "&phone=" + value.phone + "&description=" + value.description + "\"><i class=\"fa fa-pencil-square-o\"></i></a></td>"
                            trs += "<td><a href=\"javascript:del_item("+value.workid+")\"><i class=\"fa fa-times\"></i></a></td></tr>"
                            tbody2 += trs;
                        }
                    });
                    $("#search_content").html(tbody2)
                    $("#result1").show()
                }else {
                    tbody2="<strong>not exist.</strong>";
                    $("#search_content").html(tbody2)
                }
            }
        }
        req.send();
    }
}
//删除一条记录
function del_item(wid)
{
    if(window.XMLHttpRequest)
    {
        req=new XMLHttpRequest();
    }else if(window.ActiveXObject)
    {
        req=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(req)
    {
        req.open("GET","/del?workid="+wid,true);
        req.onreadystatechange=function()
        {
            if(req.readyState == 4 && req.status == 200) {
                var text = req.responseText
                var data = eval('(' + text + ')');
                $('#tr_'+wid).remove();
            }
        }
        req.send();
    }
}
//动态显示效果
function show_modify_table()
{
    $("body").append("<div id='mask'></div>");
    $("#mask").addClass("mask").fadeIn("slow");
    $("#LoginBox").fadeIn("slow");
    //关闭
    $(".close_btn").hover(function () { $(this).css({ color: 'black' }) }, function () { $(this).css({ color: '#999' }) }).on('click', function () {
        $("#LoginBox").fadeOut("fast");
        $("#mask").css({ display: 'none' });
    });
}
function close_suc() {
        $("#successBox").fadeOut("fast");
        $(".grey_window").css({ display: 'none' });
}
function show_locate_search()
{
    $("#locate_search > ul").slideToggle();
    if(flag) {$('#i').attr("class", "fa fa-angle-double-down");flag=false;}
    else {$('#i').attr("class", "fa fa-angle-double-up");flag=true;}
}
function show_locate_add()
{
    $("#locate_add > ul").slideToggle();
}
function show_locate_modify()
{
    $("#locate_modify > ul").slideToggle();
}


//尝试 a标签 post
function a_post(url, params) {
    var temp = document.createElement("form");
    temp.action = url;
    temp.method = "post";
    temp.style.display = "none";
    for (var x in params) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = params[x];
        temp.appendChild(opt);
    }
}
/*------切换到错误分析--------*/
function error_analyse()
{
    $('.content_container').hide();
    $('.content_container1').animate({left: '1px'});
}