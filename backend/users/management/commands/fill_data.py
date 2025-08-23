from faker import Faker
from datetime import date, timedelta
from random import choice, uniform, randint

from django.core.management import BaseCommand

from users.models import CustomUser, Provider, TypeOfPayment
from .data import PROVIDERS, TYPES


class Command(BaseCommand):

    def handle(self, *args, **options):
        provider_list = [Provider(**prov_data) for prov_data in PROVIDERS]
        type_list = [TypeOfPayment(**pay_data) for pay_data in TYPES]
        providers = Provider.objects.bulk_create(provider_list)
        payments = TypeOfPayment.objects.bulk_create(type_list)
        fake = Faker()
        dateb1, dateb2 = date(1970, 1, 1), date(1990, 12, 31)
        datebs = [dateb1]
        datep1, datep2 = date(2025, 1, 1), date(2025, 12, 31)
        while dateb1 < dateb2:
            dateb1 += timedelta(days=3)
            datebs.append(dateb1)
        self.stdout.write('dateb1 ends')
        dateps = [datep1]
        while datep1 < datep2:
            datep1 += timedelta(days=1)
            dateps.append(datep1)
        self.stdout.write('datep1 ends')
        users = []
        for _ in range(10000):
            datepay = choice(dateps)
            debt = round(uniform(100, 10000), 2)
            user_data = {
                'name': fake.first_name(),
                'surname': fake.last_name(),
                'dob': choice(datebs),
                'debt': debt,
                'provider': choice(providers),
                'type_of_payment': choice(payments),
                'date_pay': datepay,
            }
            others = choice([
                {
                    'fee': debt,
                    'date_end_pay': datepay
                },
                {
                    'fee': round(debt - uniform(5, 25), 2),
                    'date_end_pay': datepay - timedelta(days=randint(1, 50)),
                },
                {
                    'fee': round(debt - uniform(25, 80), 2),
                    'date_end_pay': datepay - timedelta(days=randint(1, 50))
                }
            ])
            user_data.update(others)
            users.append(CustomUser(**user_data))
        self.stdout.write('Data succesfully filled')
        CustomUser.objects.bulk_create(users)
        self.stdout.write('Done!')
