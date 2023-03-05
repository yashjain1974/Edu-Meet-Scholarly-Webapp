from django.shortcuts import render
from rest_framework import viewsets

from .serializers import TodoSerializers
from .models import Todo
from rest_framework.decorators import api_view
from rest_framework.response import Response



# Create your views here.
class TodoView(viewsets.ModelViewSet):
    serializer_class=TodoSerializers
    queryset=Todo.objects.all()
@api_view(['POST'])
def create_publication(request):
    serializer = TodoSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

