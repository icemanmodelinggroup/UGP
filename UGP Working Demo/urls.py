from django.urls import path
from . import views
from django.conf.urls import url


urlpatterns = [
    url(r'UGP/', views.display_home, name='display_home'),
    url(r'^ajax/get_flowline/$', views.get_flowline, name='get_flowline'),
    url(r'^ajax/get_point_data/$', views.get_point_data, name='get_point_data')
]