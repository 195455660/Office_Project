#!/usr/share/python
#-*- coding:utf-8 -*

from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response, RequestContext
from django.views.decorators.csrf import csrf_protect
import util
import json

def home(request):
    html1 = "<html><body><p>This is home page!</p></body></html>"
    return HttpResponse(html1)

def login(request):
    return render_to_response('office_login.html')


def office_login(request):
    if 'name' in request.POST and 'passwd' in request.POST:
        name = request.POST['name']
        pw = request.POST['passwd']
        name_check = util.check_login(name, pw)
        if not name_check:
            #return HttpResponseRedirect('/toMainPage/?name='+name)
            return render_to_response('office_mainpage.html', {'name':name}, context_instance=RequestContext(request))
    return render_to_response('office_login.html',{'err': True})

def locate_search(request):
    error = False
    if 'name' in request.POST:
        add_items = request.POST['name']
        if not add_items:
            error = True
        else:
            #return render_to_response('locate_infoAdd.html', add_items)
            return HttpResponse('add s!')
    return render_to_response('locate_infoAdd.html',{'Error':error})


def toAddPage(request):
    error = False
    if 'name' in request.POST and 'work_id' in request.POST:
        add_name = request.POST.get('name', '')
        add_workid = request.POST.get('work_id', '')
        if not add_name:
            error = True
        elif not add_workid:
            error = True
        else:
            add_region = request.POST.get('region', ' ')
            add_tel = request.POST.get('tel', ' ')
            add_desc = request.POST.get('description', ' ')

            #SQL_string = 'insert into office_user_item values( \'%s\',\'%s\',\'%s\',\'%s\',\'%s\')' % add_workid, add_name, add_region, add_tel, add_desc
            #SQL_string = "insert into office_user_item values( '%%s','%%s','%%s','%%s','%%s')" % add_workid, add_name, add_region, add_tel, add_desc
            conn = util.condb()
            SQL_string = "insert into office_user_item values( %s,%s,%s,%s,%s)"
            #args =(add_workid, add_name, add_region, add_tel, add_desc)
            args =(add_workid, add_name, add_region, add_tel, add_desc)
            #SQL_string = "insert into office_user_item values( '0001','admin1', 'C', '0001', 'adminB')"
            cursor = conn.cursor()
            cursor.execute(SQL_string,args)
            conn.commit()
            cursor.close()
            conn.close()
            return render_to_response('locate_infoAdd.html', {'success': True})
    return render_to_response('locate_infoAdd.html',{'Error': error})


def locate_modifyinfo(request):
    error = False
    if 'name' in request.POST and 'work_id' in request.POST:
        add_name = request.POST.get('name', '')
        add_workid = request.POST.get('work_id', '')
        if not add_name:
            error = True
        elif not add_workid:
            error = True
        else:
            add_region = request.POST.get('region', ' ')
            add_tel = request.POST.get('tel', ' ')
            add_desc = request.POST.get('description', ' ')
            conn = util.condb()
            SQL_string = "update office_user_item set workid=%s,name=%s,region=%s,tel=%s,description=%s where workid=%s"
            args =(add_workid, add_name, add_region, add_tel, add_desc, add_workid)
            cursor = conn.cursor()
            cursor.execute(SQL_string,args)
            conn.commit()
            cursor.close()
            conn.close()
            return render_to_response('locate_infoModify.html', {'success': True})
    return render_to_response('locate_infoModify.html', {'Error': error})

def locate_addinfo(request):
    name = request.POST.get('name')
    if 'name' in request.POST:
        return render_to_response('locate_infoAdd.html', {'name': 'admin'})
    else:
        return render_to_response('locate_infoAdd.html', {'flag': True})


def item_search(request):
    '''使用ajax来显示左边标栏的内容'''
    content = "<h3>error!</h3>"
    if 'find' in request.GET:
        search_num = request.GET['find']
        if int(search_num) == 1:
            return render_to_response('search_ByName.html')
        elif int(search_num) == 2:
            return render_to_response('search_ByName.html')
    return HttpResponse(content)


def search_ByName(request):
    list = []
    if 'name' in request.GET:
        name = request.GET['name']
        conn = util.condb()
        cursor = conn.cursor()
        str = "select * from office_user_item where name = '%s' " % name
        cursor.execute(str)
        conn.commit()
        items = cursor.fetchall()
        for item in items:
            temp = {}
            temp['workid'] = item[0]
            temp['name'] = item[1]
            temp['region'] = item[2]
            temp['phone'] = item[3]
            temp['description'] = item[4]
            list.append(temp)
        #json_data = json.dump(temp)
        json_data = json.dumps(list)
        cursor.close()
        conn.close()
        return HttpResponse(json_data)
        #return HttpResponse("[{'name':'admin','workid':1},{'name':'ys','workid':2}]")
    else:
        return HttpResponse('Ajax request search_ByName is success!')

'''
return to page
'''
def toInsertItemPage(request):
    return render_to_response('locate_infoAdd.html')
def toModifyItemPage(request):
    dict = {}
    if 'workid' in request.GET:
        dict['workid'] = request.GET['workid']
        dict['name'] = request.GET.get('name', '')
        dict['region'] = request.GET.get('region', '')
        dict['phone'] = request.GET.get('phone', '')
        dict['description'] = request.GET.get('description', '')
        return render_to_response('locate_infoModify.html', dict)
    return render_to_response('office_mainpage.html')

def toMainPage(request):
    namelist = {}
    if 'name' in request.GET:
        namelist['name'] = request.GET.get('name', '')
    return render_to_response('office_mainpage.html',namelist)


def chart(request):
    return render_to_response('ChartTest.html')



#pagination test
def toPagination(request):
    return render_to_response('paginationTest.html')

def toAddPage(request):
    error = False
    if 'name' in request.POST and 'work_id' in request.POST:
        add_name = request.POST.get('name', '')
        add_workid = request.POST.get('work_id', '')
        if not add_name:
            error = True
        elif not add_workid:
            error = True
        else:
            add_region = request.POST.get('region', ' ')
            add_tel = request.POST.get('tel', ' ')
            add_desc = request.POST.get('description', ' ')

            #SQL_string = 'insert into office_user_item values( \'%s\',\'%s\',\'%s\',\'%s\',\'%s\')' % add_workid, add_name, add_region, add_tel, add_desc
            #SQL_string = "insert into office_user_item values( '%%s','%%s','%%s','%%s','%%s')" % add_workid, add_name, add_region, add_tel, add_desc
            conn = util.condb()
            SQL_string = "insert into office_user_item values( %s,%s,%s,%s,%s)"
            #args =(add_workid, add_name, add_region, add_tel, add_desc)
            args =(add_workid, add_name, add_region, add_tel, add_desc)
            #SQL_string = "insert into office_user_item values( '0001','admin1', 'C', '0001', 'adminB')"
            cursor = conn.cursor()
            cursor.execute(SQL_string,args)
            conn.commit()
            cursor.close()
            conn.close()
            return render_to_response('locate_infoAdd.html', {'success': True})
    return render_to_response('locate_infoAdd.html',{'Error': error})