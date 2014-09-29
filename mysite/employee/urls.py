__author__ = 'priyansh'
from django.conf.urls import patterns, url
from employee import views
from employee.views import *
from django.views.generic import TemplateView
Admin_list = AdminViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
Admin_detail = AdminViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})
Employee_list = EmployeeViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
Employee_detail = EmployeeViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})
Department_list = DepartmentViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
Department_detail = DepartmentViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})
Designation_list = DesignationViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
Designation_detail = DesignationViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})
Course_list = CourseViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
Course_detail = CourseViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})
Country_list = CountryViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
Country_detail = CountryViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})
State_list = StateViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
State_detail = StateViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})
City_list = CityViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
City_detail = CityViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})
Student_list = StudentViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
Student_detail = StudentViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})
urlpatterns = patterns('employee.views',
                       url(r'^logout/$', LogoutPage.as_view()),
                       url(r'^login/$', MoveEmpLogin.as_view()),
                       url(r'^login/error/$', MoveEmpLogin.as_view()),
                       url(r'^adminlogin/$', MoveEmpLogin.as_view()),
                       url(r'^adminlogin/error/$', MoveEmpLogin.as_view()),
                       url(r'^registration/$', views.MoveRegistration.as_view(), name='registration'),
                       url(r'^registration/error/$', views.MoveRegistration.as_view()),
                       url(r'^forgotPassword/$', MoveForgotPassword.as_view()),
                       url(r'^adminLogin/$', MoveAdminLogin.as_view()),
                       url(r'^index/$', EmployeeIndex.as_view()),
                       url(r'^adminprofile/$', AdminProfile.as_view()),
                       url(r'^adminprofile/error/$', AdminProfile.as_view()),
                       url(r'^adminprofile/success/$', AdminProfile.as_view()),
                       url(r'^adminprofile/(?P<pk>[0-9]+)/$', Admin_detail),
                       url(r'^getadmin/$', Admin_list),
                       url(r'^employeeregistration/$', Employee_list),
                       url(r'^getdepartment/$', Department_list, name='department_list'),
                       url(r'^getdepartment_detail/(?P<pk>[0-9]+)/$', Department_detail),
                       url(r'^getcountry/$', Country_list, name='country_list'),
                       url(r'^getcountry_detail/(?P<pk>[0-9]+)/$', Country_detail),
                       url(r'^getstate/$', State_list, name='state_list'),
                       url(r'^getstate_detail/(?P<pk>[0-9]+)/$', State_detail),
                       url(r'^getcity/$', City_list, name='city_list'),
                       url(r'^getcourse/$', Course_list, name='course_list'),
                       url(r'^city_detail/(?P<pk>[0-9]+)/$', City_detail),
                       url(r'^course_detail/(?P<pk>[0-9]+)/$', Course_detail),
                       url(r'^getdesignation/$', Designation_list, name='designation_list'),
                       url(r'^getstudent/$', Student_list),
                       url(r'^getstudent/(?P<pk>[0-9]+)/$', Student_detail),
                       url(r'^designationop/(?P<pk>[0-9]+)/$', Designation_detail, name='designation_detail'),
                       url(r'^getemployee/$', Employee_list, name='employee_list'),
                       url(r'^empprofile/(?P<pk>[0-9]+)/$', Employee_detail, name='employee_profile'),
                       url(r'^profile/', EmployeeProfile.as_view()),
                       url(r'^profile/error/$', EmployeeProfile.as_view()),
                       url(r'^changepassword/', MoveChangePassword.as_view()),
                       url(r'^changepassword/error/$', MoveChangePassword.as_view()),
                       url(r'^changepassword/success/$', MoveChangePassword.as_view()),
                       url(r'^designation/$', MoveDesignation.as_view()),
                       url(r'^designation/error/$', MoveDesignation.as_view()),
                       url(r'^designation/success/$', MoveDesignation.as_view()),
                       url(r'^designation_edit/$', MoveDesignationEdit.as_view()),
                       url(r'^designation_edit/error/$', MoveDesignationEdit.as_view()),
                       url(r'^course/$', MoveCourse.as_view()),
                       url(r'^course/error/$', MoveCourse.as_view()),
                       url(r'^course/success/$', MoveCourse.as_view()),
                       url(r'^course_edit/$', MoveCourseEdit.as_view()),
                       url(r'^course_edit/error/$', MoveCourseEdit.as_view()),
                       url(r'^department/$', MoveDepartment.as_view()),
                       url(r'^department/error/$', MoveDepartment.as_view()),
                       url(r'^department/success/$', MoveDepartment.as_view()),
                       url(r'^department_edit/$', MoveDepartmentEdit.as_view()),
                       url(r'^department_edit/error/$', MoveDepartmentEdit.as_view()),
                       url(r'^country/$', MoveCountry.as_view()),
                       url(r'^country/error/$', MoveCountry.as_view()),
                       url(r'^country/success/$', MoveCountry.as_view()),
                       url(r'^country_edit/$', MoveCountryEdit.as_view()),
                       url(r'^country_edit/error/$', MoveCountryEdit.as_view()),
                       url(r'^state/$', MoveState.as_view()),
                       url(r'^state/error/$', MoveState.as_view()),
                       url(r'^state/success/$', MoveState.as_view()),
                       url(r'^state_show/success/$', MoveState.as_view()),
                       url(r'^state_edit/$', MoveStateEdit.as_view()),
                       url(r'^state_edit/error/$', MoveStateEdit.as_view()),
                       url(r'^city/$', MoveCity.as_view()),
                       url(r'^city/error/$', MoveCity.as_view()),
                       url(r'^city/success/$', MoveCity.as_view()),
                       url(r'^city_show/success/$', MoveCity.as_view()),
                       url(r'^city_edit/$', MoveCityEdit.as_view()),
                       url(r'^city_edit/error/$', MoveCityEdit.as_view()),
                       url(r'^Student/$', MoveStudent.as_view()),
                       url(r'^Student/error/$', MoveStudent.as_view()),
                       url(r'^Student/success/(?P<pk>[0-9]+)/$', MoveStudent.as_view()),
                       url(r'^Student_list/$', MoveStudentList.as_view()),
                       url(r'^Student_edit/$', MoveStudentEdit.as_view()),
                       url(r'^Student_edit/error/$', MoveStudentEdit.as_view()),
                       url(r'^Student_edit/success/$', MoveStudentList.as_view()),
                       url(r'^Student_list_only/$', MoveStudentListOnly.as_view()),
                       url(r'^Studentinsert/$', Student_list, name='student_insert'),
                       url(r'^Studentlist/$', Student_list, name='student_list'),
                       url(r'^empdeschange/$', MoveEmpDesignation.as_view(), name='empdes_list'),

)
