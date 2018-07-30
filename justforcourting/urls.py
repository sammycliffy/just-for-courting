"""justforcourting URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from app import views
from app.views import SignupFormView, user_profile
from django.contrib.auth import views as auth_views



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index),
    #url(r'^oauth/', include('social_django.urls', namespace='social')),  
    path('registration/', SignupFormView.as_view(),name="registration" ),
    #path('profile/', ProfileView.as_view(), ),
    url('profile/',user_profile.as_view(),name="profile"),
    url(r'^login/$', auth_views.login,{'template_name': 'app/login.html'}, name='login'),
    url(r'^password_reset/$', auth_views.password_reset,{'template_name': 'app/password_reset.html'}, name='password_reset'),
    url(r'^password_reset/done/$', auth_views.password_reset_done, name='password_reset_done'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',auth_views.password_reset_confirm, name='password_reset_confirm'),
    url(r'^reset/done/$', auth_views.password_reset_complete, name='password_reset_complete'),
    url(r'^chat/$', views.chat, name='chat'),
    #path(r'^advice/$', Advice_list_view.as_view(), name='advice'),
    url(r'^advice/$', views.advice, name='advice'),
    url(r'^complaint/$', views.complaint, name='complaint')

]
