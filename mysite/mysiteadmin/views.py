from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from employee.models import Designation, Employee, Department
from myapp.models import Country, State, City, Course
from django.core.urlresolvers import reverse
# Create your views here.


def designation(request):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    des_list = Designation.objects.order_by("des_name")
    return HttpResponse(render(request, 'mysiteadmin/designation.html', {"des_list": des_list, 'request': request}))


def insertDesignation(request):
    des = Designation()
    des.des_name = request.POST['des_name']
    des.save()
    return HttpResponseRedirect(reverse('mysiteadmin:designation'))


def editDesignation(request, des_id):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    desig_list = get_object_or_404(Designation, pk=des_id)
    return HttpResponse(render(request, 'mysiteadmin/editDesignation.html', {'desig_list': desig_list, 'request': request}))


def updateDesignation(request, des_id):
    des = get_object_or_404(Designation, pk=des_id)
    des.des_name = request.POST['dname']
    des.save()
    return HttpResponseRedirect(reverse('mysiteadmin:designation'))


def deleteDesignation(request, des_id):
    des = get_object_or_404(Designation, pk=des_id)
    des.delete()
    return HttpResponseRedirect(reverse('mysiteadmin:designation'))


def editAdminDesignation(request, des_id):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    desig_list = get_object_or_404(Designation, pk=des_id)
    return HttpResponse(render(request, 'mysiteadmin/editAdminDesignation.html', {'desig_list': desig_list, 'request': request}))


def updateAdminDesignation(request, des_id):
    des = get_object_or_404(Designation, pk=des_id)
    des.des_name = request.POST['dname']
    des.save()
    return HttpResponseRedirect(reverse('mysiteadmin:admindesignation'))


def deleteAdminDesignation(request, des_id):
    des = get_object_or_404(Designation, pk=des_id)
    des.delete()
    return HttpResponseRedirect(reverse('mysiteadmin:admindesignation'))


def admindesignation(request):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    des_list = Designation.objects.order_by("des_name")
    return HttpResponse(render(request, 'mysiteadmin/AdminDesignation.html', {"des_list": des_list, 'request': request}))


def insertAdminDesignation(request):
    des = Designation()
    des.des_name = request.POST['des_name']
    des.save()
    return HttpResponseRedirect(reverse('mysiteadmin:admindesignation'))


def openEmployeeDesignation(request):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    emp_list = Employee.objects.all()
    dept_list = Department.objects.all()
    des_list = Designation.objects.all()
    return HttpResponse(render(request, 'mysiteadmin/employeeDesignation.html', {'emp_list': emp_list, 'dept_list': dept_list, 'des_list': des_list, 'request': request}))


def changeEmpDes(request, emp_id):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    emp = get_object_or_404(Employee, pk=emp_id)
    emp_list = Employee.objects.all()
    dept_list = Department.objects.all()
    des_list = Designation.objects.order_by("des_name")
    return HttpResponse(render(request, 'mysiteadmin/employeeDesignation.html', {'emp_list': emp_list, 'dept_list': dept_list, 'des_list': des_list, 'emp': emp, 'request': request}))


def updateEmpDesignation(request):
    emp = get_object_or_404(Employee, pk=request.POST['empid'])
    emp.designation_id = request.POST['desig']
    emp.save()
    return HttpResponseRedirect(reverse('mysiteadmin:openEmployeeDesignation',))


def openAdminEmployeeDesignation(request):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    emp_list = Employee.objects.all()
    dept_list = Department.objects.all()
    des_list = Designation.objects.all()
    return HttpResponse(render(request, 'mysiteadmin/AdminEmpDesignation.html', {'emp_list': emp_list, 'dept_list': dept_list, 'des_list': des_list, 'request': request}))


def changeAdminEmpDes(request, emp_id):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    emp = get_object_or_404(Employee, pk=emp_id)
    emp_list = Employee.objects.all()
    dept_list = Department.objects.all()
    des_list = Designation.objects.order_by("des_name")
    return HttpResponse(render(request, 'mysiteadmin/AdminEmpDesignation.html', {'emp_list': emp_list, 'dept_list':dept_list, 'des_list': des_list, 'emp': emp, 'request': request}))


def updateAdminEmpDesignation(request):
    emp = get_object_or_404(Employee, pk=request.POST['empid'])
    emp.designation_id = request.POST['desig']
    emp.save()
    return HttpResponseRedirect(reverse('mysiteadmin:openAdminEmployeeDesignation',))


def country(request):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    country_list = Country.objects.order_by("country_name")
    return HttpResponse(render(request, 'employee/CountryDetail.html', {"country_list": country_list, 'request': request}))


def insertCountry(request):
    coun = Country()
    coun.country_name = request.POST['country_name']
    coun.save()
    return HttpResponseRedirect(reverse('mysiteadmin:country'))


def editCountry(request, country_id):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    country_list = get_object_or_404(Country, pk=country_id)
    return HttpResponse(render(request, 'employee/editCountry.html', {'country_list': country_list, 'request': request}))


