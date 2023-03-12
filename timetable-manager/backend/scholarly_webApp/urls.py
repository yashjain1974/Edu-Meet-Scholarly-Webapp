from django.urls import path

from . import views
urlpatterns = [
    path('api/publications/', views.create_publication, name='create-publication'),
    path('my_view/<str:author_name>/', views.my_view, name='my_view'),
]