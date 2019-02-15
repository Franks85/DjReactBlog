from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from rest_framework import status


class AccountAPIViewTestCase(APITestCase):

    def setUp(self):
        self.data = {
            'username': 'foobar',
            'email': 'foobar@example.com',
            'password1': 'somepassword',
            'password2': 'somepassword'
        }
        self.url = 'http://localhost:8000/rest-auth/registration/'

    def test_register_user(self):
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(response.data), 1)