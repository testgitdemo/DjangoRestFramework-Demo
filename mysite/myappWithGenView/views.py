from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.core.urlresolvers import reverse
from myapp.models import Student,Contact
from django.views import generic
from django.test import TestCase
import datetime
# Create your views here.
#Creating Generic view For Student and Contact models from myapp
#the work of this views are same myapp's views But use Generic view
#this views use models from myapp/models.py
class IndexView(generic.ListView):
    template_name = 'myappWithGenView/index.html'
    context_object_name = "all_stud_list"
    def get_queryset(self):
        "Return All Student Records."
        #Student.objects.filter(pub_date__lte=timezone.now()) returns a queryset containing Student whose
        # join_date is less than or equal to - that is, earlier than or equal to - timezone.now.
        return Student.objects.filter(join_date_ite=datetime.datetime.now()).order_by('sname')
class DetailView(generic.DetailView):
    model = Student#shorthand for queryset=Student.objects.all()
    context_object_name = 'stud'
    template_name = 'myappWithGenView/detailForm.html'
    def get_queryset(self):
        return Student.objects.filter(join_date_ite=datetime.datetime.now()).order_by('sname')

class ResultView(generic.DetailView):
    model = Student#shorthand for queryset=Student.objects.all()
    context_object_name = 'stud'
    template_name = 'myappWithGenView/result.html'

def create_student(sname,days):
    """ Create student with the given name join in given number of 'days'"""
    return Student.objects.create(sname=sname, join_date=datetime.datetime.now() + datetime.timedelta.days(days))

class StudentViewTests(TestCase):
    def test_index_view_with_no_student(self):
        "if No Student exit an appropriate message should be  display"
        response=self.client.get(reverse('myapp:index'))
        self.assertEqual(response.status_code,200)
        self.assertContains(response,"no student available.")
        self.assertQuerysetEqual(response.context['all_stud_list'],[])
    def test_index_view_with_past_student(self):
        """
        Student with a join_date in the past should be displayed on the index page.
        """
        create_student(sname='Vishal rajput',days=-30)
        response=self.client.get(reverse('myappWithGenView:indexview'))
        self.assertQuerysetEqual(response.context['all_stud_list'],['<Student:past Student...>'])
    def test_index_view_with_future_view(self):
        create_student(sname='Priya rajput',days=30)
        response=self.client.get(reverse('myappWithGenView:indexview'))
        self.assertContains(response,'No student available...!',status_code=200)
        self.assertQuerysetEqual(response.context['all_stud_list'],[])
    def test_index_view_with_future_student_and_past_student(self):
        "Even if both past and future Student exist, only past Student should be displayed."
        create_student(sname="Urvesh rajput.", days=-30)
        create_student(sname="Kinjal Rajput", days=30)
        response = self.client.get(reverse('myappWithGenView:indexview'))
        self.assertQuerysetEqual(
            response.context['all_stud_list'],
            ['<Student: Urvesh Rajput.>']
        )

    def test_index_view_with_two_past_student(self):
        """
        The polls index page may display multiple polls.
        """
        create_student(sname="Amita Rajput", days=-30)
        create_student(sname="Ranjit Rajput.", days=-5)
        response = self.client.get(reverse('myappWithGenView:indexview'))
        self.assertQuerysetEqual(
            response.context['all_stud_list'],
                ['<Student:Amita Rajput .>', '<Student: Ranjit Rajput.>']
        )
class StudentIndexDetailTests(TestCase):
    def test_detail_view_with_a_future_student(self):
        """
        The detail view of a student with a join_date in the future should
        return a 404 not found.
        """
        future_student = create_student(sname='Vibhusha', days=5)
        response = self.client.get(reverse('myappWithGenView:detailview', args=(future_student.id,)))
        self.assertEqual(response.status_code, 404)

    def test_detail_view_with_a_past_student(self):
        """
        The detail view of a student with a join_date in the past should display
        the student's name.
        """
        past_student = create_student(sname='Dhruvmit', days=-5)
        response = self.client.get(reverse('myappWithGenView:detailview', args=(past_student.id,)))
        self.assertContains(response, past_student.sname, status_code=200)