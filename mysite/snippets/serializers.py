__author__ = 'priyansh'
from rest_framework import serializers
from django.forms import widgets
from snippets.models import Snippets, LANGUAGE_CHOICES, STYLE_CHOICES
from django.contrib.auth.models import User


class SnippetsSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.Field(source='owner.username')
    highlight = serializers.HyperlinkedIdentityField(view_name='snippet-highlight', format='html')

    class Meta:
        model = Snippets
        fields = ('url', 'highlight', 'owner',
                  'title', 'code', 'linenos', 'language', 'style')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    snippets = serializers.HyperlinkedRelatedField(many=True, view_name='snippet-detail')

    class Meta:
        model = User
        fields = ('url', 'username', 'snippets')





