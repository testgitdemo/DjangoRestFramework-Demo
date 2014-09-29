__author__ = 'priyansh'
from django.conf.urls import patterns,url
from myappWithGenView import views
urlpatterns=patterns('',
                     url(r'^$',views.IndexView.as_view(),name='indexview'),
                    url(r'^(?P<pk>\d+)/$',views.DetailView.as_view(),name="detailview"),
                    url(r'^(?P<pk>\d+)/resultview/$',views.ResultView.as_view(),name="resultview"),
)