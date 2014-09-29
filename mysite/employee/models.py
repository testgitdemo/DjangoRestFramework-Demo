from django.db import models
from myapp.models import City
# Create your models here.


class Department(models.Model):
    dname = models.CharField(max_length=100)


class Designation(models.Model):
    des_name = models.CharField(max_length=100)


class Employee(models.Model):
    ename = models.CharField(max_length=150)
    emailid = models.EmailField()
    password = models.CharField(max_length=20, blank=True)
    mobno = models.CharField(max_length=15, blank=True)
    address = models.CharField(max_length=150, blank=True)
    city = models.ForeignKey(City, default=0, blank=True)
    pincode = models.BigIntegerField(default=0, blank=True)
    department = models.ForeignKey(Department, default=0, blank=True)
    designation = models.ForeignKey(Designation, default=0, blank=True)