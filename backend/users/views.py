from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import RegisterSerializer

from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

@api_view(['POST'])
def login_user(request):

    username = request.data.get('username')
    password = request.data.get('password')

    # CHECK USER EXISTS

    if not User.objects.filter(username=username).exists():

        return Response({
            'error': 'No account found. Please register first 🚀'
        }, status=404)

    # AUTHENTICATE PASSWORD

    user = authenticate(
        username=username,
        password=password
    )

    if user is not None:

        refresh = RefreshToken.for_user(user)

        return Response({
            'message': 'Login successful',
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

    # WRONG PASSWORD

    return Response({
        'error': 'Invalid credentials. Please try again with correct password 🚀'
    }, status=400)
