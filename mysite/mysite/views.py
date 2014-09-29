__author__ = 'priyansh'
from django.shortcuts import render
from django.http import HttpResponse
def home(request):
    return HttpResponse(render(request, 'admin/MainPage.html',))
