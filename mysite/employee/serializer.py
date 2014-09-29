__author__ = 'priyansh'
from employee.models import Department, Designation, Employee
from rest_framework import serializers


class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = ('id', 'dname',)


class DesignationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Designation
        fields = ('id', 'des_name',)


class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = ('id', 'ename', 'emailid', 'password', 'mobno', 'address', 'city', 'pincode', 'department', 'designation',)