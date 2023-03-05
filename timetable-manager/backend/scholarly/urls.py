from django.urls import path
from .views import create_publication

urlpatterns = [
    path('api/publications/', create_publication, name='create-publication'),
]