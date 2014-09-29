__author__ = 'priyansh'
from mysiteadmin.models import AdminLogin1
from rest_framework import serializers


class AdminLoginSerializer(serializers.ModelSerializer):

    class Meta:
        model = AdminLogin1
        fields = ('id', 'name', 'emailid', 'password', 'designation', 'status')

