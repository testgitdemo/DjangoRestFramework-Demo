from django.shortcuts import render,get_object_or_404
from django.template import loader,RequestContext
from django.http import HttpResponse,HttpResponseRedirect
from django.core.urlresolvers import reverse
from university.models import University,Course
# Create your views here.
def index(request):
    template=loader.get_template('university/index.html')
    context=RequestContext(request,{'message':'University'})
    return HttpResponse(template.render(context))

def saveRecord(request):
    uni=University();
    uni.uniname=request.POST['uname']
    uni.emailid=request.POST['emailid']
    uni.website=request.POST['website']
    uni.address=request.POST['address']
    uni.contact=request.POST['contact']
    uni.save()
    return HttpResponseRedirect(reverse('university:showrecord'))

def deleteRecord(request,uni_id):
    uni=get_object_or_404(University,pk=uni_id)
    cous=uni.course_set.all()
    cous.delete()
    uni.delete()
    uni_list=University.objects.order_by('uniname')
    return HttpResponseRedirect(reverse('university:showrecord'))

def editRecord(request,uni_id):
    uni_list=get_object_or_404(University,pk=uni_id)
    return HttpResponse(render(request,'university/editUniversity.html',{'uni_list':uni_list}))

def updateRecord(request,uni_id):
    uni=get_object_or_404(University,pk=uni_id)
    uni.uniname=request.POST['uname']
    uni.emailid=request.POST['emailid']
    uni.website=request.POST['website']
    uni.address=request.POST['address']
    uni.contact=request.POST['contact']
    uni.save()
    return HttpResponseRedirect(reverse('university:showrecord'))

def showRecord(request):
    uni_list=University.objects.all()
    return HttpResponse(render(request,'university/showUniversity.html',{'uni_list':uni_list}))

def showCourse(request,uni_id):
    uni_list=get_object_or_404(University,pk=uni_id)
    course_list=uni_list.course_set.all()
    return HttpResponse(render(request,'university/showCourse.html',{'course_list':course_list,'uni_list':uni_list}))

def course(request,uni_id):
    return HttpResponse(render(request,'university/course.html',{'uni_id':uni_id}))

def insertCourse(request,uni_id):
    uni=get_object_or_404(University,pk=uni_id)
    #cour=uni.course_set.get(university=uni)
    cour=Course()
    cour.university_id=uni.id
    cour.cname=request.POST['cname']
    cour.save()
    return HttpResponseRedirect(reverse('university:showcourse',args=(uni_id,)))

def deleteCourse(request,cous_id,uni_id):
    cous=get_object_or_404(Course,pk=cous_id)
    cous.delete()
    return HttpResponseRedirect(reverse('university:showcourse',args=(uni_id,)))
def editCourse(request,cous_id, uni_id):
    cous=get_object_or_404(Course,pk=cous_id)
    return HttpResponse(render(request,'university/editCourse.html',{'cous_list':cous, 'uni_id':uni_id}))

def updateCourse(request,cous_id,uni_id):
    cous=get_object_or_404(Course,pk=cous_id)
    cous.cname=request.POST['cname']
    cous.save()
    return HttpResponseRedirect(reverse('university:showcourse',args=(uni_id,)))