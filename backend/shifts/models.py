from django.db import models
from django.contrib.auth.models import User

class Instructor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    club = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.club}"

class ShiftPreference(models.Model):
    PREFERENCE_CHOICES = [
        ('preferred', '希望'),
        ('available', '可能'),
        ('unavailable', '不可'),
    ]

    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    preference_level = models.CharField(max_length=20, choices=PREFERENCE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(start_time__lt=models.F('end_time')),
                name='valid_time_range'
            )
        ]

    def __str__(self):
        return f"{self.instructor} - {self.date} ({self.start_time}-{self.end_time})"