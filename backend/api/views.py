import random

from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User

from .models import Answer, Question

from .serializers import (
    AnswerSerializer,
    QuestionSerializer
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

    questions = list(
        Question.objects.filter(category=category)
    )

    random.shuffle(questions)

    questions = questions[:5]

    serializer = QuestionSerializer(
        questions,
        many=True
    )

    return Response(serializer.data)