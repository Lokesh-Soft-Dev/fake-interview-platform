from django.contrib import admin

from .models import Answer, Question


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):

    list_display = ['question', 'category']


admin.site.register(Answer)