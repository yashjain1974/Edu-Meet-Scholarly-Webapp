from django.db import models
from django.utils import timezone

# Create your models here.
class Todo(models.Model):
    pub_id=models.AutoField(primary_key=True)
    pub_author=models.CharField(max_length=120,default="null")
    title=models.CharField(max_length=120,default="null")
    category=models.CharField(max_length=30,default="other")
    subject=models.CharField(max_length=30,default="other")
    
    file=models.FileField(upload_to="publications",max_length=254,null=True,default="")
    date=models.DateField(default=timezone.now())
    private=models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title


