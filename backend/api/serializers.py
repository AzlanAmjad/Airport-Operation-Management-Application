from rest_framework import serializers
from . import models

# USER
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = (
            'email',
            'password',
            'first_name',
            'last_name'
        )

class AllUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = '__all__'


# PASSENGER REGISTRATION
class RegisterPassengerSerializer(serializers.ModelSerializer):
    email = UserSerializer(required=True)

    class Meta:
        model = models.Passenger
        fields = '__all__'

    def create(self, validated_data):
        email = models.User.objects.create_user(validated_data['email']['email'], validated_data['email']['password'],
                                                validated_data['email']['first_name'], validated_data['email']['last_name'])
        email.a_passenger = True
        email.save()
        passenger = models.Passenger.objects.create(
            email=email, ssn=validated_data.pop('ssn'), address=validated_data.pop('address'))
        return passenger


# PASSENGER
class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Passenger
        fields = '__all__'


# AIRPORT ADMIN
class AirportAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AirportAdmin
        fields = '__all__'


# AIRLINE ADMIN
class AirlineAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AirlineAdmin
        fields = '__all__'


# COMPANY
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        fields = '__all__'


# HOTEL
class GetHotelSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name')

    class Meta:
        model = models.Hotel
        fields = ('pk', 'name', 'location', 'company_name')

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Hotel
        fields = '__all__'


# TRANSACTION
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transaction
        fields = '__all__'


# STAY
class StaySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Stay
        fields = '__all__'


# AIRPORT COMPLAINT
class AirportComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AirportComplaint
        fields = '__all__'

class GetAirportComplaintSerializer(serializers.ModelSerializer):
    passenger_email = serializers.EmailField(source='passenger.email')

    class Meta:
        model = models.AirportComplaint
        fields = ('pk', 'description', 'admin', 'passenger_email')


# AIRLINE
class AirlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Airline
        fields = '__all__'


# AIRLINE COMPLAINT
class AirlineComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AirlineComplaint
        fields = '__all__'

class GetAirlineComplaintSerializer(serializers.ModelSerializer):
    passenger_email = serializers.EmailField(source='passenger.email')

    class Meta:
        model = models.AirlineComplaint
        fields = ('pk', 'description', 'admin', 'passenger_email')


# AIRPLANE
class AirplaneSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Airplane
        fields = '__all__'


# DESTINATION
class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Destination
        fields = '__all__'


# FLIGHT
class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Flight
        fields = '__all__'


# FARE
class FareSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Fare
        fields = '__all__'


# BOOKS
class BooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Books
        fields = '__all__'
