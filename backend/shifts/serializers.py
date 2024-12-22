from rest_framework import serializers
from .models import Instructor, ShiftPreference

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['id', 'club', 'created_at']

class ShiftPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShiftPreference
        fields = ['id', 'instructor', 'date', 'start_time', 'end_time', 
                 'preference_level', 'created_at']
        read_only_fields = ['instructor']

    def create(self, validated_data):
        validated_data['instructor'] = self.context['request'].user.instructor
        return super().create(validated_data)