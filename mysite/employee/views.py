from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import ensure_csrf_cookie
from employee.models import Department, Employee, Designation
from myapp.models import Country, State, City, Student, Course
from mysiteadmin.models import AdminLogin1
import smtplib
from django.core.urlresolvers import reverse
from rest_framework import viewsets
from mysiteadmin.serializer import AdminLoginSerializer
from employee.serializer import EmployeeSerializer, DepartmentSerializer, DesignationSerializer
from myapp.serializer import CountrySerializer, CourseSerializer, StateSerializer, CitySerializer, StudentSerializer
from django.views.generic import TemplateView
# Create your views here.


class LogoutPage(TemplateView):
    template_name = "employee/logout.html"


class AdminProfile(TemplateView):
    template_name = "employee/AdminProfile.html"


class MoveRegistration(TemplateView):
    template_name = "employee/Registration.html"


class MoveEmpLogin(TemplateView):
    template_name = "employee/Login.html"


class MoveAdminLogin(TemplateView):
    template_name = "employee/AdminLogin.html"


class MoveForgotPassword(TemplateView):
    template_name = "employee/forgotPassword.html"


class EmployeeIndex(TemplateView):
    template_name = "employee/Home.html"


class EmployeeProfile(TemplateView):
    template_name = "employee/profile.html"


class MoveChangePassword(TemplateView):
    template_name = "employee/ChangePwd.html"


class MoveDesignation(TemplateView):
    template_name = "mysiteadmin/designation.html"


class MoveDesignationEdit(TemplateView):
    template_name = "mysiteadmin/editDesignation.html"


class MoveEmpDesignation(TemplateView):
    template_name = "mysiteadmin/employeeDesignation.html"


class MoveCourse(TemplateView):
    template_name = "employee/CourseDetail.html"


class MoveCourseEdit(TemplateView):
    template_name = "employee/editCourse.html"


class MoveDepartment(TemplateView):
    template_name = "employee/DeptDetail.html"


class MoveDepartmentEdit(TemplateView):
    template_name = "employee/editDept.html"


class MoveCountry(TemplateView):
    template_name = "employee/CountryDetail.html"


class MoveCountryEdit(TemplateView):
    template_name = "employee/editCountry.html"


class MoveState(TemplateView):
    template_name = "employee/StateDetail.html"


class MoveStateEdit(TemplateView):
    template_name = "employee/editState.html"


class MoveCity(TemplateView):
    template_name = "employee/CityDetail.html"


class MoveCityEdit(TemplateView):
    template_name = "employee/editCity.html"


class MoveStudent(TemplateView):
    template_name = "employee/student.html"


class MoveStudentEdit(TemplateView):
    template_name = "employee/editstudent.html"


class MoveStudentList(TemplateView):
    template_name = "employee/studentlist.html"


class MoveStudentListOnly(TemplateView):
    template_name = "employee/StudentListOnly.html"


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class DesignationViewSet(viewsets.ModelViewSet):
    queryset = Designation.objects.all()
    serializer_class = DesignationSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class StateViewSet(viewsets.ModelViewSet):
    queryset = State.objects.all()
    serializer_class = StateSerializer


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class AdminViewSet(viewsets.ModelViewSet):
    queryset = AdminLogin1.objects.all()
    serializer_class = AdminLoginSerializer


