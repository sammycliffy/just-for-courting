from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views import View
from django.contrib.auth.models import User
from .models import Profile
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views.generic.detail import DetailView
from django.utils.decorators import method_decorator
from .forms import Signup

# Create your views here.
def index(request):
    return render(request, 'app/index.html')

@login_required
def home(request):
    return render(request, 'core/home.html')

class SignupFormView(View):
    
    def get(self, request):
        form = Signup()
        return render(request, 'app/registration.html',{'form':form})

    def post(self, request):
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        gender = request.POST.get('gender')
        country = request.POST.get('country')
        state = request.POST.get('state')
        age = request.POST.get('age')
        data = {
            'username_taken': User.objects.filter(username__iexact=username).exists(),
            'email_taken': User.objects.filter(email__iexact =email).exists(),
            'empty_country': country == '-1',
            'empty_state': state == '-1',
            
        }
        if data['username_taken']:
            data['error_message'] = "Sorry Nick Name already taken"
            return JsonResponse(data)
        if data['email_taken']:
            data['error_message'] = " Sorry Email already taken"
            return JsonResponse(data)
        if data['empty_country']:
            data['error_message'] = " You must select a country"
            return JsonResponse(data)
        if data['empty_state']:
            data['error_message'] = " You must select a state"
            return JsonResponse(data)
        else:
            user = User.objects.create_user(username=username, password=password, email=email)
            profile = Profile.objects.create(
                user = user,
                country = country,
                state = state,
                gender = gender,
                age = age
            )
            profile.save()
        return render(request, 'app/registration.html')



class user_profile(DetailView):
    model = User
    template_name = 'app/profile.html'

    def get_object(self):
        return get_object_or_404(User, username=self.request.user)
        