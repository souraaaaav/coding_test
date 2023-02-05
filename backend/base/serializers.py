from base.models import form_list, sectors_list
from rest_framework import serializers


class sectors_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = sectors_list
        fields = "__all__"


class form_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = form_list
        fields = "__all__"
        depth = 1
