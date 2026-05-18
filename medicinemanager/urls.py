from django.urls import path, include
from . import views # , serializer_views

app_name = "medicinemanager"

urlpatterns = [
    path('', views.IndexView.as_view(), name="index"),
    path('add-medicine', views.AttendantAddMedicineView.as_view(), name="attendant_add_medicine"),
    path('add-medicine-schedule', views.AttendantAddMedicineScheduleView.as_view(), name="attendant_add_medicine_schedule"),
    path('add-patient', views.AttendantAddPatientView.as_view(), name="add_patient"),
    path('add-medicine-manufacturer', views.AttendantAddManufacturerView.as_view(), name="attendant_add_manufacturer"),
    path("change-password", views.ChangePasswordView.as_view(), name="change_password"),
    path('dashboard', views.DashboardView.as_view(), name="dashboard"),
    path('login', views.LoginView.as_view(), name="login"),
    path('logout', views.logout_view, name="logout"),
    path('register', views.RegisterView.as_view(), name="register"),
    path("profile", views.ProfileView.as_view(), name="profile"),
    path("add-medicine-stock", views.AttendantAddMedicineStockView.as_view(), name="attendant_add_medicine_stock"),
    path("medicine-schedule", views.MedicineScheduleView.as_view(), name="medicine_schedule"),
]

# path("attendant-delete-medicine", views.AttendantDeleteMedicineView.as_view(), name="attendant_delete_medicine"),
    # path("delete-medicineconsumptionschedule", views.MedicineConsumptionScheduleDeleteView.as_view(), name="attendant_medicineconsumptionschedule_delete"),
    # path("edit-medicine/<str:medicine_id>", views.AttendantEditMedicineView.as_view(), name="attendant_edit_medicine"),
    # path("edit-medicineconsumptionschedule/<str:medicine_schedule_id>", views.AttendantEditMedicineConsumptionScheduleView.as_view(), name="attendant_edit_medicineconsumptionschedule"),
    # path("fetch-manufacturers", views.fetch_manufacturer_list_view, name="fetch_manufacturer_list"),
    # path("fetch-medicines", views.fetch_medicine_list_view, name="fetch_medicine_list"),
    # path("medicine-api", serializer_views.MedicineListAPIView.as_view(), name="medicine_api"),
    # path("medicine-history-api", serializer_views.MedicineConsumptionHistoryListAPIView.as_view(), name="medicine_history_api"),
    # path("medicine-image-delete", views.MedicineImageDeleteView.as_view(), name="medicine_image_delete"),
    # path("medicine-image-update", views.MedicineImageUpdateView.as_view(), name="medicine_image_update"),
    # path("medicine-schedule-api", serializer_views.MedicineConsumptionScheduleListAPIView.as_view(), name="medicine_consumption_schedule_api"),
    # path("patient-medicine-schedule-api", serializer_views.PatientsMedicineConsumptionScheduleListAPIView.as_view(), name="patients_medicine_consumption_schedule_api"),
    # path('select-patient', views.SelectPatientView.as_view(), name="select_patient"),
    # path('query/', include('medicinemanager.simple_query_urls'))