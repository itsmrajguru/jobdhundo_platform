import os
import django
import sys
import json

# Setup Django environment
sys.path.append(os.getcwd())
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jobdhundo_backend.settings')
django.setup()

from user.services.jobs_api import search_jobs

import requests
from urllib.parse import urlparse

def resolve_url(url):
    try:
        # Adzuna might require User-Agent to allow redirect
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        response = requests.head(url, headers=headers, allow_redirects=True, timeout=5)
        return response.url
    except Exception as e:
        print(f"Error resolving: {e}")
        return url

def test_search(country="in", days=30, sort="relevance"):
    print(f"\n--- Testing: Query='NTT', Country={country}, Days={days}, Sort={sort} ---")
    data = search_jobs(query="NTT", page=1, limit=3, country=country, sort_by=sort, max_days_old=days) # Limit to 3 for testing
    
    results = data.get('results', [])
    print(f"Found {len(results)} jobs.")
    
    for job in results:
        original_url = job.get('redirect_url')
        if original_url:
            final_url = resolve_url(original_url)
            domain = urlparse(final_url).netloc
            print(f"Company: {job.get('company', {}).get('display_name')} | Domain: {domain} | URL: {final_url[:50]}...")

# 1. Test Resolution
test_search(country="in", days=30, sort="relevance")
