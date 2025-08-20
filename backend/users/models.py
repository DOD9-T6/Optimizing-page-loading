from django.db import models


class Provider(models.Model):
    firstname = models.CharField(
        verbose_name='Имя',
        max_length=150
    )
    surname = models.CharField(
        verbose_name='Фамилия',
        max_length=150
    )


class TypeOfPayment(models.Model):
    name = models.CharField(
        verbose_name='Название',
        max_length=32
    )


class CustomUser(models.Model):
    name = models.CharField(
        verbose_name='Имя',
        max_length=150
    )
    surname = models.CharField(
        verbose_name='Фамилия',
        max_length=150
    )
    dob = models.DateField(
        verbose_name='Дата рождения'
    )
    fee = models.DecimalField(
        verbose_name='Оплата',
        decimal_places=2,
        max_digits=8
    )
    debt = models.DecimalField(
        verbose_name='Долг за услуги',
        decimal_places=2,
        max_digits=8
    )
    notes = models.TextField(
        verbose_name='Заметки',
        default=None,
        blank=True,
        null=True
    )
    provider = models.ForeignKey(
        Provider,
        verbose_name='Провайдер',
        on_delete=models.SET_NULL,
        null=True
    )
    type_of_payment = models.ForeignKey(
        TypeOfPayment,
        verbose_name='Тип оплаты',
        on_delete=models.SET_NULL,
        null=True
    )
    date_pay = models.DateField(
        verbose_name='Дата оплаты'
    )
    date_end_pay = models.DateField(
        verbose_name='Дата последнего платежа'
    )
