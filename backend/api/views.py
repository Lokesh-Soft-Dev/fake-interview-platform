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

    import random

    selected_questions = questions_data.get(category, [])

    random.shuffle(selected_questions)

    return Response(selected_questions[:5])
