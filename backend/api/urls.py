from django.urls import path

from .views import (
    home,
    save_answer,
    get_answers,
    analytics,
    get_questions,
    seed_questions,
)

urlpatterns = [

    path('', home),

    path('save-answer/', save_answer),

    path('answers/', get_answers),

    path('analytics/', analytics),

    path('questions/', get_questions),

    path('seed-questions/', seed_questions),

]
