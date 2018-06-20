from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import Profile

admin.site.unregister(User)

class UserProfileInline(admin.StackedInline):
    model = Profile

class UserProfileAdmin(UserAdmin):
    inlines = [ UserProfileInline, ]
class Profile_admin(admin.ModelAdmin):
    list_display = ['user','gender','country','state','age']


admin.site.register(User, UserProfileAdmin)
admin.site.register(Profile, Profile_admin)
