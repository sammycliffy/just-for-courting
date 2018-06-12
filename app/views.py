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
        form = Signup = (request.POST)
        if form.is_valid():
            user = form.save()
            return HttpResponse('saved successfully')
        else:
            form = Signup()
        return render(request, 'app/registration.html', {'form':form})



class user_profile(DetailView):
    model = User
    template_name = 'app/profile.html'

    def get_object(self):
        return get_object_or_404(User, username=self.request.user)
        