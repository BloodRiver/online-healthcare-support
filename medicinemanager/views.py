from django.shortcuts import render, redirect
from django.views.generic import View
from . import forms


class IndexView(View):
    template_name = "medicinemanager/index.html"
    
    def get(self, request):
        return render(request, self.template_name)


class AttendantAddMedicineView(View):
    template_name = "medicinemanager/attendant_add_medicine.html"

    def get(self, request):
        return render(request, self.template_name)


class AttendantAddMedicineScheduleView(View):
    template_name = "medicinemanager/attendant_add_medicine_schedule.html"
    
    def get(self, request):
        return render(request, self.template_name)


class AttendantAddPatientView(View):
    template_name = "medicinemanager/add_patient.html"
    
    def get(self, request):
        return render(request, self.template_name)
    
    
class AttendantAddManufacturerView(View):
    template_name = "medicinemanager/attendant_add_medicine_schedule.html"
    
    def get(self, request):
        return render(request, self.template_name)
    
    
class ChangePasswordView(View):
    template_name = "medicinemanager/change_password.html"
    
    def get(self, request):
        return render(request, self.template_name)
    
    
class DashboardView(View):
    template_name = "medicinemanager/dashboard.html"
    
    def get(self, request):
        return render(request, self.template_name)
    

class LoginView(View):
    template_name = "medicinemanager/login.html"
    form_class = forms.LoginForm
    
    def get(self, request):
        form = self.form_class(None)
        return render(request, self.template_name, {'form': form})
    
    
def logout_view(request):
    return redirect("medicinemanager:index")


class RegisterView(View):
    template_name = "medicinemanager/register.html"
    
    def get(self, request):
        return render(request, self.template_name)


class ProfileView(View):
    template_name = "medicinemanager/profile.html"
    
    def get(self, request):
        return render(request, self.template_name)
    

class AttendantAddMedicineStockView(View):
    template_name = "medicinemanager/attendant_add_medicine_stock.html"
    
    def get(self, request):
        return render(request, self.template_name)
    
    
class MedicineScheduleView(View):
    template_name = "medicinemanager/medicine_schedule.html"
    
    def get(self, request):
        return render(request, self.template_name)
