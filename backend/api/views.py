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

    if category:
        category = category.strip().capitalize()

    questions = list(
        Question.objects.filter(category__iexact=category)
    )

    random.shuffle(questions)

    questions = questions[:5]

    serializer = QuestionSerializer(
        questions,
        many=True
    )

    return Response(serializer.data)


# AUTO CREATE QUESTIONS

@api_view(['GET'])
def seed_questions(request):

    if Question.objects.count() == 0:

        questions = [

            # HR QUESTIONS

            ("Tell me about yourself.", "HR"),
            ("Why should we hire you?", "HR"),
            ("What are your strengths?", "HR"),
            ("What are your weaknesses?", "HR"),
            ("Where do you see yourself in 5 years?", "HR"),
            ("Why do you want this job?", "HR"),
            ("Describe a difficult situation you handled.", "HR"),
            ("How do you handle pressure?", "HR"),
            ("Tell me about a failure in your life.", "HR"),
            ("What motivates you?", "HR"),
            ("What makes you unique?", "HR"),

            # TECHNICAL QUESTIONS

            ("What is React?", "Technical"),
            ("Explain REST API.", "Technical"),
            ("What is JWT Authentication?", "Technical"),
            ("Difference between SQL and NoSQL?", "Technical"),
            ("Explain Python decorators.", "Technical"),
            ("What is Django?", "Technical"),
            ("What are React Hooks?", "Technical"),
            ("Explain useEffect Hook.", "Technical"),
            ("What is API integration?", "Technical"),
            ("Explain primary key in SQL.", "Technical"),
            ("Difference between frontend and backend?", "Technical"),

            # CODING QUESTIONS

            ("Reverse a string.", "Coding"),
            ("Find largest number in array.", "Coding"),
            ("Check palindrome.", "Coding"),
            ("Fibonacci series logic.", "Coding"),
            ("Find duplicate elements.", "Coding"),
            ("Sort an array.", "Coding"),
            ("Swap two numbers.", "Coding"),
            ("Find factorial of a number.", "Coding"),
            ("Check even or odd.", "Coding"),
            ("Print star pyramid pattern.", "Coding"),
            ("Find maximum element in list.", "Coding"),

        ]

        for q, c in questions:

            Question.objects.create(
                question=q,
                category=c
            )

        return Response({
            "message": "Questions Added Successfully 🚀"
        })

    return Response({
        "message": "Questions already exist"
    })
