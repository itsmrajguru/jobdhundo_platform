import io
import re
from pypdf import PdfReader

# Simple proactive skill list for MVP analysis
TECH_SKILLS = {
    "python", "javascript", "react", "django", "node", "sql", "aws", "docker", 
    "kubernetes", "git", "html", "css", "java", "c++", "c#", "go", "ruby", 
    "php", "swift", "kotlin", "flutter", "typescript", "angular", "vue",
    "machine learning", "data science", "ai", "cloud", "devops", "agile"
}

def extract_text_from_pdf(file_obj):
    """
    Extracts raw text from a PDF file object.
    """
    try:
        reader = PdfReader(file_obj)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text.strip()
    except Exception as e:
        print(f"Error extracting PDF text: {e}")
        return ""

def analyze_resume(text):
    """
    Analyzes resume text to find skills and generate a basic ATS score.
    Returns a dictionary with extracted data.
    """
    if not text:
        return {
            "score": 0,
            "skills_found": [],
            "missing_keywords": ["python", "javascript", "react"], # Placeholder suggestions
            "summary": "No text content found."
        }

    text_lower = text.lower()
    
    # 1. Skill Extraction (With Regex Word Boundaries)
    found_skills = []
    for skill in TECH_SKILLS:
        # Matches " skill " or start/end of string, prevents substring matches like "ai" in "email"
        if re.search(r'\b' + re.escape(skill) + r'\b', text_lower):
            found_skills.append(skill)
    
    # 2. Simple ATS Score Heuristic
    # Base score 20. +5 for each skill (cap at 50). +20 for "experience". +10 for "education".
    score = 20
    score += min(len(found_skills) * 5, 50)
    
    if re.search(r'\bexperience\b', text_lower):
        score += 15
    if re.search(r'\b(education|university|college)\b', text_lower):
        score += 15
        
    # Cap score at 100
    score = min(score, 100)

    # 3. Missing Keywords (Simple suggestion based on what ISN'T found from a top 5 list)
    top_skills = ["python", "javascript", "react", "sql", "git"]
    missing = [s for s in top_skills if s not in found_skills]

    return {
        "score": score,
        "skills_found": sorted(found_skills),
        "missing_keywords": missing,
        "summary": text[:500] + "..." # Preview
    }
