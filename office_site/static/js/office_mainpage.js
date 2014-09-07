var xmlhttp = null;
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
    var req;
    value = document.getElementById("search_text").value
    //alert(value)
    if(window.XMLHttpRequest)
    {
        req=new XMLHttpRequest();
    }else if(window.ActiveXObject)
    {
        req=new ActiveXObject("Microsoft.XMLHTTP");
    }

    if(req)
    {
        //alert("Ajax url is:/search_ByName?name="+value);
        req.open("GET","/search_ByName?name="+value,true);
        req.onreadystatechange=function()
        {
            //alert(req.readyState)
            //alert(req.status)
            if(req.readyState == 4 && req.status == 200) {
                //alert(req.responseText)
                var text = req.responseText
                var data = eval('(' + text + ')')
                //alert('data is ' + data)
                //alert(data)
                //alert(data[1].workid)
                //alert('data len is'+data.length)
                json_to_table(data)
            }
        }
        req.send();
    }
}


function json_to_table(data)
{
    var tbody2 = "";
    if (data != "") {
        $.each(data, function (n, value) {
            //alert(n + ' ' + value);
            var trs = "";
            trs += "<tr><td>" + value.workid + "</td><td>" + value.name + "</td><td>" + value.region + "</td><td>" + value.phone + "</td><td>" + value.description + "</td>";
            trs += "<td><a href=\"/toModifyItem\?workid="+value.workid+"&name="+value.name+"&region="+value.region+"&phone="+value.phone+"&description="+value.description+"\"><i class=\"fa fa-pencil-square-o\"></i></a></td>"
            trs += "<td><a href=\"/toDelItem\?workid="+value.workid+"\"><i class=\"fa fa-times\"></i></a></td></tr>"
            tbody2 += trs;
        });
        $("#search_content").html(tbody2)
        $("#result1").show()
    }else {
        tbody2="<strong>not exist.</strong>";
        $("#search_window").html(tbody2)
    }
    //$("#sub_table_header").after(row_str);
}

function show_locate_search()
{
    $("#locate_search").slideToggle();
}
function show_locate_add()
{
    $("#locate_add").slideToggle();
}
function show_locate_modify()
{
    $("#locate_modify").slideToggle();
}
// window.onload = loadXmlhttp();

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