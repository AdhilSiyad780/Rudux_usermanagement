from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render


from accounts.serializers import *
class RegisterView(APIView):
    def post(self,request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'User registred'})
        return Response(serializer.errors)
    
class LoginView(APIView):
    def post(self,request):
        user = authenticate(username=request.data['username'],password=request.data['password'])
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh':str(refresh),
                'access':str(refresh.access_token),
                'is_admin':user.is_admin
            })
        return Response({'error':'invalid credentials'},status=400)
class ProfilView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        serializers  = UserSerializer(request.user)
        return Response(serializers.data)
    def put(self,request):
        serializers = UserSerializer(request.user,data=request.data,paritial=True)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors)
  
