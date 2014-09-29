from django.db import models
from employee.models import Designation
# Create your models here.


class AdminLogin(models.Model):
    emailid = models.CharField(max_length=50)
    password = models.CharField(max_length=20)
    status = models.IntegerField(default=0)


class AdminLogin1(models.Model):
    name = models.CharField(max_length=50, blank=True)
    emailid = models.CharField(max_length=50, blank=True)
    password = models.CharField(max_length=20, blank=True)
    designation = models.ForeignKey(Designation, default=5, blank=True)
    status=models.IntegerField(default=0, blank=True)