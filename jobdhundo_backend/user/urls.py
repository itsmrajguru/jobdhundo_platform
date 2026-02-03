# user/urls.py

from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet

# Router for Profile CRUD
router = DefaultRouter()
router.register(r'profile', ProfileViewSet)

# Manual API endpoints
urlpatterns = [
    path('api/login/', views.login_api),
    path('api/signup/', views.signup_api),
    path('api/jobs/', views.jobs_api),
    path('api/', include(router.urls)),   # include router-generated URLs
]
