from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework import status
from snippets.models import Snippets
from snippets.serializers import SnippetsSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import mixins
from rest_framework import generics
from django.contrib.auth.models import User
from snippets.serializers import UserSerializer
from rest_framework import permissions
from rest_framework import renderers
from rest_framework import reverse
# Create your views here.


# class JSONResponse(HttpResponse):
#     def __init__(self, data, **kwargs):
#         content = JSONRenderer().render(data)
#         kwargs['content_type'] = 'application/json'
#         super(JSONResponse, self).__init__(content, **kwargs)

#mathod base view
# @api_view(['GET', 'POST'])
# def snippet_list(request, format=None):
#     """
#     List all snippets, or create a new snippet.
#     """
#     if request.method == 'GET':
#         snippets = Snippets.objects.all()
#         serializer = SnippetsSerializer(snippets, many=True)
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         serializer = SnippetsSerializer(data=request.DATA)
#         #if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#
#
# @api_view(['GET', 'PUT', 'DELETE'])
# def snippet_detail(request, pk, format=None):
#     """
#     Retrieve, update or delete a code snippet.
#     """
#     try:
#         snippet = Snippets.objects.get(pk=pk)
#     except Snippets.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#     if request.method == 'GET':
#         serializer = SnippetsSerializer(snippet)
#         return Response(serializer.data)
#     elif request.method == 'PUT':
#         serializer = SnippetsSerializer(snippet, data=request.DATA)
#         serializer.save()
#         return Response(serializer.data)
#     elif request.method == 'DELETE':
#         snippet.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

#class base view using mixins
# class SnippetList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
#     """
#     List all snippets, or create a new snippet.
#     """
#
#     queryset = Snippets.objects.all()
#     serializer_class = SnippetsSerializer
#
#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)
#
#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)
#
#
# class SnippetDetail(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
#     """
#         Retrieve, update or delete a snippet instance.
#     """
#     queryset = Snippets.objects.all()
#     serializer_class = SnippetsSerializer
#
#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)
#
#     def put(self, request, *args, **kwargs):
#         return self.update(request, *args, **kwargs)
#
#     def delete(self, request, *args, **kwargs):
#         return self.destroy(request, *args, **kwargs)
# generics class base views

@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'snippets': reverse('snippet-list', request=request, format=format)
    })


class SnippetList(generics.ListCreateAPIView):
    queryset = Snippets.objects.all()
    serializer_class = SnippetsSerializer


class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Snippets.objects.all()
    serializer_class = SnippetsSerializer


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    
    def pre_save(self, obj):
        obj.owner = self.request.user


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def pre_save(self, obj):
     obj.owner = self.request.user


class SnippetHighlight(generics.GenericAPIView):
    queryset = Snippets.objects.all()
    renderer_classes = (renderers.StaticHTMLRenderer,)

    def get(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)