def updateCountry(request, country_id):
    coun = get_object_or_404(Country, pk=country_id)
    coun.country_name = request.POST['country_name']
    coun.save()
    return HttpResponseRedirect(reverse('mysiteadmin:country'))


def deleteCountry(request, country_id):
    coun = get_object_or_404(Country, pk=country_id)
    coun.delete()
    return HttpResponseRedirect(reverse('mysiteadmin:country'))


def course(request):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    course_list = Course.objects.order_by("cname")
    return HttpResponse(render(request, 'employee/CourseDetail.html', {"course_list": course_list, 'request': request}))


def insertCourse(request):
    cour = Course()
    cour.cname = request.POST['cname']
    cour.save()
    return HttpResponseRedirect(reverse('mysiteadmin:course'))


def editCourse(request, course_id):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    course_list = get_object_or_404(Course, pk=course_id)
    return HttpResponse(render(request, 'employee/editCourse.html', {'course_list': course_list, 'request': request}))


def updateCourse(request, course_id):
    cour = get_object_or_404(Course, pk=course_id)
    cour.cname = request.POST['cname']
    cour.save()
    return HttpResponseRedirect(reverse('mysiteadmin:course'))


def deleteCourse(request, course_id):
    cour = get_object_or_404(Course, pk=course_id)
    cour.delete()
    return HttpResponseRedirect(reverse('mysiteadmin:course'))


def department(request):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    dept_list = Department.objects.order_by("dname")
    return HttpResponse(render(request, 'employee/DeptDetail.html', {"dept_list": dept_list, 'request': request}))


def insertDept(request):
    dept = Department()
    dept.dname = request.POST['dname']
    dept.save()
    return HttpResponseRedirect(reverse('mysiteadmin:department'))


def editDept(request, dept_id):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    dept_list = get_object_or_404(Department, pk=dept_id)
    return HttpResponse(render(request, 'employee/editDept.html', {'dept_list': dept_list, 'request': request}))


def updateDept(request, dept_id):
    dept = get_object_or_404(Department, pk=dept_id)
    dept.dname = request.POST['dname']
    dept.save()
    return HttpResponseRedirect(reverse('mysiteadmin:department'))


def deleteDept(request, dept_id):
    dept = get_object_or_404(Department, pk=dept_id)
    dept.delete()
    return HttpResponseRedirect(reverse('mysiteadmin:department'))


def state(request):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    #state_list= State.objects.order_by("state_name")
    country_list = Country.objects.order_by("country_name")
    return HttpResponse(render(request, 'employee/StateDetail.html', {"country_list": country_list, 'request': request}))


def insertState(request):
    st = State()
    st.state_name = request.POST['state_name']
    st.country_id = request.POST['country']
    st.save()
    return HttpResponseRedirect(reverse('mysiteadmin:state'))


def showState(request):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    cn = get_object_or_404(Country, pk=request.POST["countrysel"])
    country_list = Country.objects.order_by("country_name")
    state_list = cn.state_set.all()
    return HttpResponse(render(request, 'employee/StateDetail.html', {'coun': cn, 'country_list': country_list,  'state_list': state_list, 'request': request}))


def deleteState(request, state_id):
    st = get_object_or_404(State, pk=state_id)
    st.delete()
    return HttpResponseRedirect(reverse('mysiteadmin:state'))


def editState(request, state_id):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    state_list = get_object_or_404(State, pk=state_id)
    return HttpResponse(render(request, 'employee/editState.html', {'state_list': state_list, 'request': request}))


def updateState(request, state_id):
    st = get_object_or_404(State, pk=state_id)
    st.state_name = request.POST['state_name']
    st.save()
    return HttpResponseRedirect(reverse('mysiteadmin:state'))


def city(request):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    state_list = State.objects.order_by("state_name")
    return HttpResponse(render(request, 'employee/CityDetail.html', {"state_list": state_list, 'request': request}))


def insertCity(request):
    ct = City()
    ct.city_name = request.POST['city_name']
    ct.state_id = request.POST['state']
    ct.save()
    return HttpResponseRedirect(reverse('mysiteadmin:city'))


def showCity(request):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    st = get_object_or_404(State, pk=request.POST["statesel"])
    state_list = State.objects.order_by("state_name")
    city_list = st.city_set.all()
    return HttpResponse(render(request, 'employee/CityDetail.html', {'st': st, 'state_list': state_list, 'city_list': city_list, 'request': request}))


def deleteCity(request, city_id):
    ct = get_object_or_404(City, pk=city_id)
    ct.delete()
    return HttpResponseRedirect(reverse('mysiteadmin:city'))


def editCity(request, city_id):
    if 'emp' not in request.session:
        return HttpResponseRedirect(reverse('employeeview:moveTemp'))
    city_list = get_object_or_404(City, pk=city_id)
    return HttpResponse(render(request, 'employee/editCity.html', {'city_list': city_list, 'request': request}))


def updateCity(request, city_id):
    ct = get_object_or_404(City, pk=city_id)
    ct.city_name = request.POST['city_name']
    ct.save()
    return HttpResponseRedirect(reverse('mysiteadmin:city'))
