__author__ = 'priyansh'
from myapp.models import Course, Country, State, City, Student
from rest_framework import serializers


class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ('id', 'cname',)


class CountrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Country
        fields = ('id', 'country_name',)


class StateSerializer(serializers.ModelSerializer):

    class Meta:
        model = State
        fields = ('id', 'state_name', 'country',)


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = ('id', 'city_name', 'state',)


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ('id', 'sname', 'rollno', 'emailid', 'bdate', 'mobno', 'course', 'address', 'city', 'pincode', 'gender'
                  , 'age', 'join_date',)