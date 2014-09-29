from django.test import TestCase
import datetime
from django.utils import timezone
from myapp.models import Student
from django.core.urlresolvers import reverse
# Create your tests here.
class StudentMethodTest(TestCase):
    #python manage.py test myapp looked for tests in the myapp application
    #it looked for test methods - ones whose names begin with test
    #so,below method name start with 'test' keyword
    def test_was_join_recently_with_futur_Join(self):
        """ was__join_recently() method return false whose Join date is future."""
        future_date=Student(join_date=timezone.now()+datetime.timedelta(days=30))
        self.assertEqual(future_date.was_join_recently(),False)
        #using the assertEqual() method, it discovered that its was_join_recently() returns True, though we wanted
        #  it to return False
    def test_was_join_recently_with_older_student(self):
        """was_join_recently() method return false whose join date is older than 1 day"""
        old_student=Student(join_date=timezone.now()-datetime.timedelta(days=30))
        self.assertEqual(old_student.was_join_recently(),False)
    def test_was_join_recently_with_recent_student(self):
        """was_join_recently() method return true from employee whose join date within last day """
        recent_student= Student(join_date=timezone.now()-datetime.timedelta(days=1))
        self.assertEqual(recent_student.was_join_recently(),True)



