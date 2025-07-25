"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,include
from django.urls import path, re_path
from django.views.generic import TemplateView
from pathlib import Path
import os
from django.conf import settings

BASE_DIR = Path(__file__).resolve().parent.parent


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
]

# ✅ Serve static and media **before** catch-all route
urlpatterns += static(settings.STATIC_URL, document_root=os.path.join(BASE_DIR, 'frontend', 'dist'))
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# 👇 This must be last
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name="index.html")),
]
