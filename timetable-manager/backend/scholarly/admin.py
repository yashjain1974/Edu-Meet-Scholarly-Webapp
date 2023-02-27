from django.contrib import admin

# Register your models here.

from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display=("pub_id","title","category","file","date","private")

admin.site.register(Todo,TodoAdmin)