from rest_framework import serializers
from .models import Todo

class TodoSerializers(serializers.ModelSerializer):
    class Meta:
        model=Todo
        fields=('pub_id','pub_author','title','subject','category','file','date','private')

        