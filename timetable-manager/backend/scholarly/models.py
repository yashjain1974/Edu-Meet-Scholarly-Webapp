from django.db import models
from django.utils import timezone

# Create your models here.
class Todo(models.Model):
    pub_id=models.AutoField(primary_key=True)
    title=models.CharField(max_length=120)
    category=models.CharField(max_length=30)
    file=models.FileField(upload_to="scholarly/publications",max_length=254)
    date=models.DateField(default=timezone.now())
    private=models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title


