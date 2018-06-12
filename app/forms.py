from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class Signup(UserCreationForm):
   username = forms.CharField(max_length=255)
   email = forms.EmailField(max_length = 254)
   password1 = forms.CharField(widget= forms.PasswordInput())
   password2 = forms.CharField(widget= forms.PasswordInput())

   gender = forms.ChoiceField()
   country = forms.ChoiceField()
   class Meta:
        model = User
        fields =('username', 'email', 'password1','password2','gender', 'country')