from rest_framework.routers import DefaultRouter
from accounts.admin_views import AdminUserViewset
from accounts.views import RegisterView,LoginView,ProfilView
from django.urls import path

router = DefaultRouter()
router.register('admin/users',AdminUserViewset)

urlpatterns = [
    path('register/',RegisterView.as_view()),
    path('login/',LoginView.as_view()),
    path('profile/',ProfilView.as_view())

]
urlpatterns += router.urls