from rest_framework import viewsets, permissions
from .models import CustomUser
from .serializers import UserSerializer
from django.db.models import Q



class IsAdmin(permissions.BasePermission):
    def has_permission(self,request,view):
        return request.user and request.user.is_authenticated and request.user.is_superuser
    
class AdminUserViewset(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]
    def get_queryset(self):
        search = self.request.query_params.get('search', '')
        if search:
            return CustomUser.objects.filter(
                Q(username__icontains=search) | Q(email__icontains=search)
            )
        return CustomUser.objects.all()
