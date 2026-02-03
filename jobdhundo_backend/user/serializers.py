from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User

# Serializer for User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

# Serializer for Profile model
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # include user info

    class Meta:
        model = Profile
        fields = "__all__"   # include all fields from Profile model
