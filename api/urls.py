from django.urls import path
from .views import BrothListAPIView, ProteinListAPIView, OrderAPIView

urlpatterns = [
    path('broths/', BrothListAPIView.as_view(), name='broths-list'),
    path('proteins/', ProteinListAPIView.as_view(), name='proteins-list'),
    path('orders/', OrderAPIView.as_view(), name='order-create'),
]