from django.db import models
from django.contrib.auth.models import User


class Answer(models.Model):

    CONFIDENCE_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    question = models.TextField()

    answer = models.TextField()

    confidence = models.CharField(
        max_length=10,
        choices=CONFIDENCE_CHOICES,
        default='Medium'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Question(models.Model):

    CATEGORY_CHOICES = [
        ('HR', 'HR'),
        ('Technical', 'Technical'),
        ('Coding', 'Coding'),
    ]

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES
    )

    question = models.TextField()

    def __str__(self):
        return self.question