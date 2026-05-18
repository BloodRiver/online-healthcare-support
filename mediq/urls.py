from django.urls import path
from . import views

app_name = "mediq"

urlpatterns = [
    path('', views.index_view, name="index"),
    path('login', views.LoginView.as_view(), name="login"),
    path('dashboard', views.DashboardView.as_view(), name="dashboard")
]
