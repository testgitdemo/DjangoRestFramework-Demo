from django.db import models

class University(models.Model):
    uniname=models.CharField(max_length=100)
    address=models.CharField(max_length=200)
    emailid=models.EmailField()
    website=models.CharField(max_length=100)
    contact=models.BigIntegerField(default=0)
    def __unicode__(self):
        return self.uniname
class Course(models.Model):
    cname=models.CharField(max_length=150)
    university=models.ForeignKey(University)
    def __unicode__(self):
        self.cname
