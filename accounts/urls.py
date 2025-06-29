from rest_framework.routers import DefaultRouter
from accounts.admin_views import AdminUserViewset
from accounts.views import RegisterView,LoginView,ProfilView
from django.urls import path
from accounts.admin_views import AdminUserViewset
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = DefaultRouter()
router.register('admin/users', AdminUserViewset, basename='admin-users')

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', ProfilView.as_view()),
]

urlpatterns += router.urls
urlpatterns += router.urls
urlpatterns += [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/<int:pk>', TokenRefreshView.as_view(), name='token_refresh'),
]
