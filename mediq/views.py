from django.shortcuts import render, redirect
from django.views.generic import View

def index_view(request):
    return render(request, "mediq/landing.html")


class LoginView(View):
    template_name = "mediq/login.html"
    
    def get(self, request):
        if request.user.is_authenticated:
            return redirect("mediq:dashboard")
        return render(request, self.template_name)
    
    
class DashboardView(View):
    template_name = "mediq/dashboard.html"
    
    def get(self, request):
        return render(request, self.template_name)
