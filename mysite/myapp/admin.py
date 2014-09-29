from django.contrib import admin
from myapp.models import Student, Contact, Country, State, City, Course
from employee.models import Department, Employee, Designation
from mysiteadmin.models import AdminLogin1
class ContactInline(admin.TabularInline):
    model = Contact
    extra = 3
class StateInline(admin.TabularInline):
    model = State
    extra = 3
class CityInline(admin.TabularInline):
    model = City
    extra = 3
class CountryAdmin(admin.ModelAdmin):
    fields = ['country_name']
    list_display = ('country_name',)
    list_filter = ('id',)
    inlines = [StateInline]

class StateAdmin(admin.ModelAdmin):
    fields = ['state_name']
    list_display = ('state_name',)
    list_filter = ('id',)
    inlines = [CityInline]
class CourseAdmin(admin.ModelAdmin):
    fields = ['cname']
    list_display = ('cname',)
    list_filter = ('id',)
class DesignationAdmin(admin.ModelAdmin):
    fields = ['des_name']
    list_display = ('id', 'des_name',)
    list_filter = ('id',)
class StudentAdmin(admin.ModelAdmin):
    #fields=['rollno','sname']
    fieldsets = [
        (None,{'fields':['sname','join_date']}),
        ('Student ROLL NO...',{
            'fields':['rollno'],
            'classes':['collapse'],
        }),
    ]
    list_display = ('sname','rollno','join_date')
    list_filter = ('rollno','id')
    list_per_page = 3
    inlines = [ContactInline]

class DepartmentAdmin(admin.ModelAdmin):
    fields = ['dname']
    list_display = ('dname',)
    list_filter = ('id',)
class EmployeeAdmin(admin.ModelAdmin):
    fields = ['ename', 'emailid', 'mobno', 'city', 'department']
    list_display = ('ename', 'emailid', 'mobno', 'city', 'department')
    list_filter = ('ename', 'emailid', 'mobno')
class AdminLoginManage(admin.ModelAdmin):
    fields = ['name', 'emailid', 'password']
    list_display = ('name', 'emailid', 'password','status')
# Register your models here.
admin.site.register(Student, StudentAdmin)#display Rollno First in Admin site.StudentAdmin id admin model class it's Second argumant of register()
admin.site.register(Department, DepartmentAdmin)
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(Country, CountryAdmin)
admin.site.register(State, StateAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Designation, DesignationAdmin)
admin.site.register(AdminLogin1, AdminLoginManage)
#admin.site.register(Contact)
#admin.site.register(Student)
