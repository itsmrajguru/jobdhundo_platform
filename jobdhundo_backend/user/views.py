# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Profile
from .serializers import ProfileSerializer, UserSerializer
from .services.jobs_api import search_jobs
from rest_framework import viewsets #added for Crud api of Profile

# added login API

@api_view(['POST'])
@permission_classes([AllowAny])
def login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": UserSerializer(user).data
        })
    return Response({"error": "Invalid credentials"}, status=400)

# added Signup API

@api_view(['POST'])
@permission_classes([AllowAny])
def signup_api(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if not username or not password:
        return Response({"error": "Username and password required"}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)
    user = User.objects.create_user(username=username, password=password)
    Profile.objects.create(user=user)
    return Response({"message": "Account created successfully"})

# added Jobs API

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def jobs_api(request):
    query = request.GET.get("q", "").strip()
    page = int(request.GET.get("page", 1))
    limit = int(request.GET.get("limit", 10))
    country = request.GET.get("country", "in") # Default to India
    max_days_old = int(request.GET.get("days", 30)) # Relaxed to 30 days to include diverse/relevant jobs
    sort_by = request.GET.get("sort", "relevance") # Default to relevance to find best matches (LinkedIn, NTT, etc.)

    data = search_jobs(query, page, limit, country=country, sort_by=sort_by, max_days_old=max_days_old)
    return Response({
        "jobs": data.get("results", []),
        "count": data.get("count", 0)
    })

from rest_framework.parsers import MultiPartParser, FormParser
from .services.resume_parser import extract_text_from_pdf, analyze_resume
from .models import Profile

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def resume_upload(request):
    """
    Uploads a resume PDF, parses it, and auto-updates the user profile.
    """
    if 'resume' not in request.FILES:
        return Response({"error": "No resume file provided"}, status=400)

    file_obj = request.FILES['resume']
    
    # 1. Parse PDF
    text = extract_text_from_pdf(file_obj)
    if not text:
        return Response({"error": "Could not extract text from PDF"}, status=400)

    # 2. Analyze
    analysis = analyze_resume(text)

    # 3. Update Profile (Auto-fill) - DISABLED PER USER REQUEST
    # try:
    #     profile, created = Profile.objects.get_or_create(user=request.user)
    #     
    #     # Only overwrite if empty to avoid destroying user edits
    #     if not profile.summary:
    #         profile.summary = f"Parsed Summary: {analysis['summary'][:300]}..."
    #     
    #     # Merge skills
    #     existing_skills = set(profile.skills.split(",")) if profile.skills else set()
    #     new_skills = set(analysis['skills_found'])
    #     merged_skills = existing_skills.union(new_skills)
    #     profile.skills = ",".join([s for s in merged_skills if s]) # cleanup empty strings
    #     
    #     profile.save()
    #     
    # except Exception as e:
    #     print(f"Profile update error: {e}")
    #     # Continue to return analysis even if save fails

    return Response({
        "message": "Resume parsed successfully",
        "analysis": analysis,
        "profile_updated": False 
    })

    
# added Profile ViewSet for CRUD operations
class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return the profile of the logged-in user
        return Profile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the user to the logged-in user
        serializer.save(user=self.request.user)

