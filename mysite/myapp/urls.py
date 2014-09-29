__author__ = 'priyansh'
from django.conf.urls import patterns,url
from myapp import views
urlpatterns = patterns('', url(r'^$',views.index, name='index'),
                        url(r'^(?P<student_id>\d+)/$', views.detail, name='detail'),
                        url(r'^(?P<student_id>\d+)/result/$', views.result, name='result'),
                        url(r'^(?P<student_id>\d+)/contact$', views.contact, name='contact'),
                    )
