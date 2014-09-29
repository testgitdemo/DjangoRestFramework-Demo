__author__ = 'priyansh'
from django.conf.urls import patterns,url
from university import views
urlpatterns=patterns('', url(r'^$',views.index, name='index'),
                    url(r'^save/$', views.saveRecord, name='saverecord'),
                    url(r'^(?P<uni_id>\d+)/delete/$', views.deleteRecord, name='deleterecord'),
                    url(r'^(?P<uni_id>\d+)/edit/$', views.editRecord, name='editrecord'),
                    url(r'^(?P<uni_id>\d+)/update/$', views.updateRecord, name='updaterecord'),
                    url(r'^show/$', views.showRecord, name='showrecord'),
                    url(r'^(?P<uni_id>\d+)/showcourse/$', views.showCourse, name='showcourse'),
                    url(r'^(?P<uni_id>\d+)/course/$', views.course, name='course'),
                    url(r'^(?P<uni_id>\d+)/insertcourse/$', views.insertCourse, name='insertcourse'),
                    url(r'^(?P<cous_id>\d+)(?P<uni_id>\d+)/deletecourse/$', views.deleteCourse, name='deletecourse'),
                    url(r'^(?P<cous_id>\d+)(?P<uni_id>\d+)/editcourse/$', views.editCourse, name='editcourse'),
                    url(r'^(?P<cous_id>\d+)(?P<uni_id>\d+)/updatecourse/$', views.updateCourse, name='updatecourse'),
                     )