from rest_framework import serializers

from .models import Answer, Question


# USER DETAILS SERIALIZER

class UserSerializer(serializers.Serializer):

    username = serializers.CharField()


# ANSWER SERIALIZER

class AnswerSerializer(serializers.ModelSerializer):

    user_details = serializers.SerializerMethodField()

    class Meta:

        model = Answer

        fields = '__all__'

    def get_user_details(self, obj):

        return {
            "username": obj.user.username
        }


# QUESTION SERIALIZER

class QuestionSerializer(serializers.ModelSerializer):

    class Meta:

        model = Question

        fields = '__all__'
