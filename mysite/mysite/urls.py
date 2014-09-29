from django.conf.urls import patterns, include, url
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from django.contrib import admin
admin.autodiscover()


# class UserSirializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = ('url', 'username', 'email', 'is_staff')
#
#
# class UserViewset(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSirializer
# router = routers.DefaultRouter()
# router.register(r'users', UserViewset)
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'mysite.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    # url(r'^', include('snippets.urls')),
    # url(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^$', 'mysite.views.home', name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^myapp/', include('myapp.urls', namespace='myapp')),
    url(r'myappWithGenView/', include('myappWithGenView.urls', namespace='myappWithGenView')),
    url(r'employee/', include('employee.urls', namespace='employeeview')),
    url(r'^university/', include('university.urls', namespace='university')),
    url(r'^mysiteadmin/', include('mysiteadmin.urls', namespace='mysiteadmin')),
)
