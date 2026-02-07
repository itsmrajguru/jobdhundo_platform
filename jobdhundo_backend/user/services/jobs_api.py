from django.conf import settings
import requests

def search_jobs(query, page=1, limit=10, country="in", sort_by="date", max_days_old=7):
    app_id = settings.ADZUNA_APP_ID
    app_key = settings.ADZUNA_APP_KEY

    if not app_id or not app_key:
        return {"results": [], "count": 0}  # fail gracefully if keys missing

    # Adzuna endpoint structure: /api/jobs/{country}/search/{page}
    url = f"https://api.adzuna.com/v1/api/jobs/{country}/search/{page}"
    
    params = {
        "app_id": app_id,
        "app_key": app_key,
        "results_per_page": limit,
        "what": query,
        "sort_by": sort_by,          # date, relevance, salary
        "max_days_old": max_days_old, # Limit to recent jobs
        "content-type": "application/json", 
    }
    
    try:
        response = requests.get(url, params=params, timeout=10)
        if response.status_code == 200:
            return response.json()
        print(f"Adzuna Error {response.status_code}: {response.text}") # Debug log
    except Exception as e:
        print(f"Adzuna Exception: {e}")

    return {"results": [], "count": 0}
