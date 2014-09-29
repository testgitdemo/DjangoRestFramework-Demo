from django.db import models
import datetime
# Create your models here.


class Course(models.Model):
    cname = models.CharField(max_length=100)


class Country(models.Model):
    country_name = models.CharField(max_length=100, blank=True)


class State(models.Model):
    state_name = models.CharField(max_length=100, blank=True)
    country = models.ForeignKey(Country)


class City(models.Model):
    city_name = models.CharField(max_length=100)
    state = models.ForeignKey(State, blank=True)


class Student(models.Model):
    sname = models.CharField(max_length=100, blank=True)
    rollno = models.IntegerField(default=0, blank=True)
    emailid = models.EmailField()
    bdate = models.DateField(blank=True)
    mobno = models.CharField(max_length=15, blank=True)
    course = models.ForeignKey(Course, blank=True)
    address = models.CharField(max_length=150, blank=True)
    city = models.ForeignKey(City, blank=True)
    pincode = models.BigIntegerField(default=0, blank=True)
    gender = models.CharField(max_length=10, blank=True)
    age = models.IntegerField(default=0, blank=True)
    join_date = models.DateField(blank=True)
    #exam_no=models.IntegerField()

    def __unicode__(self):
        return self.sname

    def was_join_recently(self):
        now = datetime.datetime.now()
        return now - datetime.timedelta(days=1) <= self.join_date <= now
    was_join_recently.admin_order_field = 'join_date'
    was_join_recently.boolean = True
    was_join_recently.short_description = 'Join recently?'


class Contact(models.Model):
    address = models.CharField(max_length=200)
    stdno = models.BigIntegerField()
    student = models.ForeignKey(Student)

    def __unicode__(self):
        return self.address