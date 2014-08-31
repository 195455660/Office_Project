#!/usr/share/python
#-*- coding:utf-8 -*

from django.conf.urls import patterns, include, url

import view
import settings
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'office_site.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^home/$', view.home),
    url(r'^login/$', view.login),
    url(r'^office_login/$', view.office_login),
    url(r'^locate_search/$', view.locate_search),
    url(r'^add/$', view.toAddPage),
    url(r'^addperson/$', view.locate_addinfo),
    url(r'^item_search/$', view.item_search),
    url(r'^toInsertItem/$', view.toInsertItemPage),
    url(r'^toMainPage/$', view.toMainPage),


    #使用Name进行查询
    url(r'^search_ByName/$', view.search_ByName),

    #关于Chart图显示
    url(r'^chart/$', view.chart),
)
