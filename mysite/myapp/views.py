from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse,HttpResponseRedirect
from myapp.models import Student,Contact
from django.core.urlresolvers import reverse
from django.template import RequestContext,loader
# Create your views here.
def index(request):
    all_stud_list=Student.objects.order_by("sname")
    #out=",".join([s.sname for s in all_student_list])
    template=loader.get_template('myapp/index.html')
    context=RequestContext(request,{'all_stud_list':all_stud_list,})
     #return render(request, 'myapp/index.html', context) no need to load Template thought loader this method return HttpResponse
    return HttpResponse(template.render(context))

def detail(request,student_id):

    #try:
     #   stud=Student.objects.get(pk=student_id)
    #except stud.DoesNotExist:
     #   raise Http404
    stud=get_object_or_404(Student,pk=student_id)#Shortcut Method for above comment code and it raises Http404 if the list is empty.
    return render(request,'myapp/detailForm.html',{'stud':stud})#return HttpResponse

def result(request,student_id):
    stud=get_object_or_404(Student,pk=student_id)
    return HttpResponse(render(request,'myapp/result.html',{'stud':stud}))


def contact(request,student_id):
    s=get_object_or_404(Student,pk=student_id)
    try:
        #Create Contact objects
        contact_info1=s.contact_set.get(pk=request.POST['cid1'])
        contact_info2=s.contact_set.get(pk=request.POST['cid2'])
        contact_info3=s.contact_set.get(pk=request.POST['cid3'])
        #assign New Student Contact No to each Contact
        contact_info1.stdno=request.POST['cno1']
        contact_info2.stdno=request.POST['cno2']
        contact_info3.stdno=request.POST['cno3']
    except (ValueError,Contact.DoesNotExist):
        return(render(request,'myapp/detail.html',{'error_message':'Error In Updating Contact No','stud':s}))
    else:
        #Update The New Value Of Contact Model
        contact_info1.save()
        contact_info2.save()
        contact_info3.save()
         # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('myapp:result',args=(s.id,)))
        #the reverse() call from django.core.urlresolvers




