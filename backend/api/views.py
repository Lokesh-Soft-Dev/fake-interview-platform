import random

from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User

from .models import Answer

from .serializers import (
    AnswerSerializer,
)


# HOME API
def home(request):

    return JsonResponse({
        "message": "Fake Interview Platform API Working 🚀"
    })


# SAVE ANSWER
@api_view(['POST'])
def save_answer(request):

    username = request.data.get("username")

    question = request.data.get("question")

    answer = request.data.get("answer")

    confidence = "Medium"

    try:

        user = User.objects.get(username=username)

    except User.DoesNotExist:

        return Response({
            "error": "User not found"
        })

    data = {
        "user": user.id,
        "question": question,
        "answer": answer,
        "confidence": confidence,
    }

    serializer = AnswerSerializer(data=data)

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message": "Answer Saved Successfully 🚀"
        })

    return Response(serializer.errors)


# GET ALL ANSWERS
@api_view(['GET'])
def get_answers(request):

    answers = Answer.objects.all().order_by('-created_at')

    serializer = AnswerSerializer(
        answers,
        many=True
    )

    return Response(serializer.data)


# ANALYTICS
@api_view(['GET'])
def analytics(request):

    total_answers = Answer.objects.count()

    high_confidence = Answer.objects.filter(
        confidence='High'
    ).count()

    medium_confidence = Answer.objects.filter(
        confidence='Medium'
    ).count()

    low_confidence = Answer.objects.filter(
        confidence='Low'
    ).count()

    return Response({
        "total_answers": total_answers,

        "high_confidence": high_confidence,

        "medium_confidence": medium_confidence,

        "low_confidence": low_confidence,
    })


# GET QUESTIONS
@api_view(['GET'])
def get_questions(request):

    category = request.GET.get('category')

    questions_data = {

        "HR": [
            {"question": "Tell me about yourself."},
            {"question": "Why should we hire you?"},
            {"question": "What are your strengths?"},
            {"question": "What are your weaknesses?"},
            {"question": "Where do you see yourself in 5 years?"},
            {"question": "Why do you want this job?"},
            {"question": "How do you handle pressure?"},
            {"question": "Describe a difficult situation you handled."},
            {"question": "Tell me about a failure in your life."},
            {"question": "What motivates you?"},
            {"question": "What makes you unique?"},
        ],

        "Technical": [
            {"question": "What is React?"},
            {"question": "Explain useState hook."},
            {"question": "What is Django?"},
            {"question": "Explain REST API."},
            {"question": "Difference between SQL and NoSQL?"},
            {"question": "What is JWT authentication?"},
            {"question": "Explain async await."},
            {"question": "What is Python decorator?"},
            {"question": "What is normalization in DBMS?"},
            {"question": "Explain JavaScript closures."},
            {"question": "What is API?"},
        ],

        "Coding": [
            {"question": "Reverse a string."},
            {"question": "Check palindrome."},
            {"question": "Find largest number in array."},
            {"question": "Fibonacci series logic."},
            {"question": "Sort an array."},
            {"question": "Prime number logic."},
            {"question": "Factorial program."},
            {"question": "Binary search logic."},
            {"question": "Find duplicate elements."},
            {"question": "Reverse linked list."},
            {"question": "Find maximum subarray."},
        ]
    }

    selected_questions = questions_data.get(category, [])

    random.shuffle(selected_questions)

    return Response(selected_questions[:5])