import os
from django.http import HttpResponse
from django.conf import settings

def index(request):
    file_path = os.path.join(settings.BASE_DIR, 'frontend', 'dist', 'index.html')
    try:
        with open(file_path, 'r') as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        return HttpResponse("index.html not found. Run npm run build in frontend.", status=404)
