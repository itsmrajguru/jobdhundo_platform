# user/urls.py

from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import ProfileViewSet

# Router for Profile CRUD
router = DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='profile')

# Manual API endpoints
urlpatterns = [
    path('api/login/', views.login_api),
    path('api/signup/', views.signup_api),
    path('api/jobs/', views.jobs_api),
    path('api/resume/upload/', views.resume_upload),
    path('api/', include(router.urls)), 
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
