from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import ShiftPreference
from .serializers import ShiftPreferenceSerializer

class ShiftPreferenceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ShiftPreferenceSerializer

    def get_queryset(self):
        return ShiftPreference.objects.filter(
            instructor=self.request.user.instructor
        ).order_by('-date', 'start_time')