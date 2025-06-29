from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from accounts.serializers import *
from django.db.models import Q
from rest_framework import status



@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):
    def post(self,request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'User registred'})
        return Response(serializer.errors)

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'is_superuser': user.is_superuser,
                'username': user.username
            })
        return Response({'error': 'invalid credentials'}, status=400)

class ProfilView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self,request):
        serializers  = UserSerializer(request.user)
        print('get profile is working fine')
        return Response(serializers.data)
    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        print("✅ PUT method hit with data:", request.data)
        print("✅ Files received:", request.FILES)
        if 'profile_image' in request.FILES:
            request.user.profile_image = request.FILES['profile_image']
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)



# class AdminUserListView(APIView):
#     permission_classes = [IsAdminUser,IsAuthenticated]
#     def get(self,request):
#         search_query = request.query_params.get('search','')
#         users =CustomUser.objects.filter(
#             Q(username__icontains = search_query)|
#             Q(email__icontains = search_query)
#         )
#         serializer = UserSerializer(users,many=True)
#         return Response(serializer.data)
#     def put(self,request,pk):
#         user = CustomUser.objects.get(id=pk)
#         serializer = UserSerializer(user,dela=request.data,partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors,status=400)
#     def delete(self,request,pk):
#         user = CustomUser.objects.get(id=pk)
#         user.delete()
#         return Response({"msg": "User deleted"}, status=status.HTTP_204_NO_CONTENT)


